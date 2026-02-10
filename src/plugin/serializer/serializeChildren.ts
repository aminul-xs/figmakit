// src/figma/serializer/serializeChildren.ts

import { serializeNode } from "./index";

export function serializeChildren(node: SceneNode) {
  if ("children" in node) {
    // Recursively serialize each child with full properties
    return node.children.map((child) =>
      serializeNode(child as SceneNode)
    );
  }

  return [];
}
