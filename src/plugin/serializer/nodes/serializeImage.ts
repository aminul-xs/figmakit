// src/figma/serializer/serializeImage.ts

import {
  serializeBase,
  serializeFills,
  serializeStrokes,
  serializeEffects,
  serializeCornerRadius,
} from "../serializeBase";

export function serializeImageNode(node: RectangleNode) {
  return {
    ...serializeBase(node),

    image: {
      // Image fills (contains image hash and other data)
      ...serializeFills(node),

      // Strokes (images can have strokes too)
      ...serializeStrokes(node),

      // Corner properties
      ...serializeCornerRadius(node),
    },

    ...serializeEffects(node),
  };
}
