# FigmaKit Research and Development Specification

**Status:** Working R&D baseline  
**Last reviewed:** 2026-09-15  
**Product stage:** Early prototype  
**Initial targets:** Elementor, Gutenberg, ElementsKit, GutenKit  
**UX direction:** Material Design 3 / M3 Expressive, adapted for the compact Figma plugin environment

## 1. Purpose

This document is the evidence-based product and engineering baseline for FigmaKit. It separates:

- facts verified from official platform documentation;
- decisions adopted for the product;
- assumptions that still require experiments;
- implementation phases and release gates.

The repository is not treated as an established product. At the time of this review it contains an early Figma serializer and a small Elementor-oriented conversion prototype. It does not yet contain a production conversion engine, Gutenberg or GutenKit support, a real ElementsKit adapter, AI infrastructure, a WordPress connector, compatibility validation, or a complete user experience.

## 2. Product thesis

FigmaKit will convert selected Figma designs into native, editable WordPress builder content:

1. Figma → Elementor
2. Figma → Gutenberg
3. Figma → ElementsKit
4. Figma → GutenKit

The core promise is not pixel-perfect screenshots. It is the best achievable balance of:

- visual fidelity;
- native editor structure;
- responsive behavior;
- editability;
- predictable conversion;
- honest warnings when a design cannot map cleanly.

### Proposed positioning

> The most reliable AI-assisted Figma-to-WordPress converter for native Elementor and Gutenberg content, with first-class ElementsKit and GutenKit intelligence.

### Why the WPMet ecosystem matters

Many competitors convert to core Elementor or generic WordPress. FigmaKit can differentiate through deep mappings for ElementsKit and GutenKit while retaining safe core fallbacks. The converter should understand when a design is best represented by an advanced addon widget and when a simple native composition is safer.

## 3. Official sources and authority

The implementation must prioritize official documentation and verified output fixtures over blog posts, memory, or guessed field names.

### Figma

