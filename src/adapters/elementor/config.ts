import type { ElementorWidgetType } from './widgets';

export const nodeToElementorMap: Record<string, ElementorWidgetType> = {
	TEXT: 'heading',
	IMAGE: 'image',
	FRAME: 'container',
	GROUP: 'container',
	RECTANGLE: 'container',
};

export function getWidgetTypeFromFigmaNode(
	figmaNodeType: string
): ElementorWidgetType | null {
	return nodeToElementorMap[figmaNodeType] ?? null;
}

export function shouldConvertNode(figmaNode: {
	type: string;
	fills?: Array<{ type: string }>;
}): boolean {
	if (figmaNode.type in nodeToElementorMap) return true;
	return Boolean(
		figmaNode.type === 'RECTANGLE' &&
		figmaNode.fills?.some((fill) => fill.type === 'IMAGE')
	);
}

export function isContainerNode(figmaNode: {
	type: string;
	children?: unknown[];
}): boolean {
	return (
		figmaNode.type === 'FRAME' ||
		figmaNode.type === 'GROUP' ||
		(figmaNode.type === 'RECTANGLE' && Boolean(figmaNode.children?.length))
	);
}

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

export const elementorConfig = {
	version: '0.4',
	schemaVersion: '0.4',
} as const;

export const WidgetPriority: Record<ElementorWidgetType, number> = {
	container: 1,
	heading: 2,
	image: 2,
	button: 2,
	textEditor: 2,
};
