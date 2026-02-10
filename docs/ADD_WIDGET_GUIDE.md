# How to Add a New Widget to FigmaKit

Complete guide for adding new widgets to the FigmaKit converter system.

---

## 🎯 Quick Start: 3 Steps

### Step 1: Choose Widget Type (Elementor or ElementsKit)
### Step 2: Create Widget Files  
### Step 3: Register & Test

---

## 📁 Widget Folder Structure

FigmaKit supports two types of widgets:

```
src/ui/widgets/
  ├── elementor/          ✅ Standard Elementor widgets
  │   ├── heading/
  │   ├── image/
  │   ├── container/
  │   └── index.ts
  │
  ├── elementskit/        ✅ ElementsKit premium widgets
  │   ├── [widget-name]/
  │   └── index.ts
  │
  └── index.ts            ✅ Combined registry
```

**Elementor Widgets**: Standard widgets included in Elementor  
**ElementsKit Widgets**: Premium widgets from ElementsKit plugin

---

## 📝 Step 1: Create Widget Files

### For Elementor Widget

Create a new folder in `src/ui/widgets/elementor/`:

```
src/ui/widgets/elementor/button/
  ├── buttonWidget.ts       ← Widget structure & factory function
  ├── buttonControls.ts     ← Default settings & Figma mapping
  └── index.ts              ← Export everything
```

### For ElementsKit Widget

Create a new folder in `src/ui/widgets/elementskit/`:

```
src/ui/widgets/elementskit/accordion/
  ├── accordionWidget.ts
  ├── accordionControls.ts
  └── index.ts
```

### File 1: Widget Structure (`buttonWidget.ts`)

```typescript
// src/ui/widgets/elementor/button/buttonWidget.ts
import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { WidgetBase, ButtonWidgetSettings } from '@/types/widget';

/**
 * Create a Button widget for Elementor
 * Converts Figma button components/instances to Elementor button widgets
 */
export function createButtonWidget(
	text: string,
	settings: Partial<ButtonWidgetSettings> = {},
	depth: number = 0
): WidgetBase {
	return {
		id: getUniqueId(),
		elType: 'widget',
		widgetType: 'button',
		isInner: getIsInner(depth),
		settings: {
			text: text,
			link: {
				url: '#',
				is_external: '',
				nofollow: '',
			},
			size: 'md',
			button_type: 'primary',
			align: 'left',
			text_color: '#FFFFFF',
			background_color: '#0066FF',
			border_radius: {
				unit: 'px',
				top: '4',
				right: '4',
				bottom: '4',
				left: '4',
				isLinked: true,
			},
			button_text_padding: {
				unit: 'px',
				top: '12',
				right: '24',
				bottom: '12',
				left: '24',
				isLinked: false,
			},
			hover_animation: 'grow',
			...settings,
		},
		elements: [],
	};
}
```

### File 2: Settings & Controls (`buttonControls.ts`)

