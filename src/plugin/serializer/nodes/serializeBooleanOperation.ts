import {
  serializeBase,
  serializeFills,
  serializeEffects,
} from "../serializeBase";
import { serializeChildren } from "../serializeChildren";

export function serializeBooleanOperationNode(node: BooleanOperationNode) {
  return {
    ...serializeBase(node),

    booleanOperation: {
      booleanOperation: node.booleanOperation,
    },

    ...serializeFills(node),
    strokes: node.strokes,
    ...serializeEffects(node),

    children: serializeChildren(node),
  };
}
