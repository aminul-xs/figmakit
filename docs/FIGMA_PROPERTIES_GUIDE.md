# Figma Properties Serialization Guide

This guide explains all the Figma node properties that are being captured by the serializer and how to access them.

## Overview

The serializer in `src/plugin/serializer/` captures comprehensive data from Figma nodes, including:

- Base properties (id, name, type, visibility, position)
- Layout properties (auto-layout, constraints, alignment)
- Style properties (fills, strokes, effects)
- Node-specific properties (text, vectors, components, etc.)

## Base Properties (All Nodes)

Captured by `serializeBase()` in [serializeBase.ts](../src/plugin/serializer/serializeBase.ts):

### Core Identification
- `id` - Unique node identifier
- `name` - Node name
- `type` - Node type (TEXT, FRAME, RECTANGLE, etc.)

### Visibility & Interaction
- `visible` - Whether the node is visible
- `locked` - Whether the node is locked

### Blend & Appearance
- `opacity` - Opacity (0-1)
- `blendMode` - Blend mode (NORMAL, MULTIPLY, etc.)
- `isMask` - Whether node acts as a mask

### Position & Transform
- `x`, `y` - Position relative to parent
- `width`, `height` - Dimensions
- `rotation` - Rotation in degrees
- `absoluteTransform` - 2D transformation matrix
- `absoluteBoundingBox` - Absolute bounding box
- `relativeTransform` - Transform relative to parent

### Layout (Auto-layout children)
- `layoutAlign` - How node aligns in auto-layout parent
- `layoutGrow` - Whether node can grow in auto-layout
- `layoutPositioning` - Absolute or auto positioning
- `constraints` - Resizing constraints

### Export & Plugin Data
- `exportSettings` - Export settings array
- `pluginData` - Custom plugin data (key-value pairs)

---

## Node Type-Specific Properties

### TEXT Nodes

Captured by `serializeTextNode()` in [serializeText.ts](../src/plugin/serializer/serializeText.ts):

#### Content
- `characters` - Text content

#### Font Properties
- `fontSize` - Font size (can be mixed)
- `fontName` - Font family and style
- `fontWeight` - Font weight (100-900)

#### Spacing
- `lineHeight` - Line height
- `letterSpacing` - Letter spacing
- `paragraphIndent` - Paragraph indentation
- `paragraphSpacing` - Space between paragraphs

#### Alignment
- `textAlignHorizontal` - LEFT, CENTER, RIGHT, JUSTIFIED
- `textAlignVertical` - TOP, CENTER, BOTTOM

#### Styling
- `textCase` - ORIGINAL, UPPER, LOWER, TITLE
- `textDecoration` - NONE, UNDERLINE, STRIKETHROUGH
- `textAutoResize` - WIDTH_AND_HEIGHT, HEIGHT, NONE

#### Styles & References
- `textStyleId` - Reference to text style
- `fills` - Text fill paints
- `fillStyleId` - Reference to fill style
- `strokes` - Text stroke paints
- `strokeStyleId` - Reference to stroke style
- `strokeWeight` - Stroke thickness
- `strokeAlign` - CENTER, INSIDE, OUTSIDE

#### Advanced
- `hyperlink` - Link data if text is a hyperlink
- `hasMissingFont` - Whether font is missing
- `effects` - Array of effects (shadows, blurs)
- `effectStyleId` - Reference to effect style

---

### FRAME Nodes

Captured by `serializeFrameNode()` in [serializeFrame.ts](../src/plugin/serializer/serializeFrame.ts):

#### Auto Layout
- `layoutMode` - NONE, HORIZONTAL, VERTICAL
- `primaryAxisSizingMode` - FIXED, AUTO
- `counterAxisSizingMode` - FIXED, AUTO
- `primaryAxisAlignItems` - MIN, CENTER, MAX, SPACE_BETWEEN
- `counterAxisAlignItems` - MIN, CENTER, MAX, BASELINE

#### Padding & Spacing
- `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom` - Individual padding values
- `itemSpacing` - Space between items
- `counterAxisSpacing` - Space between wrapped rows/columns

#### Frame Properties
- `clipsContent` - Whether content is clipped
- `layoutGrids` - Grid layout definitions
- `gridStyleId` - Reference to grid style

#### Corner Properties
- `cornerRadius` - Uniform corner radius
- `cornerSmoothing` - iOS-style corner smoothing (0-1)
- `topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius` - Individual corner radii

