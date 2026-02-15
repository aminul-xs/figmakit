// src/figma/serializer/serializeVector.ts

import {
  serializeBase,
  serializeFills,
  serializeStrokes,
  serializeExtendedStrokes,
  serializeEffects,
} from "../serializeBase";

export function serializeVectorNode(node: VectorNode) {
  return {
    ...serializeBase(node),

    vector: {
      // Vector specific properties
      vectorPaths: node.vectorPaths,
      vectorNetwork: node.vectorNetwork,
      handleMirroring: node.handleMirroring,

      // Fills & Strokes
      ...serializeFills(node),
      ...serializeStrokes(node),
      ...serializeExtendedStrokes(node),

      // Corner properties
      cornerRadius: node.cornerRadius,
      cornerSmoothing: node.cornerSmoothing,
    },

    ...serializeEffects(node),
  };
}
