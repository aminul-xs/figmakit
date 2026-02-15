import { serializeBase } from "../serializeBase";
import { serializeChildren } from "../serializeChildren";

export function serializeUnknownNode(node: SceneNode) {
  return {
    ...serializeBase(node),
    children: serializeChildren(node),
  };
}
