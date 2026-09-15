Prompt:
context: FigmaKit - Figma to WordPress ( Elementor) Converter.

1/ I want to create a full Elementor page, section, widgets, etc structure in the src/ui/widgets folder. This will allow me to easily manage and customize my Elementor pages by organizing all the necessary components in one place. I will start by creating a new folder called "widgets" within the "src" directory, and then I will add the necessary files for each widget I want to use on my Elementor pages. This structure will help me keep everything organized and make it easier to maintain and update my Elementor pages in the future.Here is an example of how I can structure the "widgets" folder:

src/
widgets/
widget1/
widget1.tsx
widget2/
widget2.tsx

```
heading.tsx (all control value define here) etc  widget specific settings (figma name: GROUP,FRAME,IMAGE,RECTANGLE, TEXT) . follow wedgtes type [json](./note.md)

 export const HeadingWidget = {
	id: getUniqueId(),
	elType: 'widget',
	widgetType: 'heading',
	isInner: getIsInner(),
	settings: {},
 }

```

2/ all widgets init or regidter in one file like index.tsx and export to use in other place like main file or page file.

3/ In this example, I have created a "widgets" folder within the "src" directory, and inside it, I have created two folders for different widgets (widget1 and widget2). Each widget folder contains a TypeScript file (widget1.tsx and widget2.tsx) where I can define the structure and functionality of each widget. not utils folder difine control value in widget file itself. only ultils folder define common function like getUniqueId() and getIsInner() which can be used across all widgets.

4/ widgets config related all here src/ui/config/widgets.ts
5/ Type define here src/types/\*.ts

Example: Elementor [json](./note.md)

✅ FigmaKit Prompt (Figma → Elementor JSON Converter System)
Context

You are building FigmaKit, a Figma → WordPress Elementor Converter.
The goal is to convert Figma nodes (FRAME, GROUP, TEXT, IMAGE, RECTANGLE) into valid Elementor Export JSON [structure](../dev-docs/convert-example.json) like:

Containers (elType: container)

Widgets (elType: widget)

Nested Elements (elements: [])

Full page export (content, page_settings, version)

✅ Task

Create a complete scalable widget-based architecture inside this structure:

src/
├── ui/
│ ├── widgets/
│ │
│ │ ├── heading/
│ │ │ ├── headingWidget.ts ✅ Widget JSON structure
│ │ │ ├── headingControls.ts ✅ Widget settings + controls
│ │ │ └── index.ts ✅ Export widget
│ │
│ │ ├── image/
│ │ │ ├── imageWidget.ts
│ │ │ ├── imageControls.ts
│ │ │ └── index.ts
│ │
│ │ ├── container/
│ │ │ ├── containerWidget.ts
│ │ │ ├── containerControls.ts
│ │ │ └── index.ts
│ │
│ │ └── index.ts ✅ Global widget registry
│ │
│ ├── config/
│ │ └── widgetsConfig.ts ✅ Mapping config / Figma → Elementor mapping
│ │
│ ├── builder/
│ │ ├── widgetFactory.ts ✅ Create widget JSON from node
│ │ ├── elementorBuilder.ts ✅ Recursive conversion engine
│ │ └── pageBuilder.ts ✅ Full Elementor page export
│ │
│ └── utils/
│ ├── getUniqueId.ts ✅ getIsInner()
│ └── getIsInner.ts ✅ getIsInner()
│
└── types/
├── figma.ts ✅ Figma node types (if needed)
├── elementor.ts ✅ Elementor JSON element types
└── widget.ts ✅ Widget base types (if needed)

✅ Widget Rules
Each widget must define its own settings inside the widget folder:

Example:

export function HeadingWidget(text: string) {
return {
id: getUniqueId(),
elType: "widget",
widgetType: "heading",
settings: {
title: text
},
elements: []
};
}

No widget settings should be placed in utils.

✅ Registry Requirement

All widgets must be registered in:

src/ui/widgets/index.ts

Example:

export const WidgetsRegistry = {
heading: HeadingWidget,
image: ImageWidget,
container: ContainerWidget,
};

✅ Mapping Requirement

Create mapping config:

src/ui/config/widgetsConfig.ts

Example:

export const NodeToElementorMap = {
TEXT: "heading",
IMAGE: "image",
FRAME: "container",
GROUP: "container",
};

✅ Builder Requirement

Create recursive converter:

FRAME/GROUP → Container

TEXT → Heading widget

IMAGE → Image widget

Example output must match Elementor JSON:

{
"elType": "container",
"elements": [
{
"elType": "widget",
"widgetType": "heading"
}
]
}

✅ Final Output Required

Generate full working example including:

Heading widget

Image widget

Container widget

Widget registry

Factory + builder

Example Figma node input

Final Elementor JSON output, like: [JSON](./note.md)

The JSON must follow Elementor export format exactly.
