import { serializeBase } from "../serializeBase";
import { serializeChildren } from "../serializeChildren";

export function serializeInstanceNode(node: InstanceNode) {
  const mainComp = node.mainComponent;

  return {
    ...serializeBase(node),

    instance: {
      mainComponent: mainComp
        ? {
            id: mainComp.id,
            key: mainComp.key,
            name: mainComp.name,
          }
        : null,
      scaleFactor: node.scaleFactor,
    },

    layoutMode: "layoutMode" in node ? node.layoutMode : undefined,
    fills: "fills" in node ? node.fills : undefined,
    strokes: "strokes" in node ? node.strokes : undefined,
    effects: "effects" in node ? node.effects : undefined,

    children: serializeChildren(node),
  };
}
