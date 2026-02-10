// src/figma/serializer/index.ts

import { serializeTextNode } from "./serializeText";
import { serializeFrameNode } from "./serializeFrame";
import { serializeRectangleNode } from "./serializeRectangle";
import { serializeVectorNode } from "./serializeVector";
import { serializeComponentNode } from "./serializeComponent";
import { serializeBase } from "./serializeBase";
import { serializeChildren } from "./serializeChildren";

export function serializeNode(node: SceneNode): any {
  switch (node.type) {
    case "TEXT":
      return serializeTextNode(node);

    case "FRAME":
      return serializeFrameNode(node);

    case "GROUP":
      // Groups are similar to frames but without some properties
      return {
        ...serializeBase(node),
        group: {
          clipsContent: 'clipsContent' in node ? node.clipsContent : undefined,
        },
        children: serializeChildren(node),
      };

    case "RECTANGLE":
      return serializeRectangleNode(node);

    case "ELLIPSE":
      // Ellipse is similar to rectangle
      return {
        ...serializeBase(node),
        ellipse: {
          arcData: (node as EllipseNode).arcData,
        },
        fills: (node as EllipseNode).fills,
        fillStyleId: (node as EllipseNode).fillStyleId,
        strokes: (node as EllipseNode).strokes,
        strokeStyleId: (node as EllipseNode).strokeStyleId,
        strokeWeight: (node as EllipseNode).strokeWeight,
        strokeAlign: (node as EllipseNode).strokeAlign,
        effects: (node as EllipseNode).effects,
        effectStyleId: (node as EllipseNode).effectStyleId,
      };

    case "LINE":
      return {
        ...serializeBase(node),
        line: {},
        strokes: (node as LineNode).strokes,
        strokeStyleId: (node as LineNode).strokeStyleId,
        strokeWeight: (node as LineNode).strokeWeight,
        strokeCap: (node as LineNode).strokeCap,
        effects: (node as LineNode).effects,
        effectStyleId: (node as LineNode).effectStyleId,
      };

    case "POLYGON":
    case "STAR":
      return {
        ...serializeBase(node),
        polygon: {
          pointCount: (node as PolygonNode).pointCount,
        },
        fills: (node as PolygonNode).fills,
        fillStyleId: (node as PolygonNode).fillStyleId,
        strokes: (node as PolygonNode).strokes,
        strokeStyleId: (node as PolygonNode).strokeStyleId,
        strokeWeight: (node as PolygonNode).strokeWeight,
        strokeAlign: (node as PolygonNode).strokeAlign,
        effects: (node as PolygonNode).effects,
        effectStyleId: (node as PolygonNode).effectStyleId,
      };

    case "VECTOR":
      return serializeVectorNode(node);

    case "COMPONENT":
      return serializeComponentNode(node);

    case "COMPONENT_SET":
      return {
        ...serializeBase(node),
        componentSet: {
          key: (node as ComponentSetNode).key,
          description: (node as ComponentSetNode).description,
        },
        children: serializeChildren(node),
      };

    case "INSTANCE":
      const instanceNode = node as InstanceNode;
      const mainComp = instanceNode.mainComponent;
      return {
        ...serializeBase(node),
        instance: {
          mainComponent: mainComp ? {
            id: mainComp.id,
            key: mainComp.key,
            name: mainComp.name,
          } : null,
          scaleFactor: instanceNode.scaleFactor,
        },
        // Instances can have auto-layout properties
        layoutMode: 'layoutMode' in node ? (node as any).layoutMode : undefined,
        fills: 'fills' in node ? (node as any).fills : undefined,
        strokes: 'strokes' in node ? (node as any).strokes : undefined,
        effects: 'effects' in node ? (node as any).effects : undefined,
        children: serializeChildren(node),
      };

    case "BOOLEAN_OPERATION":
      return {
        ...serializeBase(node),
        booleanOperation: {
          booleanOperation: (node as BooleanOperationNode).booleanOperation,
        },
        fills: (node as BooleanOperationNode).fills,
        strokes: (node as BooleanOperationNode).strokes,
        effects: (node as BooleanOperationNode).effects,
        children: serializeChildren(node),
      };

    default:
      return {
        ...serializeBase(node),
        children: serializeChildren(node),
      };
  }
}
