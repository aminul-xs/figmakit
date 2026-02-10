// src/figma/serializer/serializeBase.ts

export function serializeBase(node: SceneNode) {
  const base: any = {
    id: node.id,
    name: node.name,
    type: node.type,

    // Visibility & Locking
    visible: node.visible,
    locked: node.locked,
  };

  // Blend properties (not available on all node types)
  if ('opacity' in node) {
    base.opacity = node.opacity;
  }
  if ('blendMode' in node) {
    base.blendMode = node.blendMode;
  }
  if ('isMask' in node) {
    base.isMask = node.isMask;
  }

  // Position & Transform (not available on all node types)
  if ('x' in node) {
    base.x = node.x;
  }
  if ('y' in node) {
    base.y = node.y;
  }
  if ('rotation' in node) {
    base.rotation = node.rotation;
  }
  if ('width' in node) {
    base.width = node.width;
  }
  if ('height' in node) {
    base.height = node.height;
  }

  // Absolute position
  if ('absoluteTransform' in node) {
    base.absoluteTransform = node.absoluteTransform;
  }
  if ('absoluteBoundingBox' in node) {
    base.absoluteBoundingBox = node.absoluteBoundingBox;
  }
  if ('relativeTransform' in node) {
    base.relativeTransform = node.relativeTransform;
  }

  // Layout constraints
  if ('constraints' in node) {
    base.constraints = node.constraints;
  }

  // Layout properties (for auto-layout children)
  if ('layoutAlign' in node) {
    base.layoutAlign = node.layoutAlign;
  }
  if ('layoutGrow' in node) {
    base.layoutGrow = node.layoutGrow;
  }
  if ('layoutPositioning' in node) {
    base.layoutPositioning = node.layoutPositioning;
  }

  // Export settings
  if ('exportSettings' in node) {
    base.exportSettings = node.exportSettings;
  }

  // Plugin data
  try {
    const pluginDataKeys = node.getPluginDataKeys();
    if (pluginDataKeys.length > 0) {
      base.pluginData = pluginDataKeys.reduce((acc: any, key) => {
        acc[key] = node.getPluginData(key);
        return acc;
      }, {});
    }
  } catch (e) {
    // Plugin data not accessible
  }

  return base;
}
