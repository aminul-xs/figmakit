// src/figma/serializer/serializeText.ts

import { serializeBase } from "./serializeBase";

export function serializeTextNode(node: TextNode) {
  return {
    ...serializeBase(node),

    text: {
      characters: node.characters,

      // Font properties
      fontSize: node.fontSize,
      fontName: node.fontName,
      fontWeight: node.fontWeight,

      // Spacing
      lineHeight: node.lineHeight,
      letterSpacing: node.letterSpacing,
      paragraphIndent: node.paragraphIndent,
      paragraphSpacing: node.paragraphSpacing,

      // Alignment
      textAlignHorizontal: node.textAlignHorizontal,
      textAlignVertical: node.textAlignVertical,

      // Text styling
      textCase: node.textCase,
      textDecoration: node.textDecoration,
      textAutoResize: node.textAutoResize,

      // Text styles
      textStyleId: node.textStyleId,
      fills: node.fills,
      fillStyleId: node.fillStyleId,
      strokes: node.strokes,
      strokeStyleId: node.strokeStyleId,
      strokeWeight: node.strokeWeight,
      strokeAlign: node.strokeAlign,

      // Advanced text properties
      hyperlink: node.hyperlink,
      hasMissingFont: node.hasMissingFont,
    },

    // Effects
    effects: node.effects,
    effectStyleId: node.effectStyleId,
  };
}