#### Fills, Strokes & Effects
- `fills` - Array of fill paints
- `fillStyleId` - Reference to fill style
- `strokes` - Array of stroke paints
- `strokeStyleId` - Reference to stroke style
- `strokeWeight` - Stroke thickness
- `strokeAlign` - CENTER, INSIDE, OUTSIDE
- `strokeCap` - NONE, ROUND, SQUARE, LINE_ARROW, TRIANGLE_ARROW
- `strokeJoin` - MITER, BEVEL, ROUND
- `strokeMiterLimit` - Miter limit for MITER join
- `dashPattern` - Dash pattern array [dash, gap, ...]
- `effects` - Array of effects
- `effectStyleId` - Reference to effect style

#### Children
- `children` - Array of child nodes

---

### RECTANGLE Nodes

Captured by `serializeRectangleNode()` in [serializeRectangle.ts](../src/plugin/serializer/serializeRectangle.ts):

#### Corner Properties
- `cornerRadius` - Uniform corner radius
- `cornerSmoothing` - Corner smoothing
- `topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius` - Individual corners

#### Fills, Strokes & Effects
- Same as FRAME nodes (fills, strokes, effects, etc.)

---

### VECTOR Nodes

Captured by `serializeVectorNode()` in [serializeVector.ts](../src/plugin/serializer/serializeVector.ts):

#### Vector-Specific
- `vectorPaths` - Array of vector path definitions
- `vectorNetwork` - Vector network (nodes, segments, regions)
- `handleMirroring` - Handle mirroring angle constraints

#### Geometry
- `cornerRadius` - Corner radius for vector points
- `cornerSmoothing` - Corner smoothing

#### Fills, Strokes & Effects
- Same comprehensive fill, stroke, and effect properties

---

### ELLIPSE Nodes

Captured in [index.ts](../src/plugin/serializer/index.ts):

#### Ellipse-Specific
- `arcData` - Arc sweep (start angle, end angle, inner radius)

#### Fills, Strokes & Effects
- Standard fill, stroke, and effect properties

---

### LINE Nodes

Captured in [index.ts](../src/plugin/serializer/index.ts):

#### Line-Specific
- `strokes` - Line stroke paints
- `strokeWeight` - Line thickness
- `strokeCap` - Line cap style
- `effects` - Line effects

---

### POLYGON / STAR Nodes

Captured in [index.ts](../src/plugin/serializer/index.ts):

#### Polygon-Specific
- `pointCount` - Number of points

#### Fills, Strokes & Effects
- Standard geometry properties

---

### COMPONENT Nodes

Captured by `serializeComponentNode()` in [serializeComponent.ts](../src/plugin/serializer/serializeComponent.ts):

#### Component-Specific
- `key` - Unique component key
- `description` - Component description
- `remote` - Whether component is from library

#### Layout (if component uses auto-layout)
- All auto-layout properties (layoutMode, padding, spacing, etc.)
- `clipsContent` - Clipping behavior

#### Fills, Strokes & Effects
- Optional fill, stroke, and effect properties

#### Children
- `children` - Component content

---

### INSTANCE Nodes

Captured in [index.ts](../src/plugin/serializer/index.ts):

#### Instance-Specific
- `mainComponent` - Reference to main component
  - `id` - Component ID
  - `key` - Component key
  - `name` - Component name
- `scaleFactor` - Instance scale factor

#### Overrides
- `layoutMode` - Auto-layout overrides
- `fills`, `strokes`, `effects` - Style overrides

#### Children
- `children` - Instance content (with overrides)

---

### GROUP Nodes

Captured in [index.ts](../src/plugin/serializer/index.ts):

#### Group-Specific
- `clipsContent` - Whether group clips content

#### Children
- `children` - Grouped nodes

---

### COMPONENT_SET Nodes (Variants)

Captured in [index.ts](../src/plugin/serializer/index.ts):

#### Component Set-Specific
- `key` - Component set key
- `description` - Component set description

#### Children
- `children` - Component variants

---

### BOOLEAN_OPERATION Nodes

Captured in [index.ts](../src/plugin/serializer/index.ts):

#### Boolean-Specific
- `booleanOperation` - UNION, INTERSECT, SUBTRACT, EXCLUDE

#### Fills, Strokes & Effects
- Result fill, stroke, and effect properties

#### Children
- `children` - Boolean operation inputs

---

## Paint Types

When accessing `fills` or `strokes`, each paint object contains:

### SOLID Paint
```typescript
{
  type: "SOLID",
  color: { r: 0-1, g: 0-1, b: 0-1 },
  opacity: 0-1,
  visible: boolean
}
```

### GRADIENT_LINEAR / GRADIENT_RADIAL / GRADIENT_ANGULAR / GRADIENT_DIAMOND
```typescript
{
  type: "GRADIENT_LINEAR",
  gradientTransform: [[a, b, c], [d, e, f]],
  gradientStops: [
    { position: 0-1, color: { r, g, b, a } }
  ],
  opacity: 0-1,
  visible: boolean
}
```

