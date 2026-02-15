import {
  serializeBase,
  serializeFills,
  serializeStrokes,
  serializeEffects,
} from "../serializeBase";

export function serializePolygonNode(node: PolygonNode | StarNode) {
  return {
    ...serializeBase(node),
    polygon: {
      pointCount: node.pointCount,
    },
    ...serializeFills(node),
    ...serializeStrokes(node),
    ...serializeEffects(node),
  };
}
