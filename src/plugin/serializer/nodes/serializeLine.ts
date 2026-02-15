import {
  serializeBase,
  serializeStrokes,
  serializeEffects,
} from "../serializeBase";

export function serializeLineNode(node: LineNode) {
  return {
    ...serializeBase(node),
    line: {},
    ...serializeStrokes(node),
    strokeCap: node.strokeCap,
    ...serializeEffects(node),
  };
}