### IMAGE
```typescript
{
  type: "IMAGE",
  scaleMode: "FILL" | "FIT" | "CROP" | "TILE",
  imageHash: string, // Hash to retrieve image
  imageTransform: [[a, b, c], [d, e, f]],
  scalingFactor: number,
  filters: { exposure, contrast, saturation, ... },
  opacity: 0-1,
  visible: boolean
}
```

---

## Effect Types

When accessing `effects`, each effect object contains:

### DROP_SHADOW / INNER_SHADOW
```typescript
{
  type: "DROP_SHADOW",
  color: { r, g, b, a },
  offset: { x, y },
  radius: number,
  spread: number,
  visible: boolean,
  blendMode: string
}
```

### LAYER_BLUR / BACKGROUND_BLUR
```typescript
{
  type: "LAYER_BLUR",
  radius: number,
  visible: boolean
}
```

---

## How to Use

### In the Plugin (code.ts)

The serializer is automatically used when you select nodes:

```typescript
import { serializeNode } from "./serializer";

const selection = figma.currentPage.selection;
const nodes = selection.map((node) => serializeNode(node));

// Send to UI
figma.ui.postMessage({
  type: 'figma-nodes-data',
  nodes: nodes,
});
```

### In the UI (React)

Access the serialized data in your React components:

```typescript
// Receive message from plugin
window.addEventListener('message', (event) => {
  const msg = event.data.pluginMessage;
  
  if (msg.type === 'figma-nodes-data') {
    const nodes = msg.nodes;
    
    // Access properties
    nodes.forEach(node => {
      console.log('Node:', node.name);
      console.log('Type:', node.type);
      console.log('Position:', node.x, node.y);
      console.log('Size:', node.width, node.height);
      
      // Type-specific properties
      if (node.type === 'TEXT') {
        console.log('Text:', node.text.characters);
        console.log('Font:', node.text.fontName);
        console.log('Font Size:', node.text.fontSize);
      }
      
      if (node.type === 'FRAME') {
        console.log('Layout Mode:', node.frame.layoutMode);
        console.log('Padding:', node.frame.paddingLeft);
        console.log('Item Spacing:', node.frame.itemSpacing);
      }
      
      // Style properties
      if (node.fills) {
        console.log('Fills:', node.fills);
      }
      if (node.strokes) {
        console.log('Strokes:', node.strokes);
      }
      if (node.effects) {
        console.log('Effects:', node.effects);
      }
    });
  }
});
```

---

## Reference Documentation

For complete Figma API documentation, see:
- [Node Properties](https://www.figma.com/plugin-docs/api/properties/nodes/)
- [Paint Properties](https://www.figma.com/plugin-docs/api/Paint/)
- [Effect Properties](https://www.figma.com/plugin-docs/api/Effect/)
- [Auto Layout](https://www.figma.com/plugin-docs/api/properties/nodes/auto-layout/)

---

## Common Use Cases

### Extract All Text Content
```typescript
function getAllText(node: any): string[] {
  const texts: string[] = [];
  
  if (node.type === 'TEXT') {
    texts.push(node.text.characters);
  }
  
  if (node.children) {
    node.children.forEach((child: any) => {
      texts.push(...getAllText(child));
    });
  }
  
  return texts;
}
```

### Get All Colors Used
```typescript
function getAllColors(node: any): string[] {
  const colors: Set<string> = new Set();
  
  if (node.fills) {
    node.fills.forEach((fill: any) => {
      if (fill.type === 'SOLID') {
        const hex = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
        colors.add(hex);
      }
    });
  }
  
  if (node.children) {
    node.children.forEach((child: any) => {
      getAllColors(child).forEach(c => colors.add(c));
    });
  }
  
  return Array.from(colors);
}
```

### Find All Auto-Layout Frames
```typescript
function findAutoLayoutFrames(node: any): any[] {
  const frames: any[] = [];
  
  if (node.type === 'FRAME' && node.frame.layoutMode !== 'NONE') {
    frames.push(node);
  }
  
  if (node.children) {
    node.children.forEach((child: any) => {
      frames.push(...findAutoLayoutFrames(child));
    });
  }
  
  return frames;
}
```

---

## Summary

The serializer now captures **comprehensive Figma properties** including:

✅ All base properties (position, size, opacity, blend modes)  
✅ All layout properties (auto-layout, constraints, alignment)  
✅ All style properties (fills, strokes, effects, style IDs)  
✅ All text properties (font, spacing, alignment, decoration)  
✅ All geometry properties (corners, vectors, paths)  
✅ All component properties (keys, descriptions, instances)  
✅ Plugin data and export settings  

You can now access **all available Figma data** from your serialized nodes!
