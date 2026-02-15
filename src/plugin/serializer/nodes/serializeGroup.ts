import { serializeBase } from "../serializeBase";
import { serializeChildren } from "../serializeChildren";

export function serializeGroupNode(node: GroupNode) {
  return {
    ...serializeBase(node),
    group: {
      clipsContent: "clipsContent" in node ? node.clipsContent : undefined,
    },
    children: serializeChildren(node),
  };
}
