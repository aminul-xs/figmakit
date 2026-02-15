// src/figma/serializer/serializeText.ts

import {
  serializeBase,
  serializeFills,
  serializeStrokes,
  serializeEffects,
} from "../serializeBase";

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
      ...serializeFills(node),
      ...serializeStrokes(node),

      // Advanced text properties
      hyperlink: node.hyperlink,
      hasMissingFont: node.hasMissingFont,
    },

    ...serializeEffects(node),
  };
}