```typescript
// src/ui/widgets/elementor/button/buttonControls.ts
import { ButtonWidgetSettings } from '@/types/widget';
import { rgbToHex } from '@/utils/colorUtils';
/**
 * Default settings for Button widget
 */
export const defaultButtonSettings: ButtonWidgetSettings = {
	text: 'Click me',
	link: {
		url: '#',
		is_external: '',
		nofollow: '',
	},
	size: 'md',
	button_type: 'primary',
	align: 'left',
	text_color: '#FFFFFF',
	background_color: '#0066FF',
	typography_typography: 'custom',
	typography_font_size: {
		unit: 'px',
		size: 16,
		sizes: [],
	},
	typography_font_weight: '500',
	border_radius: {
		unit: 'px',
		top: '4',
		right: '4',
		bottom: '4',
		left: '4',
		isLinked: true,
	},
	button_text_padding: {
		unit: 'px',
		top: '12',
		right: '24',
		bottom: '12',
		left: '24',
		isLinked: false,
	},
	hover_animation: 'grow',
};

/**
 * Map Figma button component to Elementor button settings
 */
export function mapFigmaButtonToButton(
	figmaNode: any
): Partial<ButtonWidgetSettings> {
	const settings: Partial<ButtonWidgetSettings> = {};

	// Map button text
	if (figmaNode.characters) {
		settings.text = figmaNode.characters;
	}

	// Map button size based on height
	if (figmaNode.absoluteBoundingBox?.height) {
		const height = figmaNode.absoluteBoundingBox.height;
		if (height <= 32) {
			settings.size = 'xs';
		} else if (height <= 40) {
			settings.size = 'sm';
		} else if (height <= 48) {
			settings.size = 'md';
		} else if (height <= 56) {
			settings.size = 'lg';
		} else {
			settings.size = 'xl';
		}
	}

	// Map background color
	if (figmaNode.fills && figmaNode.fills[0]?.color) {
		const color = figmaNode.fills[0].color;
		settings.background_color = rgbToHex(color);
	}

	// Map corner radius
	if (figmaNode.cornerRadius && figmaNode.cornerRadius > 0) {
		settings.border_radius = {
			unit: 'px',
			top: String(figmaNode.cornerRadius),
			right: String(figmaNode.cornerRadius),
			bottom: String(figmaNode.cornerRadius),
			left: String(figmaNode.cornerRadius),
			isLinked: true,
		};
	}

	return settings;
}

```

### File 3: Exports (`index.ts`)

```typescript
export { createButtonWidget } from './buttonWidget';
export {
	defaultButtonSettings,
	mapFigmaButtonToButton,
} from './buttonControls';
```

---

## 🔧 Step 2: Register Your Widget

### A) Add Widget Type to Types

Add your widget settings interface to `src/types/widget.ts`:

```typescript
export interface ButtonWidgetSettings {
	text?: string;
	link?: {
		url: string;
		is_external: string;
		nofollow: string;
	};
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	button_type?: 'primary' | 'secondary' | 'success' | 'danger';
	align?: 'left' | 'center' | 'right' | 'justify';
	text_color?: string;
	background_color?: string;
	typography_typography?: string;
	typography_font_size?: {
		unit: string;
		size: number;
		sizes: any[];
	};
	typography_font_weight?: string;
	border_radius?: {
		unit: string;
		top: string;
		right: string;
		bottom: string;
		left: string;
		isLinked: boolean;
	};
	button_text_padding?: {
		unit: string;
		top: string;
		right: string;
		bottom: string;
		left: string;
		isLinked: boolean;
	};
	hover_animation?: string;
	[key: string]: any;
}
```

### B) Register in Widget Registry

**For Elementor Widget:**

Add to `src/ui/widgets/elementor/index.ts`:

```typescript
export { createHeadingWidget, mapFigmaTextToHeading } from './heading';
export { createImageWidget, mapFigmaImageToImage } from './image';
export { createContainerWidget, mapFigmaFrameToContainer } from './container';
export { createButtonWidget, mapFigmaButtonToButton } from './button';  // ✅ Add here
```

Then update `src/ui/widgets/index.ts`:

```typescript
import {
	createHeadingWidget,
	mapFigmaTextToHeading,
	createImageWidget,
	mapFigmaImageToImage,
	createContainerWidget,
	mapFigmaFrameToContainer,
	createButtonWidget,  // ✅ Add import
	mapFigmaButtonToButton,  // ✅ Add import
} from './elementor';

export const ElementorWidgetsRegistry = {
	heading: createHeadingWidget,
	image: createImageWidget,
	container: createContainerWidget,
	button: createButtonWidget,  // ✅ Add here
};

export const FigmaMappers = {
	heading: mapFigmaTextToHeading,
	image: mapFigmaImageToImage,
	container: mapFigmaFrameToContainer,
	button: mapFigmaButtonToButton,  // ✅ Add here
};
```

