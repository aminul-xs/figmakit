// src/figma/serializer/serializeComponent.ts

import { serializeBase } from "./serializeBase";
import { serializeChildren } from "./serializeChildren";

export function serializeComponentNode(node: ComponentNode) {
  return {
    ...serializeBase(node),

    component: {
      key: node.key,
      description: node.description,
      remote: node.remote,
      
      // Layout properties (components can be auto-layout)
      layoutMode: 'layoutMode' in node ? node.layoutMode : undefined,
      primaryAxisSizingMode: 'primaryAxisSizingMode' in node ? node.primaryAxisSizingMode : undefined,
      counterAxisSizingMode: 'counterAxisSizingMode' in node ? node.counterAxisSizingMode : undefined,
      primaryAxisAlignItems: 'primaryAxisAlignItems' in node ? node.primaryAxisAlignItems : undefined,
      counterAxisAlignItems: 'counterAxisAlignItems' in node ? node.counterAxisAlignItems : undefined,
      paddingLeft: 'paddingLeft' in node ? node.paddingLeft : undefined,
      paddingRight: 'paddingRight' in node ? node.paddingRight : undefined,
      paddingTop: 'paddingTop' in node ? node.paddingTop : undefined,
      paddingBottom: 'paddingBottom' in node ? node.paddingBottom : undefined,
      itemSpacing: 'itemSpacing' in node ? node.itemSpacing : undefined,
      
      clipsContent: 'clipsContent' in node ? node.clipsContent : undefined,
    },

    // Fills & Strokes
    fills: 'fills' in node ? node.fills : undefined,
    fillStyleId: 'fillStyleId' in node ? node.fillStyleId : undefined,
    strokes: 'strokes' in node ? node.strokes : undefined,
    strokeStyleId: 'strokeStyleId' in node ? node.strokeStyleId : undefined,
    strokeWeight: 'strokeWeight' in node ? node.strokeWeight : undefined,

    // Effects
    effects: 'effects' in node ? node.effects : undefined,
    effectStyleId: 'effectStyleId' in node ? node.effectStyleId : undefined,

    children: serializeChildren(node),
  };
}
