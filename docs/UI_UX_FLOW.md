# FigmaKit UI/UX Flow

**Status:** Product UX specification

**Design system:** Material Design 3, adapted for the Figma plugin environment

## 1. Experience goal

FigmaKit should let a first-time user convert a selected Figma design into native WordPress content without learning technical schemas. The interface should be simple by default and reveal advanced settings only when needed.

The product supports:

- Figma → Elementor
- Figma → Gutenberg
- Figma → ElementsKit
- Figma → GutenKit
- AI-assisted component mapping
- Responsive layout suggestions
- Website connection
- Direct website import
- Live publishing
- Downloadable export when a website is not connected

## 2. Primary user journey

```text
Select Figma design
        ↓
Choose WordPress target
        ↓
Configure AI and conversion
        ↓
Analyze and preflight
        ↓
Review component mappings
        ↓
Review responsive behavior
        ↓
Connect or select website
        ↓
Validate website compatibility
        ↓
Preview conversion
        ↓
Import as draft or publish live
        ↓
Verify live result and allow rollback
```

The compact user-facing stepper should be:

```text
1. Design → 2. Target → 3. Review → 4. Website → 5. Publish
```

## 3. Plugin layout

### Compact mode

- Recommended width: 420–440 px
- Used for selection, target choice, settings, progress, and result

### Review mode

- Recommended width: 600–720 px
- Used for mapping review, responsive preview, diagnostics, and website preview

The plugin may resize only after an intentional user action. It should not unexpectedly change size while the user is reading or editing a setting.

## 4. Step-by-step experience

### Step 1 — Select design

The user selects one or more top-level frames or sections in Figma.

The screen shows:

- selected frame name;
- dimensions;
- layer count;
- detected desktop, tablet, and mobile frames;
- Auto Layout coverage;
- component and instance count;
- a thumbnail preview.

Empty state:

> Select a frame or section from the Figma canvas to begin.

Actions:

- Refresh selection
- Focus selected frame
- Continue

Blocking conditions:

- no selection;
- unsupported editor type;
- selection exceeds safe processing limits.

### Step 2 — Choose output target

Show four selectable M3 cards:

| Target      | Description                                 | Dependency              |
| ----------- | ------------------------------------------- | ----------------------- |
| Elementor   | Native Elementor containers and widgets     | Elementor               |
| Gutenberg   | Native WordPress core blocks                | WordPress Block Editor  |
| ElementsKit | Elementor plus verified ElementsKit widgets | Elementor + ElementsKit |
| GutenKit    | Gutenberg plus verified GutenKit blocks     | WordPress + GutenKit    |

Each card shows:

- product icon;
- output type;
- native/editable label;
- dependency;
- supported, beta, or coming-soon state.

Only one target is selected for a conversion.

Primary action: **Continue**

### Step 3 — AI and conversion settings

Recommended defaults:

- AI assistance: On
- Responsive suggestions: On
- Prefer native components: On
- Use global colors and fonts: On
- Use addon widgets: On for ElementsKit/GutenKit
- Preserve unsupported layers as safe fallback: On

AI disclosure:

> AI receives only the selected design structure needed for component mapping and responsive suggestions.

Advanced settings stay collapsed:

- breakpoint mapping;
- typography scaling;
- image quality;
- SVG handling;
- token strategy;
- fallback policy;
- target version.

Primary action: **Analyze design**

### Step 4 — Analyze and preflight

Show real processing stages:

```text
Reading selected layers
Normalizing layout
Detecting components
Checking responsive behavior
Preparing assets
Checking compatibility
```

The result shows a readiness report:

- readiness score;
- native mapping coverage;
- Auto Layout coverage;
- recognized components;
- unsupported properties;
- missing fonts;
- unresolved images;
- missing responsive references;
- low-confidence semantic mappings.

Severity levels:

- Ready
- Review recommended
- Must fix

Every issue includes:

- affected Figma node;
- user impact;
- recommended action;
- “Focus in Figma” action where supported.

The system must never silently remove an unsupported property.

### Step 5 — Review component mappings

Show only mappings that need attention by default. The user can expand “All mappings.”

| Figma component | Proposed output           | Status             |
| --------------- | ------------------------- | ------------------ |
| Hero title      | Elementor Heading         | Confident          |
| CTA component   | Elementor Button          | Confident          |
| Pricing card    | ElementsKit Pricing Table | Review recommended |
| FAQ group       | ElementsKit Accordion     | Confident          |

