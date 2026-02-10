// src/figma/serializer/serializeRectangle.ts

import { serializeBase } from "./serializeBase";

export function serializeRectangleNode(node: RectangleNode) {
  return {
    ...serializeBase(node),

    rectangle: {
      // Corner properties
      cornerRadius: node.cornerRadius,
      cornerSmoothing: node.cornerSmoothing,
      topLeftRadius: node.topLeftRadius,
      topRightRadius: node.topRightRadius,
      bottomLeftRadius: node.bottomLeftRadius,
      bottomRightRadius: node.bottomRightRadius,
    },

    // Fills & Strokes
    fills: node.fills,
    fillStyleId: node.fillStyleId,
    strokes: node.strokes,
    strokeStyleId: node.strokeStyleId,
    strokeWeight: node.strokeWeight,
    strokeAlign: node.strokeAlign,
    strokeCap: node.strokeCap,
    strokeJoin: node.strokeJoin,
    strokeMiterLimit: node.strokeMiterLimit,
    dashPattern: node.dashPattern,

    // Effects
    effects: node.effects,
    effectStyleId: node.effectStyleId,
  };
}
