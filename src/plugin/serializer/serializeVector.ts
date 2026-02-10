// src/figma/serializer/serializeVector.ts

import { serializeBase } from "./serializeBase";

export function serializeVectorNode(node: VectorNode) {
  return {
    ...serializeBase(node),

    vector: {
      // Vector specific properties
      vectorPaths: node.vectorPaths,
      vectorNetwork: node.vectorNetwork,
      handleMirroring: node.handleMirroring,

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

      // Corner properties
      cornerRadius: node.cornerRadius,
      cornerSmoothing: node.cornerSmoothing,
    },

    // Effects
    effects: node.effects,
    effectStyleId: node.effectStyleId,
  };
}
