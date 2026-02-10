# FigmaKit Widget Architecture

Complete scalable widget-based architecture for converting Figma designs to WordPress Elementor.

## 📁 Structure

```
src/
├── ui/
│   ├── widgets/              # Widget definitions
│   │   ├── heading/          # Heading widget
│   │   │   ├── headingWidget.ts
│   │   │   ├── headingControls.ts
│   │   │   └── index.ts
│   │   ├── image/            # Image widget
│   │   │   ├── imageWidget.ts
│   │   │   ├── imageControls.ts
│   │   │   └── index.ts
│   │   ├── container/        # Container widget
│   │   │   ├── containerWidget.ts
│   │   │   ├── containerControls.ts
│   │   │   └── index.ts
│   │   └── index.ts          # Widget registry
│   │
│   ├── config/               # Configuration
│   │   ├── widgetsConfig.ts  # Figma → Elementor mapping
│   │   └── example.ts        # Working example
│   │
│   ├── builder/              # Conversion engines
│   │   ├── widgetFactory.ts  # Widget creation
│   │   ├── elementorBuilder.ts # Recursive converter
│   │   └── pageBuilder.ts    # Page export
│   │
│   ├── utils/                # Utilities
│   │   ├── getUniqueId.ts
│   │   └── getIsInner.ts
│   │
│   └── index.ts              # Main export
│
└── types/
    ├── widget.ts             # Widget types
    └── elementor.ts          # Elementor types
```

## 🚀 Usage

### Basic Conversion

```typescript
import { buildAndExportElementorPage } from './ui/builder/pageBuilder';
import { FigmaNode } from './types/elementor';

const figmaNode: FigmaNode = {
	id: 'frame-1',
	type: 'FRAME',
	name: 'My Page',
	children: [
		{
			id: 'text-1',
			type: 'TEXT',
			characters: 'Hello World',
			style: {
				fontSize: 32,
				fontFamily: 'Inter',
			},
		},
	],
};

// Convert and export
const elementorJSON = buildAndExportElementorPage(figmaNode, 'My Page');
console.log(elementorJSON);
```

### Create Individual Widgets

```typescript
import { createHeadingWidget } from './ui/widgets/heading';
import { createImageWidget } from './ui/widgets/image';
import { createContainerWidget } from './ui/widgets/container';

// Create heading
const heading = createHeadingWidget('My Heading', {
	typography_font_size: { unit: 'px', size: 48, sizes: [] },
	title_color: '#FF0000',
});

// Create image
const image = createImageWidget('https://example.com/image.jpg', {
	width: { unit: 'px', size: 800, sizes: [] },
	height: { unit: 'px', size: 600, sizes: [] },
});

// Create container
const container = createContainerWidget({
	flex_direction: 'row',
	flex_gap: { size: 20, column: '20', row: '20', unit: 'px', isLinked: true },
});

// Add children to container
container.elements.push(heading, image);
```

### Advanced Usage - Custom Mapping

```typescript
import { convertFigmaToElementor } from './ui/builder/elementorBuilder';
import { ElementorPage } from './types/elementor';

// Convert single node
const element = convertFigmaToElementor(figmaNode);

// Build custom page
const page: ElementorPage = {
	content: element ? [element] : [],
	page_settings: [],
	version: '3.16.0',
	title: 'Custom Page',
	type: 'page',
};
```

## 📦 Widget Types

### Heading Widget

- **Figma**: TEXT nodes
- **Elementor**: heading widget
- **Settings**: Typography, color, alignment

### Image Widget

- **Figma**: IMAGE nodes, RECTANGLE with image fills
- **Elementor**: image widget
- **Settings**: Dimensions, object-fit, border-radius

### Container Widget

- **Figma**: FRAME, GROUP nodes
- **Elementor**: container element
- **Settings**: Flexbox, padding, background, gap

## 🔧 Configuration

### Figma → Elementor Mapping

```typescript
// src/ui/config/widgetsConfig.ts
export const NodeToElementorMap = {
	TEXT: 'heading',
	IMAGE: 'image',
	FRAME: 'container',
	GROUP: 'container',
	RECTANGLE: 'container',
};
```

### Widget Registry

```typescript
// src/ui/widgets/index.ts
export const WidgetsRegistry = {
	heading: createHeadingWidget,
	image: createImageWidget,
	container: createContainerWidget,
};
```

## 📝 Example Output

The system generates valid Elementor export JSON:

```json
{
	"content": [
		{
			"id": "abc123",
			"elType": "container",
			"settings": {
				"flex_direction": "column",
				"padding": {
					"unit": "px",
					"top": "20",
					"right": "20",
					"bottom": "20",
					"left": "20",
					"isLinked": false
				}
			},
			"elements": [
				{
					"id": "def456",
					"elType": "widget",
					"widgetType": "heading",
					"settings": {
						"title": "Hello World",
						"typography_font_size": {
							"unit": "px",
							"size": 32,
							"sizes": []
						}
					},
					"elements": []
				}
			]
		}
	],
	"page_settings": [],
	"version": "3.16.0",
	"title": "My Page",
	"type": "page"
}
```

## 🎯 Features

✅ **Widget-Based Architecture** - Modular and maintainable  
✅ **Recursive Conversion** - Handles nested structures  
✅ **Smart Mapping** - Automatic Figma → Elementor translation  
✅ **Type-Safe** - Full TypeScript support  
✅ **Extensible** - Easy to add new widgets  
✅ **Production Ready** - Generates valid Elementor JSON

## 🧪 Testing

Run the example:

```bash
npm run dev
# or
ts-node src/ui/config/example.ts
```

## 🔄 Adding New Widgets

1. Create widget folder: `src/ui/widgets/mywidget/`
2. Create files:
    - `myWidgetWidget.ts` - Widget structure
    - `myWidgetControls.ts` - Settings & mapping
    - `index.ts` - Exports
3. Register in `src/ui/widgets/index.ts`
4. Add mapping in `src/ui/config/widgetsConfig.ts`

## 📚 API Reference

### Core Functions

- `buildAndExportElementorPage(node, title)` - Complete conversion
- `convertFigmaToElementor(node, depth)` - Recursive conversion
- `createWidgetFromFigmaNode(node, depth)` - Widget creation
- `getWidgetTypeFromFigmaNode(type)` - Type mapping

### Utilities

- `getUniqueId()` - Generate unique element IDs
- `getIsInner(depth)` - Determine if element is nested
