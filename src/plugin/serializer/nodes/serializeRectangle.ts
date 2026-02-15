// src/figma/serializer/serializeRectangle.ts

import {
  serializeBase,
  serializeFills,
  serializeStrokes,
  serializeExtendedStrokes,
  serializeEffects,
  serializeCornerRadius,
} from "../serializeBase";

export function serializeRectangleNode(node: RectangleNode) {
  return {
    ...serializeBase(node),

    rectangle: {
      ...serializeCornerRadius(node),
    },

    ...serializeFills(node),
    ...serializeStrokes(node),
    ...serializeExtendedStrokes(node),
    ...serializeEffects(node),
  };
}