- [Plugin API introduction](https://developers.figma.com/docs/plugins/)
- [Plugin API reference](https://developers.figma.com/docs/plugins/api/api-reference/)
- [Accessing the document](https://developers.figma.com/docs/plugins/accessing-document/)
- [How plugins run](https://developers.figma.com/docs/plugins/how-plugins-run/)
- [Plugin manifest](https://developers.figma.com/docs/plugins/manifest/)
- [Dynamic page loading migration](https://developers.figma.com/docs/plugins/migrating-to-dynamic-loading/)
- [Working with variables](https://developers.figma.com/docs/plugins/working-with-variables/)
- [`exportAsync`](https://developers.figma.com/docs/plugins/api/properties/nodes-exportasync/)
- [Image API](https://developers.figma.com/docs/plugins/api/Image/)

### Elementor
- [Elementor plugin GitHub repository](https://github.com/elementor/elementor)
- [Elementor data structure](https://developers.elementor.com/docs/data-structure/)
- [General element structure](https://developers.elementor.com/docs/data-structure/general-elements)
- [Elementor developer documentation](https://developers.elementor.com/)
- [Global style controls](https://developers.elementor.com/docs/editor-controls/global-style)

### WordPress/Gutenberg
- [Gutenberg GitHub repository](https://github.com/wordpress/gutenberg)
- [Block editor data flow and format](https://developer.wordpress.org/block-editor/explanations/architecture/data-flow/)
- [Block serialization parser](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-serialization-default-parser/)
- [`block.json` fundamentals](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-json/)
- [Block attributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/)
- [Edit, save, and block validation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/)

### WPMet products

- [ElementsKit widget catalogue](https://wpmet.com/plugin/elementskit/elements/)
- [ElementsKit documentation](https://wpmet.com/doc/elementskit/)
- [GutenKit block catalogue](https://wpmet.com/plugin/gutenkit/blocks/)

### Design system

- [Material Design 3](https://m3.material.io/)
- [Material Design 3 Web Components](https://github.com/material-components/material-web)
- [Material Design 3 Android Components](https://github.com/material-components/material-components-android)

## 4. Verified platform findings

### 4.1 Figma execution model

The Figma plugin has two separate environments:

- the plugin main thread accesses the Figma document through the `figma` global;
- the UI runs in an iframe and can use browser APIs;
- communication uses messages between the main thread and UI.

#### Engineering consequences

- Scene traversal and raw node serialization belong in `src/plugin`.
- Conversion orchestration, review UI, downloads, and backend calls belong in the UI or backend.
- Messages must be typed, versioned, and validated on both sides.
- Large binary assets should not be repeatedly copied through messages.
- Main-thread work must be chunked so large selections do not freeze the editor.

### 4.2 Dynamic page access

New Figma plugins require `documentAccess: "dynamic-page"`. The current manifest already declares it.

Official guidance discourages loading the full document unless the feature genuinely requires document-wide access. Some synchronous APIs become unavailable or require an explicit page load in dynamic-page mode.

#### FigmaKit rule

The default workflow operates only on `figma.currentPage.selection`. It must not call `loadAllPagesAsync()` during normal conversion. Cross-page design-token or component discovery must be a separate opt-in operation with progress and cancellation.

### 4.3 Nodes, images, text, and variables

- Figma files are node trees; selection is obtained from `figma.currentPage.selection`.
- Images are commonly stored as `ImagePaint` fills rather than an `IMAGE` scene-node type. Bytes are retrieved with `figma.getImageByHash(hash)?.getBytesAsync()`.
- `exportAsync()` can produce image bytes, SVG strings, and `JSON_REST_V1` objects, but it should not replace a curated serializer without measurement.
- Local variables and collections are exposed through asynchronous `figma.variables` methods.
- Text may contain mixed style runs. Font family, weight, size, line height, letter spacing, paragraph behavior, decoration, and hyperlinks cannot safely be inferred from a single top-level style object.

#### Required serializer changes

- Detect image fills on any geometry node.
- Serialize mixed text segments, not only a single text style.
- Preserve component and instance identity plus exposed component properties.
- Preserve explicit Auto Layout values and distinguish them from inferred geometry.
- Resolve variable bindings into both token references and resolved fallback values.
- Export vectors as SVG only when native target support is unsuitable.
- Attach diagnostics instead of silently dropping unsupported values.

### 4.4 Figma manifest and network access

Figma enforces declared external domains through `networkAccess.allowedDomains`. Broad wildcards require justification and reveal wider access to users.

#### FigmaKit rule

- Use an explicit production API origin.
- Use `devAllowedDomains` for local development.
- Do not add the AI provider domain to the plugin when the plugin can call a FigmaKit backend instead.
- Never ship API keys in the Figma plugin bundle.
- Keep image and font origins explicit when remote fetching is introduced.

### 4.5 Elementor data contract

Elementor uses JSON to store and exchange page data. The documented template structure includes:

- `title`;
- `type`;
- `version`;
- `page_settings`;
- `content`.

General elements contain:

- `id`;
- `elType`;
- `isInner`;
- `settings`;
- `elements`.

Widgets additionally use `widgetType`. Layout elements contain nested elements while widget settings store editor control data. Elementor's documentation currently demonstrates template version `0.4`.

#### FigmaKit rule

- Treat Elementor output as a versioned adapter, never as the shared internal model.
- Generate deterministic eight-character hexadecimal IDs unless verified versions require otherwise.
- Capture exact widget settings by manually building and exporting reference templates.
- Never assume a setting key from its UI label.
- Validate imports in real Elementor installations, not only against TypeScript interfaces.
- Maintain fixtures for the oldest and newest Elementor versions FigmaKit promises to support.

### 4.6 Elementor global design system

Elementor supports global colors and fonts. A design can inherit a global value or override it locally.

#### FigmaKit opportunity

Map Figma variables and local styles to Elementor global colors/fonts when the user chooses token synchronization. Store a resolved fallback so the output remains usable if a global token cannot be created or matched.

Proposed token modes:

1. **Preserve values:** use local values only.
2. **Reuse destination globals:** match existing Elementor global tokens.
3. **Create/update globals:** available only through the authenticated WordPress connector and after user review.

### 4.7 Gutenberg serialization contract

Gutenberg represents editor state as a tree of block objects. Saved `post_content` uses HTML plus comment delimiters containing the block name and serialized attributes. On reload, WordPress parses the content back into blocks and validates saved markup against the block implementation.

#### FigmaKit rule

- Generate a block tree first, then serialize it.
- Use registered attribute schemas and canonical saved markup.
- Round-trip every result through the official parser.
- A parser round trip alone is not enough; open, edit, save, and reload in WordPress to detect validation errors.
- Version-test core blocks and `theme.json` interactions.

### 4.8 ElementsKit and GutenKit contracts

ElementsKit extends Elementor with a large widget catalogue. GutenKit extends the block editor with advanced blocks. Their public product pages identify features but are not sufficient to define saved-data schemas.

#### Required fixture research

For every supported addon component:

1. Build a minimal example manually.
2. Export or read its saved content.
3. Change one control at a time.
4. Export again and diff.
5. Identify required, optional, responsive, repeater, and style fields.
6. Verify frontend rendering.
7. Edit, save, reload, and verify again.
8. Repeat for supported plugin versions.

No ElementsKit/GutenKit mapping is “supported” until this procedure passes.

## 5. Current repository assessment

### What exists

- Vite, React, and TypeScript Figma plugin scaffold.
- Plugin/UI separation and `postMessage` communication.
- Selection-based node serialization.
- Node-specific serializer files for several Figma node types.
- Early Elementor builders and widget factories.
- Basic container, heading, and image mapping.
- Placeholder folder for ElementsKit widgets.
- Shared target adapter, diagnostic, validation, and export-artifact contracts.
- Elementor conversion engine migrated behind `ElementorAdapter`, with deprecated compatibility exports for old builder paths.

### What is not complete

- No neutral Design IR; the current Elementor adapter still accepts raw Figma nodes.
- No stable schema validation.
- No Gutenberg adapter.
- No GutenKit adapter.
- ElementsKit registry contains no production mappings.
- No AI client, backend, prompt contract, evaluation set, or privacy controls.
- No WordPress companion plugin.
- No image upload/replacement pipeline.
- No global token synchronization.
- No automated unit, integration, compatibility, or visual regression suite.
- No real import verification matrix.
- No M3 component system in the UI.
- Existing documentation calls parts of the prototype production-ready without the evidence required to support that label.

### Prototype issues that must not become architecture

- Mapping all `TEXT` nodes to Elementor headings is semantically incorrect.
- Treating an `IMAGE` node type as the main image path does not reflect Figma's image-fill model.
- Mapping by raw Figma node type alone cannot identify buttons, cards, accordions, tabs, or repeaters.
- `WidgetBase` is Elementor-shaped and cannot cleanly represent Gutenberg.
- Extensive `any` types hide contract mismatches.
- Addon widget prefixes and settings must not be guessed.

## 6. Target-neutral Design IR

FigmaKit should parse once and export many times. A normalized Design Intermediate Representation separates Figma's scene graph from WordPress-specific storage.

```typescript
type Target = 'elementor' | 'gutenberg' | 'elementskit' | 'gutenkit';

interface DesignDocument {
  schemaVersion: '1';
  source: SourceMetadata;
  roots: DesignNode[];
  tokens: DesignTokens;
  assets: AssetReference[];
  breakpoints: BreakpointSet;
  diagnostics: Diagnostic[];
}

interface DesignNode {
  id: string;
  sourceNodeId: string;
  sourceType: string;
  semanticRole: SemanticRole;
  name: string;
  content?: NodeContent;
  layout: LayoutStyle;
  visual: VisualStyle;
  typography?: TypographyStyle;
  responsive?: ResponsiveOverrides;
  component?: ComponentMetadata;
  children: DesignNode[];
  inference: InferenceMetadata;
}

interface InferenceMetadata {
  source: 'explicit' | 'rule' | 'ai' | 'user';
  confidence: number;
  alternatives?: MappingCandidate[];
  evidence: string[];
}
```

### Normalization principles

- Explicit Figma properties beat inferred geometry.
- Component names and plugin data are hints, not unquestionable truth.
- Preserve source values before transforming them.
- Use target-neutral CSS-like concepts but avoid pretending every CSS feature exists in every target.
- Track lossy transformations with diagnostics.
- Make IDs deterministic from source ID plus conversion scope.
- Keep responsive values independent of any one builder's breakpoint names.

## 7. Semantic inference strategy

Use four layers in order:

1. **Explicit metadata:** plugin data, supported naming hints, user overrides.
2. **Deterministic rules:** node type, Auto Layout, text content, children, repeated geometry, component identity.
3. **AI inference:** ambiguous composite components only.
4. **User decision:** low-confidence or high-impact mappings.

### Example: button detection

A node is a likely button when it is a component/frame with:

- a short text descendant;
- background fill or visible boundary;
- button-like padding;
- horizontal/centered Auto Layout;
- a component or layer name containing a button synonym;
- optional icon sibling.

No individual signal is sufficient. The rule engine produces evidence and a score.

### Mapping policy

- Confidence ≥ 0.90 and low-risk mapping: apply automatically.
- Confidence 0.65–0.89: apply but show in review.
- Confidence below 0.65: use the safest native composition and ask for an optional override.
- Addon mapping without a verified schema: never apply.

Thresholds are initial hypotheses and must be calibrated using real evaluation data.

## 8. Target adapter research

### 8.1 Elementor MVP

#### P0 elements

- Container
- Heading
- Text Editor
- Image
- Button
- Icon
- Divider
- Spacer

#### P0 properties

- Flex direction, wrap, justify, align, gap
- Width, max width, min height
- Margin and padding
- Background color/image/gradient
- Border, radius, shadow, opacity
- Typography and text alignment
- Responsive overrides

#### Validation

- JSON schema validation
- Unique ID validation
- Import into WordPress
- Editor opens without error
- Edit/save/reload
- Frontend screenshot at supported breakpoints

### 8.2 Gutenberg MVP

#### P0 blocks

- `core/group`
- `core/columns`
- `core/column`
- `core/heading`
- `core/paragraph`
- `core/image`
- `core/buttons`
- `core/button`
- `core/list`
- `core/separator`
- `core/spacer`

#### Validation

- Serialize canonical block delimiters.
- Parse with the official JavaScript parser.
- Compare block names, attributes, hierarchy, and relevant HTML.
- Verify no invalid-block warning in WordPress.
- Verify edit/save/reload with multiple themes.

### 8.3 ElementsKit initial candidates

Only adopt after fixture research:

- Heading
- Button
- Icon Box
- Image Box
- FAQ/Accordion
- Advanced Tab
- Testimonial
- Pricing Table
- Team

Each component requires a native Elementor fallback. For example, an unverified pricing-table widget falls back to nested containers, headings, text, list, and button rather than failing the entire page.

### 8.4 GutenKit initial candidates

Only adopt after fixture research:

- Container
- Heading
- Advanced Paragraph
- Button
- Icon Box
- Advanced Image
- FAQ/Advanced Accordion
- Advanced Tab
- Testimonial
- Pricing Table
- Team

Each requires a core Gutenberg fallback where practical.

## 9. AI architecture

### 9.1 Jobs for AI

- Semantic classification of composite components.
- Selection of a verified target widget/block.
- Repeated-pattern and collection detection.
- Desktop-only responsive suggestions.
- Mapping explanation and user-facing diagnostics.
- Visual difference classification after WordPress rendering.
- Bounded repair suggestions.

### 9.2 Jobs that stay deterministic

- Raw Figma serialization.
- Color conversion and unit conversion.
- Known Auto Layout mapping.
- Asset extraction.
- Elementor/Gutenberg serialization.
- Widget/block schema enforcement.
- ID generation.
- Validation and packaging.
- Publishing authorization.

### 9.3 AI data minimization

The normal AI request should contain a compact normalized subtree, not the entire design file. Exclude:

- hidden pages outside selection;
- comments and collaborator data;
- unnecessary image bytes;
- prototype content irrelevant to mapping;
- access tokens and WordPress credentials.

Text content may itself be sensitive. Provide a user-visible AI toggle and disclose what design information leaves Figma. Consider a text-redaction mode that sends length, hierarchy, and role hints instead of literal content.

### 9.4 Typed output

```typescript
interface AiMappingDecision {
  contractVersion: '1';
  sourceNodeId: string;
  semanticRole: SemanticRole;
  candidates: Array<{
    target: Target;
    component: string;
    confidence: number;
    evidenceCodes: string[];
  }>;
  responsiveIntent?: ResponsiveIntent;
  warnings: DiagnosticCode[];
}
```

The backend rejects unknown fields, invalid components, unsupported versions, impossible confidence values, and output that does not match the requested target.

### 9.5 Reliability and fallback

- Timebox AI requests.
- Cache by a privacy-safe hash of the normalized feature set.
- Log model and prompt versions without logging raw confidential design content by default.
- Retry only transient failures with a bounded policy.
- Fall back to deterministic conversion if AI fails.
- Never block basic export because AI is unavailable.
- Require user review before a low-confidence addon mapping.

### 9.6 Evaluation

Build a labeled benchmark of real components and measure:

- semantic classification accuracy;
- target mapping accuracy;
- acceptance versus user correction;
- invalid schema rate;
- unsupported-component hallucination rate;
- responsive suggestion acceptance;
- latency and cost;
- performance by design quality and complexity.

AI is ready for launch only if it measurably improves the deterministic baseline without increasing invalid output.

## 10. Material 3 UX direction

Material Design 3 provides the interaction and visual system, but the plugin must remain compact and native-feeling inside Figma.

### 10.1 Experience goals

- A first conversion should require no documentation.
- The primary action should always be obvious.
- Technical warnings should explain user impact and the next action.
- Advanced configuration should be progressively disclosed.
- Users should be able to understand exactly what will be generated before export.

### 10.2 Primary workflow

```text
Select frame
  → choose output target
  → scan and preflight
  → review mappings
  → convert
  → inspect compatibility/preview
  → download or send to WordPress draft
```

### 10.3 Proposed screens

#### Home/selection

- Selection summary
- Four target cards
- AI assistance switch with a clear privacy explanation
- Primary “Scan selection” button
- Recent conversion entry points

#### Preflight

- Readiness score
- Unsupported layers
- Missing Auto Layout
- Missing responsive reference
- Font and asset warnings
- One-click focus on the relevant Figma node

#### Mapping review

- Source component preview
- Chosen native output component
- Confidence indicator
- Core/addon fallback
- Bulk rules for repeated components

#### Conversion progress

- Determinate progress when measurable
- Current stage: reading, normalizing, mapping, validating, packaging
- Safe cancellation
- No fake progress animation

#### Result

- Success summary
- Native/editable coverage percentage
- Lossy conversion warnings
- Target/plugin requirements
- Download action
- WordPress draft action when connector exists

### 10.4 M3 component mapping

| Need | M3 pattern |
| --- | --- |
| Main conversion action | Filled button |
| Alternative/export action | Tonal or outlined button |
| Target selection | Selectable cards or segmented buttons |
| AI on/off | Switch with supporting text |
| Critical mapping choice | Dialog only when necessary |
| Non-blocking warning | Inline banner/supporting text |
| Status | Linear progress and status text |
| Advanced settings | Expandable sections |
| Short feedback | Snackbar |

### 10.5 Design tokens

Do not scatter literal visual values across CSS. Establish tokens for:

- primary, secondary, tertiary, error, surface, and outline roles;
- on-color roles;
- elevation and state layers;
- shape scale;
- typography roles;
- spacing and density;
- focus, hover, pressed, selected, and disabled states;
- motion duration and easing.

Use accessible semantic colors, not color alone, for status. Dark theme should be token-driven rather than a separate pile of overrides.

### 10.6 Compact plugin adaptations

The current 400×600 window is restrictive for mapping review. Research two layouts:

- compact mode around 400–440 px for quick conversion;
- expanded review mode around 560–720 px for mapping and diagnostics.

The UI may resize with `figma.ui.resize` after an intentional user action. Do not resize unexpectedly during a task.

### 10.7 Accessibility

- Keyboard access for every action.
- Visible focus treatment.
- Semantic buttons, labels, headings, and live regions.
- Minimum usable pointer targets appropriate to M3.
- Do not rely on color alone.
- Respect reduced-motion preferences.
- Announce progress and errors without stealing focus.
- Preserve readable contrast in light and dark themes.
- Plain language and actionable recovery messages.

## 11. Competitive quality strategy

“Best in market” is an outcome to earn through measured advantages, not a launch claim.

### Differentiators to build

1. **Four native targets from one Design IR.**
2. **Best-in-class WPMet mappings** for ElementsKit and GutenKit.
3. **Deterministic first:** AI never makes valid output optional.
4. **Visual QA loop:** measure the rendered WordPress page against Figma.
5. **Honest compatibility:** every loss and fallback is visible.
6. **Editable coverage score:** show how much output is native and directly editable.
7. **Reusable mapping recipes:** teach FigmaKit how a team's components map.
8. **Versioned compatibility:** declare and test supported plugin versions.
9. **Fast time to first result:** excellent defaults and progressive disclosure.
10. **Privacy controls:** minimize what is sent to AI.

### Benchmark dimensions

Compare FigmaKit with relevant competitors using the same Figma fixture:

- import success;
- time to conversion;
- desktop/tablet/mobile visual score;
- semantic structure quality;
- native editability;
- addon component coverage;
- manual cleanup time;
- invalid output count;
- asset handling;
- typography and token preservation;
- explanation quality;
- AI privacy and opt-out behavior.

Publish benchmark methodology internally before using “best” in marketing.

## 12. Research experiments

### Experiment A — `JSON_REST_V1` versus curated serializer

**Question:** Can Figma's `exportAsync({ format: 'JSON_REST_V1' })` reduce custom serializer maintenance without unacceptable payload size or missing plugin-specific metadata?

**Method:** Compare output completeness, size, latency, mixed text, variables, components, and image references across the benchmark file.

**Decision rule:** use the REST export only if it is measurably simpler and at least as reliable; otherwise keep a curated serializer.

### Experiment B — Semantic mapping baseline

**Question:** How far can deterministic rules go before AI is needed?

**Method:** Label at least 200 real components, evaluate rules, then evaluate AI only on rule-ambiguous cases.

**Decision rule:** AI must improve total correct mappings enough to justify latency and data transfer.

### Experiment C — Responsive inference

**Question:** Can desktop Auto Layout predict usable mobile output?

**Method:** Use paired desktop/mobile frames as ground truth, hide mobile from the inference step, and compare predicted layouts.

**Decision rule:** launch as a suggestion feature until user acceptance and visual scores meet the release threshold.

### Experiment D — Elementor compatibility

**Question:** Which settings remain stable across supported Elementor versions?

**Method:** Generate minimal one-control fixtures and import them into the test matrix.

**Decision rule:** stable common settings enter the base adapter; version differences live in compatibility modules.

### Experiment E — Addon fallback quality

**Question:** Can unsupported ElementsKit/GutenKit components degrade into useful core compositions?

**Method:** Disable each addon, import fallback output, and measure editability and visual drift.

### Experiment F — Visual QA metrics

**Question:** Which combination of perceptual diff, layout geometry, OCR/text boxes, and color distance best predicts human cleanup effort?

**Method:** Correlate automated scores with expert ratings on the same conversions.

## 13. Development program

### Phase 0 — Evidence and fixtures

- Create canonical Figma benchmark files.
- Capture real Elementor, Gutenberg, ElementsKit, and GutenKit outputs.
- Create one-control fixture diffs.
- Define supported product versions.
- Establish baseline competitor measurements.

**Gate:** no guessed production schemas.

### Phase 1 — Foundation

- Typed and versioned plugin messages.
- Complete serializer for MVP properties.
- Design IR and normalization.
- Diagnostics model.
- Adapter interface.
- Unit test runner and fixtures.

**Gate:** deterministic IR snapshots across the benchmark.

### Phase 2 — Elementor

- Core widget adapter.
- Responsive and global style handling.
- Asset collection.
- Import/edit/save/reload test harness.

**Gate:** ≥95% import success for supported fixtures and no fatal editor errors.

### Phase 3 — Gutenberg

- Core block tree and serializer.
- Parser round-trip validation.
- Theme compatibility tests.

**Gate:** zero invalid blocks in supported fixtures.

### Phase 4 — ElementsKit and GutenKit

- Versioned addon registries.
- Initial high-value components.
- Dependency detection and core fallback.

**Gate:** every advertised mapping passes the addon compatibility matrix.

### Phase 5 — AI

- Backend gateway and typed contracts.
- Semantic inference and mapping review.
- Responsive suggestions.
- Privacy controls and evaluation dashboard.

**Gate:** measurable improvement over deterministic baseline; zero schema bypass.

### Phase 6 — Visual QA and connector

- WordPress companion plugin.
- Draft import and media pipeline.
- Multi-breakpoint screenshot comparison.
- Bounded repair proposals and undo metadata.

**Gate:** end-to-end conversion to editable WordPress draft with a visible QA report.

### Phase 7 — Beta and launch

- Internal WPMet dogfooding.
- Agency beta.
- Performance and failure-mode hardening.
- Onboarding, support, privacy, analytics consent, and compatibility documentation.

**Gate:** launch metrics met on real, previously unseen customer files.

## 14. Test matrix

### Figma fixture dimensions

- Auto Layout and non-Auto Layout
- Nested layout and absolute children
- Mixed text styles
- Local and bound variables
- Images, SVG vectors, masks, gradients, effects
- Components, variants, instances, and overrides
- Desktop only and paired responsive frames
- Small sections, full pages, and stress-test selections

### WordPress environments

- Supported WordPress versions
- Supported Elementor versions
- ElementsKit free and pro combinations
- GutenKit free and pro combinations
- Addon present, absent, and disabled
- Representative block themes and classic themes
- PHP and browser versions within product support policy

### Required assertions

- Output imports.
- Editor opens.
- No invalid block/widget errors.
- Text and media remain editable.
- Save/reload retains structure.
- Frontend renders without console/PHP fatal errors.
- Missing addons trigger a useful fallback or preflight warning.
- AI off still produces a valid base conversion.

## 15. Metrics

### Product

- Time to first successful conversion
- Conversion completion rate
- Export/import success rate
- Percentage of output represented by native editable elements
- Median manual cleanup time
- Repeat usage after first conversion

### Quality

- Mapping precision and recall by component type
- Unsupported property rate
- Visual score by breakpoint
- Invalid block/widget rate
- Save/reload stability
- Asset and font failure rate

### AI

- AI suggestion acceptance rate
- User correction rate
- Hallucinated/unsupported mapping rate
- AI failure fallback success
- Median and p95 latency
- Cost per successful conversion

### Initial release targets

- ≥95% import success across supported fixtures
- 0 invalid Gutenberg blocks in the release suite
- 0 fatal errors when addons are absent
- ≥90% deterministic accuracy for basic elements
- AI improves ambiguous-component accuracy over the rule baseline
- Every lossy conversion generates a visible diagnostic

## 16. Security and privacy

- No model or WordPress secrets in client bundles.
- Use a backend gateway for AI and connector tokens.
- Validate every message and API payload.
- Restrict Figma manifest domains.
- Use short-lived, scoped WordPress connection tokens.
- Create drafts by default.
- Require a deliberate user action before publishing or overwriting.
- Sanitize filenames, HTML, SVG, URLs, and media metadata.
- Prevent SSRF in media import.
- Add size, node-count, nesting, and execution limits.
- Provide AI data disclosure, opt-out, retention policy, and deletion workflow before beta.

## 17. Open questions

These items are intentionally unresolved and require product or experiment decisions:

- Exact oldest supported WordPress and plugin versions.
- Whether launch includes file download only or a WordPress connector.
- Whether AI is opt-in by default in each jurisdiction/account type.
- How responsive reference frames are associated: naming, explicit UI, or both.
- Whether Figma component mapping recipes are stored locally, in plugin data, or in a team account.
- Which ElementsKit/GutenKit Pro components are licensed for each plan.
- Whether global token creation is included in MVP.
- Maximum supported selection size and asset payload.
- Pricing model after real inference and storage costs are known.

## 18. Immediate R&D backlog

### Week 1

- [ ] Build the canonical Figma benchmark file.
- [ ] Create real core Elementor fixtures for container, heading, text, image, and button.
- [ ] Create real core Gutenberg fixtures for the matching block set.
- [ ] Add fixture metadata: WordPress/plugin versions and creation date.
- [ ] Correct image-fill and mixed-text assumptions in serializer research notes.

### Week 2

- [ ] Extract a first ElementsKit and GutenKit component fixture.
- [ ] Draft Design IR JSON Schema.
- [ ] Prototype deterministic semantic scoring for heading, paragraph, button, and card.
- [ ] Test `JSON_REST_V1` against the curated serializer.
- [ ] Create the first import/edit/save/reload checklist.

### Week 3

- [ ] Implement adapter interface spike.
- [ ] Convert one benchmark section to both Elementor and Gutenberg.
- [ ] Run official parser round trips for Gutenberg.
- [ ] Produce M3 wireframes for home, preflight, mapping review, progress, and results.
- [ ] Conduct five internal usability sessions.

### Week 4

- [ ] Freeze the P0 property support matrix.
- [ ] Define supported version matrix.
- [ ] Label the first AI evaluation dataset.
- [ ] Establish competitor benchmark baselines.
- [ ] Turn validated findings into milestone estimates.

## 19. Definition of ready for implementation

A target component may enter development only when:

- its official product behavior is understood;
- a real minimal output fixture exists;
- required plugin versions are recorded;
- target settings/attributes are verified;
- fallback behavior is defined;
- import and edit/reload test cases are written;
- unsupported Figma properties are listed;
- visual acceptance criteria exist.

## 20. Definition of done for a supported mapping

- Deterministic conversion from Design IR.
- Typed schema with no unbounded `any` at the adapter boundary.
- Unit fixture test.
- Real WordPress import test.
- Editor edit/save/reload test.
- Frontend render test.
- Responsive test.
- Missing-dependency behavior test.
- User-facing diagnostic for lossy behavior.
- Documentation and compatibility matrix entry.

## 21. Documentation maintenance

- Review official Figma, Elementor, WordPress, ElementsKit, GutenKit, and M3 changes before each release.
- Record the review date and affected adapter versions.
- Store sanitized real exports as fixtures, not pasted assumptions in guides.
- Mark hypotheses explicitly until an experiment resolves them.
- Update this document when evidence changes a decision.
- Never describe the converter as production-ready without passing the release gates above.
