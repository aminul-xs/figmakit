import { serializeBase } from "../serializeBase";
import { serializeChildren } from "../serializeChildren";

export function serializeComponentSetNode(node: ComponentSetNode) {
  return {
    ...serializeBase(node),

    componentSet: {
      key: node.key,
      description: node.description,
    },

    children: serializeChildren(node),
  };
}