**For ElementsKit Widget:**

Add to `src/ui/widgets/elementskit/index.ts`:

```typescript
export { createAccordionWidget, mapFigmaAccordionToAccordion } from './accordion';

export const ElementsKitWidgets = {
	accordion: createAccordionWidget,  // ✅ Add here
};

export const ElementsKitMappers = {
	accordion: mapFigmaAccordionToAccordion,  // ✅ Add here
};
```

Then update `src/ui/widgets/index.ts`:

```typescript
import { ElementsKitWidgets } from './elementskit';

export const WidgetsRegistry = {
	...ElementorWidgetsRegistry,
	...ElementsKitWidgets,  // ✅ Automatically includes all ElementsKit widgets
};
```

### C) Add Figma Mapping

Add to `src/ui/config/widgetsConfig.ts`:

```typescript
export const NodeToElementorMap: Record<string, WidgetType> = {
	TEXT: 'heading',
	IMAGE: 'image',
	FRAME: 'container',
	GROUP: 'container',
	INSTANCE: 'button', // ✅ Map Figma component instances to button
};
```

### D) Update Widget Factory (Optional)

If you need custom logic, update `src/ui/builder/widgetFactory.ts`:

```typescript
import { createButtonWidget } from '@/widgets/elementor/button';
// or
import { createAccordionWidget } from '@/widgets/elementskit/accordion';
export function createWidgetFromFigmaNode(
	figmaNode: FigmaNode,
	depth: number = 0
): WidgetBase | null {
	// ... existing code ...

	switch (widgetType) {
		case 'button': {
			// Extract button text
			const text = figmaNode.characters || 'Click me';
			widget = createButtonWidget(text, mappedSettings, depth);
			break;
		}

		// ... other cases ...
	}

	return widget;
}
```

---

## 🧪 Step 3: Test Your Widget

### 1. Build the Project

```bash
npm run build
```

### 2. Test in Figma

1. Open Figma
2. Load your plugin
3. Create/select a button component
4. Run the converter
5. Check the generated JSON

### 3. Verify Output

Expected Elementor JSON structure:

```json
{
	"id": "abc123",
	"elType": "widget",
	"widgetType": "button",
	"settings": {
		"text": "Click me",
		"link": {
			"url": "#",
			"is_external": "",
			"nofollow": ""
		},
		"size": "md",
		"background_color": "#0066FF",
		"text_color": "#FFFFFF"
	},
	"elements": []
}
```

---
 (Elementor)

```typescript
// src/ui/widgets/elementor/divider/dividerWidget.ts
import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { WidgetBase } from '@/types/widget';

export function createDividerWidget(
	settings = {},
	depth: number = 0
): WidgetBase {
	return {
		id: getUniqueId(),
		elType: 'widget',
		widgetType: 'divider',
		isInner: getIsInner(depth),
		settings: {
			style: 'solid',
			weight: {
				unit: 'px',
				size: 1,
				sizes: [],
			},
			color: '#000000',
			width: {
				unit: '%',
				size: 100,
				sizes: [],
			},
			gap: {
				unit: 'px',
				size: 15,
				sizes: [],
			},
			...settings,
		},
		elements: [],
	};
}

// src/ui/widgets/elementor/divider/dividerControls.ts
export function mapFigmaDividerToDivider(figmaNode: any) {
	const settings: any = {};

	if (figmaNode.strokes && figmaNode.strokes[0]?.color) {
		settings.color = rgbToHex(figmaNode.strokes[0].color);
	}

	if (figmaNode.strokeWeight) {
		settings.weight = {
			unit: 'px',
			size: figmaNode.strokeWeight,
			sizes: [],
		};
	}

	return settings;
}

// src/ui/widgets/elementor/divider/index.ts
export { createDividerWidget } from './dividerWidget';
export { mapFigmaDividerToDivider } from './dividerControls';
```

