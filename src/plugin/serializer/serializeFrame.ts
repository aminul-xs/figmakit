// src/figma/serializer/serializeFrame.ts

import { serializeBase } from "./serializeBase";
import { serializeChildren } from "./serializeChildren";

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
      cornerRadius: node.cornerRadius,
      cornerSmoothing: node.cornerSmoothing,
      topLeftRadius: node.topLeftRadius,
      topRightRadius: node.topRightRadius,
      bottomLeftRadius: node.bottomLeftRadius,
      bottomRightRadius: node.bottomRightRadius,
    },
	
    // Fills & Strokes
    fills: node.fills,
    fillStyleId: node.fillStyleId,
    strokes: node.strokes,
    strokeStyleId: node.strokeStyleId,
    strokeWeight: node.strokeWeight,
    strokeAlign: node.strokeAlign,
    strokeCap: node.strokeCap,
    strokeJoin: node.strokeJoin,
    strokeMiterLimit: node.strokeMiterLimit,
    dashPattern: node.dashPattern,

    // Effects
    effects: node.effects,
    effectStyleId: node.effectStyleId,

    children: serializeChildren(node),
  };
}
