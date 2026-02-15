import {
  serializeBase,
  serializeFills,
  serializeStrokes,
  serializeEffects,
} from "../serializeBase";

export function serializeEllipseNode(node: EllipseNode) {
  return {
    ...serializeBase(node),
    ellipse: {
      arcData: node.arcData,
    },
    ...serializeFills(node),
    ...serializeStrokes(node),
    ...serializeEffects(node),
  };
}
