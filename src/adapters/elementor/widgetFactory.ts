import type { FigmaNode } from '@/core/figma';
import type { ElementorElement } from './types';
import {
	createContainerWidget,
	createHeadingWidget,
	createImageWidget,
	elementorWidgets,
	figmaMappers,
} from './widgets';
import { getWidgetTypeFromFigmaNode } from './config';

export function createWidgetFromFigmaNode(
	figmaNode: FigmaNode,
	depth = 0
): ElementorElement | null {
	const widgetType = getWidgetTypeFromFigmaNode(figmaNode.type);
	if (!widgetType || !(widgetType in elementorWidgets)) return null;

	const settings = figmaMappers[widgetType](figmaNode);

	switch (widgetType) {
		case 'heading':
			return createHeadingWidget(figmaNode.characters || 'Heading', settings, depth);
		case 'image':
			return createImageWidget(extractImageUrl(figmaNode), settings, depth);
		case 'container':
			return createContainerWidget(settings, depth);
		default:
			return null;
	}
}

export function hasImageFill(figmaNode: FigmaNode): boolean {
	return Boolean(figmaNode.fills?.some((fill) => fill.type === 'IMAGE'));
}

export function extractImageUrl(figmaNode: FigmaNode): string {
	const imageFill = figmaNode.fills?.find((fill) => fill.type === 'IMAGE');
	return imageFill?.imageRef ?? '';
}
