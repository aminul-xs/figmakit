/**
 * Widget Configuration and Mapping
 * Maps Figma node types to Elementor widget types
 */

import { WidgetType } from '@/widgets';

/**
 * Map Figma node types to Elementor widget types
 */
export const NodeToElementorMap: Record<string, WidgetType> = {
	TEXT: 'heading',
	IMAGE: 'image',
	FRAME: 'container',
	GROUP: 'container',
	RECTANGLE: 'container',
};

/**
 * Get Elementor widget type from Figma node type
 */
export function getWidgetTypeFromFigmaNode(
	figmaNodeType: string
): WidgetType | null {
	return NodeToElementorMap[figmaNodeType] || null;
}

/**
 * Check if Figma node should be converted to a widget
 */
export function shouldConvertNode(figmaNode: any): boolean {
	// Convert if node type is mapped
	if (figmaNode.type in NodeToElementorMap) {
		return true;
	}

	// Convert RECTANGLE with image fills to image widget
	if (figmaNode.type === 'RECTANGLE' && figmaNode.fills) {
		const hasImageFill = figmaNode.fills.some(
			(fill: any) => fill.type === 'IMAGE'
		);
		if (hasImageFill) {
			return true;
		}
	}

	return false;
}

/**
 * Determine if node should be a container
 */
export function isContainerNode(figmaNode: any): boolean {
	return (
		figmaNode.type === 'FRAME' ||
		figmaNode.type === 'GROUP' ||
		(figmaNode.type === 'RECTANGLE' &&
			figmaNode.children &&
			figmaNode.children.length > 0)
	);
}

/**
 * Widget conversion priority
 * Higher number = higher priority
 */
export const WidgetPriority: Record<WidgetType, number> = {
	container: 1,
	heading: 2,
	image: 2,
};

/**
 * Default Elementor page settings
 */
export const defaultPageSettings = {
	margin: {
		unit: 'px',
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
		isLinked: false,
	},
	padding: {
		unit: 'px',
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
		isLinked: false,
	},
	background_background: 'classic',
	background_color: '#FFFFFF',
};

/**
 * Elementor version configuration
 */
export const ElementorConfig = {
	version: '0.4',
	schema_version: '0.4',
};