### Example 2: Spacer Widget (Elementor)

```typescript
// src/ui/widgets/elementor/spacer/spacerWidget.ts
import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { WidgetBase } from '@/types/widget';

export function createSpacerWidget(
	height: number = 50,
	depth: number = 0
): WidgetBase {
	return {
		id: getUniqueId(),
		elType: 'widget',
		widgetType: 'spacer',
		isInner: getIsInner(depth),
		settings: {
			space: {
				unit: 'px',
				size: height,
				sizes: [],
			},
		},
		elements: [],
	};
}

// src/ui/widgets/elementor/spacer/index.ts
export { createSpacerWidget } from './spacerWidget';
```

### Example 3: Icon Widget (Elementor)

```typescript
// src/ui/widgets/elementor/icon/iconWidget.ts
import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { WidgetBase } from '@/types/widget';

export function createIconWidget(
	iconName: string = 'fa-star',
	settings = {},
	depth: number = 0
): WidgetBase {
	return {
		id: getUniqueId(),
		elType: 'widget',
		widgetType: 'icon',
		isInner: getIsInner(depth),
		settings: {
			selected_icon: {
				value: iconName,
				library: 'fa-solid',
			},
			view: 'default',
			shape: 'circle',
			size: {
				unit: 'px',
				size: 50,
				sizes: [],
			},
			icon_color: '#000000',
			icon_size: {
				unit: 'px',
				size: 24,
				sizes: [],
			},
			align: 'left',
			...settings,
		},
		elements: [],
	};
}
```

---

### Example 4: Accordion Widget (ElementsKit)

```typescript
// src/ui/widgets/elementskit/accordion/accordionWidget.ts
import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { WidgetBase } from '@/types/widget';

export function createAccordionWidget(
	items: Array<{ title: string; content: string }> = [],
	settings = {},
	depth: number = 0
): WidgetBase {
	return {
		id: getUniqueId(),
		elType: 'widget',
		widgetType: 'ekit-accordion',
		isInner: getIsInner(depth),
		settings: {
			ekit_accordion_items: items.map((item, index) => ({
				_id: getUniqueId(),
				ekit_accordion_title: item.title,
				ekit_accordion_content: item.content,
			})),
			ekit_accordion_type: 'accordion',
			ekit_accordion_icon_position: 'left',
			...settings,
		},
		elements: [],
	};
}

// src/ui/widgets/elementskit/accordion/index.ts
export { createAccordionWidget } from './accordionWidget';
```

---

## 🎨 Widget Templates

### Elementor Widget Template

```typescript
// src/ui/widgets/elementor/my-widget/myWidget.ts
import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { WidgetBase } from '@/types/widget';

export function createMyWidget(depth: number = 0): WidgetBase {
	return {
		id: getUniqueId(),
		elType: 'widget',
		widgetType: 'my-widget',
		isInner: getIsInner(depth),
		settings: {
			// Add Elementor widget settings here
		},
		elements: [],
	};
}
```

### ElementsKit Widget Template

```typescript
// src/ui/widgets/elementskit/my-widget/myWidget.ts
import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { WidgetBase } from '@/types/widget';

export function createMyElementsKitWidget(depth: number = 0): WidgetBase {
	return {
		id: getUniqueId(),
		elType: 'widget',
		widgetType: 'ekit-my-widget',  // ✅ ElementsKit widgets use 'ekit-' prefix
		isInner: getIsInner(depth),
		settings: {
			// Add ElementsKit widget settings here
		},
		elements: [],
	};
}
```

---

## ✅ Widget Checklist

Use this checklist when adding a new widget:

