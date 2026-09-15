import type { FigmaNode } from '@/core/figma';
import type { ElementorElement } from './types';
import { isContainerNode, shouldConvertNode } from './config';
import {
	createWidgetFromFigmaNode,
	hasImageFill,
	isButtonNode,
} from './widgetFactory';

export function convertFigmaToElementor(
	figmaNode: FigmaNode,
	depth = 0
): ElementorElement | null {
	if (!shouldConvertNode(figmaNode)) return null;

	const sourceNode =
		figmaNode.type === 'RECTANGLE' && hasImageFill(figmaNode)
			? { ...figmaNode, type: 'IMAGE' }
			: figmaNode;
	const widget = createWidgetFromFigmaNode(sourceNode, depth);
	if (!widget) return null;

	if (
		isContainerNode(figmaNode) &&
		!isButtonNode(figmaNode) &&
		figmaNode.children?.length
	) {
		widget.elements = convertMultipleFigmaNodes(
			figmaNode.children,
			depth + 1
		);
	}
	return widget;
}

export function convertMultipleFigmaNodes(
	figmaNodes: FigmaNode[],
	depth = 0
): ElementorElement[] {
	return figmaNodes.flatMap((node) => {
		const element = convertFigmaToElementor(node, depth);
		return element ? [element] : [];
	});
}

export function convertFigmaFrameToContainer(
	figmaFrame: FigmaNode
): ElementorElement | null {
	if (figmaFrame.type !== 'FRAME' && figmaFrame.type !== 'GROUP') return null;
	return convertFigmaToElementor(figmaFrame);
}