Selecting a row shows:

- Figma preview;
- detected semantic role;
- recommended target component;
- mapping evidence;
- alternative components;
- native core fallback;
- unsupported-property warnings;
- responsive behavior.

Actions:

- Accept mapping
- Choose alternative
- Use native fallback
- Apply to all similar components
- Return to Figma and fix

AI-generated decisions have an **AI suggested** label. Verified deterministic mappings should not be presented as AI decisions.

### Step 6 — Responsive review

Tabs:

- Desktop
- Tablet
- Mobile

For each breakpoint show:

- layout direction;
- column count;
- width behavior;
- alignment;
- padding and gap;
- typography scale;
- visibility;
- overflow warnings.

AI-inferred values display an **AI suggested** badge and can be accepted, changed, or reset.

Primary action: **Continue to website**

## 5. Website connection

Website connection appears before export or publishing.

The user may:

1. Connect a new WordPress website.
2. Select a previously connected website.
3. Skip connection and download the output file.

### Connect website screen

Fields and actions:

- WordPress site URL
- Start secure connection
- Connection status
- Website name and favicon after verification
- WordPress version
- Active theme
- Relevant plugin versions

The recommended architecture uses a FigmaKit companion WordPress plugin and a short-lived, scoped connection flow. WordPress credentials, application passwords, and permanent API secrets must not be stored inside the Figma plugin bundle.

### Connection states

- Not connected
- Connecting
- Authorization required
- Connected
- Connection expired
- Incompatible
- Offline

### Website compatibility check

After connection, FigmaKit checks:

- WordPress REST availability;
- FigmaKit connector version;
- current user's WordPress capabilities;
- Elementor availability and version;
- ElementsKit availability, plan, and enabled widgets;
- GutenKit availability, plan, and enabled blocks;
- theme compatibility signals;
- media upload permission;
- page creation and publishing permission;
- PHP and WordPress versions against the support matrix.

Example report:

```text
Website ready

WordPress 6.x              Compatible
Elementor                  Active
ElementsKit                Active
Required widgets           Enabled
Media upload               Allowed
Publish pages              Allowed
```

If a dependency is missing, the user can:

- switch to the core target;
- use verified fallbacks;
- fix the website and check again;
- download the output instead.

FigmaKit must not silently install or activate WordPress plugins.

## 6. Preview before import

After website validation, FigmaKit creates a conversion preview.

Show:

- Figma reference;
- generated WordPress preview;
- desktop/tablet/mobile modes;
- native editable coverage;
- fallback count;
- warning count;
- assets to upload;
- page title, slug, template, and parent page;
- existing URL conflict.

Comparison controls:

- Figma
- WordPress
- Side by side
- Overlay
- Difference

The user should be able to return to mapping or responsive review without losing work.

## 7. Import and publishing choices

When a website is connected, the final screen offers:

### Import as draft

- Upload assets.
- Create the page as a WordPress draft.
- Import native target content.
- Return an editor link and preview link.

This is the recommended option.

### Publish live

- Upload assets.
- Create or update the page.
- Import native target content.
- Publish the page immediately.
- Return the live URL and edit URL.

### Download instead

- Elementor/ElementsKit: template JSON package.
- Gutenberg/GutenKit: validated block content/package.
- Include a compatibility and warning report.

## 8. Live publishing confirmation

Live publishing changes the public website. The final action requires a clear confirmation screen immediately before publishing.

Show:

- destination website;
- page title;
- final live URL;
- create-new or update-existing status;
- target builder;
- assets that will be uploaded;
- current page backup status;
- warnings;
- whether search engines may access the page.

Confirmation copy:

> This will publish the generated page on **example.com** and make it publicly accessible.

Final button: **Publish live**

For an existing page, the action must be more explicit:

> This will replace the current content of **/pricing/**. A restorable revision will be created first.

Final button: **Create revision and replace live page**

Typing the page slug may be required for high-impact replacements, but should not be required when creating a new page.

## 9. Safe direct-import pipeline

```text
Lock conversion version
        ↓
Create WordPress revision or recovery snapshot
        ↓
Upload and deduplicate media
        ↓
Replace temporary asset references
        ↓
Validate final target payload
        ↓
Import builder data
        ↓
Render private verification URL
        ↓
Run health and visual checks
        ↓
Publish/swap live content
        ↓
Verify public URL
```

The live page should not become visible until media upload, target validation, and private render checks succeed.

If any pre-publish stage fails:

- do not modify the live page;
- retain a resumable job when safe;
- show the exact failed stage;
- offer retry or download.

If verification fails after publishing:

- show a high-priority warning;
- provide one-click rollback to the created revision;
- retain diagnostics for support.

## 10. Publish progress

Show real stages:

```text
Creating recovery revision       ✓
Uploading images                 ✓
Importing native widgets         ✓
Validating responsive output     ●
Publishing page
Verifying live URL
```

Requirements:

- real progress when measurable;
- visible current stage;
- cancellation before the irreversible publish step;
- no fake “almost done” loop;
- safe retry for resumable stages;
- prevent duplicate page creation from repeated clicks.

## 11. Success screen

Show:

```text
Page published successfully

48 native components
2 fallback compositions
96% editable coverage
0 critical issues
```

Actions:

- View live page
- Edit in WordPress
- Compare with Figma
- Download backup
- View conversion report
- Convert another page
- Roll back publication

The live URL and edit URL must refer to the verified destination response, not a URL guessed by the client.

## 12. Error recovery

Every error must explain:

- what happened;
- what was affected;
- whether the live site changed;
- what the user can do next.

Examples:

### Connection expired

> The website connection expired before import. Nothing was published. Reconnect to continue with the prepared conversion.

### Missing addon

> GutenKit is not active on this website. Switch to Gutenberg fallback, activate GutenKit manually, or download the output.

### Asset upload failed

> Three images could not be uploaded. The live page was not changed. Retry the upload or export the package.

### Verification failed

> The page was imported, but the rendered result failed verification. It remains a draft and is not public.

## 13. Material Design 3 patterns

| Requirement                 | M3 pattern                      |
| --------------------------- | ------------------------------- |
| Primary next/publish action | Filled button                   |
| Secondary action            | Tonal button                    |
| Download/alternative        | Outlined button                 |
| Target selection            | Selectable cards                |
| AI and option switches      | Switch with supporting text     |
| Step navigation             | Compact stepper/progress header |
| Compatibility result        | Status list with icons and text |
| Warnings                    | Inline banner                   |
| Destructive replacement     | Confirmation dialog/page        |
| Processing                  | Linear progress indicator       |
| Short feedback              | Snackbar                        |
| Advanced settings           | Expandable sections             |

Use semantic design tokens for color, typography, shape, spacing, elevation, focus, selected, disabled, error, warning, and success states. Do not communicate status through color alone.

## 14. Accessibility requirements

- All actions are keyboard accessible.
- Focus state is always visible.
- Labels are programmatically connected to fields.
- Progress and status changes use appropriate live regions.
- Focus is not moved unexpectedly.
- Light and dark themes meet readable contrast requirements.
- Reduced-motion preference is respected.
- Icons have text labels or accessible names.
- Error messages identify the relevant field and recovery action.
- Touch/pointer targets follow usable M3 sizing.

## 15. UX principles

1. Ask for the minimum decisions required for a successful conversion.
2. Show uncertain mappings; do not interrupt users for obvious mappings.
3. Keep advanced settings collapsed.
4. Explain user impact instead of exposing raw schema errors.
5. Keep AI visibly optional.
6. Never silently omit unsupported design properties.
7. Show destination website and page URL before publishing.
8. Never replace a live page without a recovery revision.
9. Verify privately before making content public.
10. Always provide a download path when website connection is unavailable.

## 16. MVP flow

The first usable release can implement:

```text
Select frame
→ choose target
→ configure AI
→ analyze
→ review uncertain mappings
→ connect website or choose download
→ run compatibility check
→ preview
→ import as draft or confirm Publish live
→ verify result
```

MVP website delivery should initially support creating new pages. Updating an existing live page should be enabled only after revision creation and rollback have been tested thoroughly.

## 17. Later improvements

- Saved websites and team workspaces
- Batch page conversion
- Reusable component mapping recipes
- Automatic staging-site workflow
- Scheduled publishing
- Conversion history and diffs
- Collaborative mapping approval
- Design token synchronization
- Visual QA auto-fix with change review
- Site-wide header, footer, and template conversion
- Deployment status notifications