**For Elementor Widget:**
- [ ] Create widget folder: `src/ui/widgets/elementor/{widgetName}/`
- [ ] Create `{widgetName}Widget.ts` with factory function
- [ ] Create `{widgetName}Controls.ts` with default settings
- [ ] Create `index.ts` with exports
- [ ] Add widget settings interface to `src/types/widget.ts`
- [ ] Register in `src/ui/widgets/elementor/index.ts`
- [ ] Update `ElementorWidgetsRegistry` in `src/ui/widgets/index.ts`
- [ ] Add Figma mapping in `src/ui/config/widgetsConfig.ts`
- [ ] Update `widgetFactory.ts` if custom logic needed
- [ ] Build project: `npm run build`
- [ ] Test in Figma plugin
- [ ] Verify JSON output structure
- [ ] Import to WordPress Elementor
- [ ] Document widget usage (optional)

**For ElementsKit Widget:**
- [ ] Create widget folder: `src/ui/widgets/elementskit/{widgetName}/`
- [ ] Create `{widgetName}Widget.ts` with factory function (use 'ekit-' prefix)
- [ ] Create `{widgetName}Controls.ts` with default settings
- [ ] Create `index.ts` with exports
- [ ] Add widget settings interface to `src/types/widget.ts`
- [ ] Register in `src/ui/widgets/elementskit/index.ts`
- [ ] Add to `ElementsKitWidgets` object
- [ ] Add Figma mapping in `src/ui/config/widgetsConfig.ts`
- [ ] Update `widgetFactory.ts` if custom logic needed
- [ ] Build project: `npm run build`
- [ ] Test in Figma plugin (requires ElementsKit installed)
- [ ] Verify JSON output structure
- [ ] Import to WordPress with ElementsKit
- [ ] Document widget usage (optional)

- [ ] Create widget folder: `src/ui/widgets/{widgetName}/`
- [ ] Create `{widgetName}Widget.ts` with factory function
- [ ] Create `{widgetName}Controls.ts` with default settings
- [ ] Create `index.ts` with exports
- [ ] Add widget settings interface to `src/types/widget.ts`
- [ ] Register in `src/ui/widgets/index.ts` (both registries)
- [ ] Add Figma mapping in `src/ui/config/widgetsConfig.ts`
- [ ] Update `widgetFactory.ts` if custom logic needed
- [ ] Build project: `npm run build`
- [ ] Test in Figma plugin
- [ ] Verify JSON output structure
- [ ] Import to WordPress Elementor
- [ ] Document widget usage (optional)

---

## 🎯 Widget Types Reference

Common Elementor widget types you can implement:

| Widget Type      | Description            | Complexity      |
| ---------------- | ---------------------- | --------------- |
| `heading`        | Text headings (H1-H6)  | ✅ Included     |
| `image`          | Images with captions   | ✅ Included     |
| `text-editor`    | Rich text content      | ⭐ Easy         |
| `button`         | Call-to-action buttons | ⭐ Easy         |
**Solution:** Check registration in appropriate registry:

```typescript
// For Elementor widgets - check src/ui/widgets/elementor/index.ts
export { createMyWidget } from './my-widget';

// Then check src/ui/widgets/index.ts
export const ElementorWidgetsRegistry = {
	// ...
	myWidget: createMyWidget,  // ✅ Must be here
};

// For ElementsKit widgets - check src/ui/widgets/elementskit/index.ts
export const ElementsKitWidgets = {le_maps`    | Google Maps embed      | ⭐⭐ Medium     |
| `image-carousel` | Image slider           | ⭐⭐⭐ Advanced |
| `testimonial`    | Customer testimonials  | ⭐⭐⭐ Advanced |
| `tabs`           | Tabbed content         | ⭐⭐⭐ Advanced |
| `accordion`      | Collapsible sections   | ⭐⭐⭐ Advanced |

---

## 🐛 Troubleshooting

### Widget Not Appearing

**Problem:** Widget doesn't show in output  
**Solution:** Check registration in `WidgetsRegistry`

```typescript
// Make sure it's exported
export const WidgetsRegistry = {
	// ...
	myWidget: createMyWidget, // ✅ Must be here
};
```

