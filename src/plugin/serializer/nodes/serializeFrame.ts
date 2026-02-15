// src/figma/serializer/serializeFrame.ts

import {
  serializeBase,
  serializeFills,
  serializeStrokes,
  serializeExtendedStrokes,
  serializeEffects,
  serializeCornerRadius,
} from "../serializeBase";
import { serializeChildren } from "../serializeChildren";

export function serializeFrameNode(node: FrameNode) {
  return {
    ...serializeBase(node),

    frame: {
      // Auto layout properties
      layoutMode: node.layoutMode,
      primaryAxisSizingMode: node.primaryAxisSizingMode,
      counterAxisSizingMode: node.counterAxisSizingMode,
      primaryAxisAlignItems: node.primaryAxisAlignItems,
      counterAxisAlignItems: node.counterAxisAlignItems,

      // Padding
      paddingLeft: node.paddingLeft,
      paddingRight: node.paddingRight,
      paddingTop: node.paddingTop,
      paddingBottom: node.paddingBottom,

      // Spacing
      itemSpacing: node.itemSpacing,
      counterAxisSpacing: node.counterAxisSpacing,

      // Clipping & background
      clipsContent: node.clipsContent,
      layoutGrids: node.layoutGrids,
      gridStyleId: node.gridStyleId,

      // Corner properties
      ...serializeCornerRadius(node),
    },

    ...serializeFills(node),
    ...serializeStrokes(node),
    ...serializeExtendedStrokes(node),
    ...serializeEffects(node),

    children: serializeChildren(node),
  };
}
