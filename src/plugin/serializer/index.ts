import { serializeTextNode } from "./nodes/serializeText";
import { serializeFrameNode } from "./nodes/serializeFrame";
import { serializeGroupNode } from "./nodes/serializeGroup";
import { serializeEllipseNode } from "./nodes/serializeEllipse";
import { serializeLineNode } from "./nodes/serializeLine";
import { serializePolygonNode } from "./nodes/serializePolygon";
import { serializeVectorNode } from "./nodes/serializeVector";
import { serializeComponentNode } from "./nodes/serializeComponent";
import { serializeComponentSetNode } from "./nodes/serializeComponentSet";
import { serializeInstanceNode } from "./nodes/serializeInstance";
import { serializeBooleanOperationNode } from "./nodes/serializeBooleanOperation";
import { serializeRectangleNode } from "./nodes/serializeRectangle";
import { serializeUnknownNode } from "./nodes/serializeUnknown";

export function serializeNode(node: SceneNode): any {
  switch (node.type) {
    case "TEXT":
      return serializeTextNode(node);

    case "FRAME":
      return serializeFrameNode(node);

    case "GROUP":
      return serializeGroupNode(node);

    case "RECTANGLE":
      return serializeRectangleNode(node);

    case "ELLIPSE":
      return serializeEllipseNode(node);

    case "LINE":
      return serializeLineNode(node);

    case "POLYGON":
    case "STAR":
      return serializePolygonNode(node);

    case "VECTOR":
      return serializeVectorNode(node);

    case "COMPONENT":
      return serializeComponentNode(node);

    case "COMPONENT_SET":
      return serializeComponentSetNode(node);

    case "INSTANCE":
      return serializeInstanceNode(node);

    case "BOOLEAN_OPERATION":
      return serializeBooleanOperationNode(node);

    default:
      return serializeUnknownNode(node);
  }
}