### Figma Node Not Converting

**Problem:** Figma selection not converting to widget  
**Solution:** Check Figma mapping

```typescript
export const NodeToElementorMap = {
	// Make sure your Figma node type is mapped
	COMPONENT: 'myWidget', // ✅ Add mapping
};
```

### Widget Factory Error

**Problem:** Error in `createWidgetFromFigmaNode`  
**Solution:** Add case in switch statement

```typescript
switch (widgetType) {
  case 'myWidget': {
    widget = createMyWidget(/* params */, depth);
    break;
  }
}
```

### Invalid Settings

**Problem:** Widget settings not matching Elementor  
**Solution:** Check Elementor export format

1. Create widget manually in Elementor
2. Export page as JSON
3. Copy the exact settings structure
4. Use in your widget factory

---

## 📖 Best Practices

### 1. Follow Naming Conventions

```typescript
// ✅ Good
createButtonWidget();
mapFigmaButtonToButton();

// ❌ Bad
makeButton();
convertButton();
```

### 2. Use Type Definitions

```typescript
// ✅ Good
export function createWidget(
	text: string,
	settings: Partial<WidgetSettings> = {},
	depth: number = 0
): WidgetBase {
	// ...
}

// ❌ Bad
export function createWidget(text, settings, depth) {
	// ...
}
```

### 3. Provide Default Values

```typescript
// ✅ Good
settings: {
  text: text || 'Default text',
  color: settings.color || '#000000',
  // ...
}

// ❌ Bad
settings: {
  text: text,  // Could be undefined
  color: settings.color,  // Could be undefined
}
```

### 4. Document Your Widget

```typescript
/**
 * Create a Button widget for Elementor
 *
 * @param text - Button text content
 * @param settings - Optional widget settings override
 * @param depth - Nesting depth (0 = root)
 * @returns WidgetBase - Complete Elementor widget structure
 *
 * @example
 * const button = createButtonWidget('Click me', {
 *   background_color: '#FF0000'
 * });
 */
export function createButtonWidget(/* ... */) {
	// ...
}
```

### 5. Handle Edge Cases

```typescript
// Check for required properties
if (!figmaNode.characters) {
	console.warn('Text node has no characters');
	return null;
}

// Provide fallbacks
const fontSize = figmaNode.style?.fontSize || 16;
const color = figmaNode.fills?.[0]?.color || { r: 0, g: 0, b: 0 };
```

## 🚀 Advanced: Widget with Children

For widgets that contain other elements (like icon-box):

```typescript
// src/ui/widgets/elementor/icon-box/iconBoxWidget.ts
import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { createIconWidget } from '@/widgets/elementor/icon';
import { createHeadingWidget } from '@/widgets/elementor/heading';

export function createIconBoxWidget(
	title: string,
	description: string,
	iconName: string = 'fa-star',
	depth: number = 0
) {
	const iconBox = {
		id: getUniqueId(),
		elType: 'widget',
		widgetType: 'icon-box',
		isInner: getIsInner(depth),
		settings: {
			title_text: title,
			description_text: description,
			selected_icon: {
				value: iconName,
				library: 'fa-solid',
			},
			position: 'top',
			title_size: 'default',
		},
		elements: [],
	};

	return iconBox;
}
```

---

## 📝 Summary

Adding a new widget requires:

1. **Choose widget type:** Elementor (standard) or ElementsKit (premium)
2. **Create 3 files** in appropriate folder:
   - `src/ui/widgets/elementor/{name}/` OR
   - `src/ui/widgets/elementskit/{name}/`
3. **Register** in correct registry (Elementor or ElementsKit)
4. **Test** in Figma plugin

That's it! Your widget is now part of the FigmaKit conversion system. 🎉

---

## 🔗 Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture overview

---

**Need help?** Check existing widgets in `src/ui/widgets/` for reference implementations.
