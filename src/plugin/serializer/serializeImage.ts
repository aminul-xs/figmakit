// src/figma/serializer/serializeImage.ts

import { serializeBase } from "./serializeBase";

export function serializeImageNode(node: RectangleNode) {
  return {
    ...serializeBase(node),

    image: {
      // Image fills (contains image hash and other data)
      fills: node.fills,
      fillStyleId: node.fillStyleId,

      // Strokes (images can have strokes too)
      strokes: node.strokes,
      strokeStyleId: node.strokeStyleId,
      strokeWeight: node.strokeWeight,
      strokeAlign: node.strokeAlign,

      // Corner properties
      cornerRadius: node.cornerRadius,
      cornerSmoothing: node.cornerSmoothing,
      topLeftRadius: node.topLeftRadius,
      topRightRadius: node.topRightRadius,
      bottomLeftRadius: node.bottomLeftRadius,
      bottomRightRadius: node.bottomRightRadius,
    },

    // Effects
    effects: node.effects,
    effectStyleId: node.effectStyleId,
  };
}
