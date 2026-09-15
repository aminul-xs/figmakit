import type { FigmaNode } from '@/core/figma';
import { createContainerWidget, mapFigmaFrameToContainer } from './container';
import { createHeadingWidget, mapFigmaTextToHeading } from './heading';
import { createImageWidget, mapFigmaImageToImage } from './image';

export * from './container';
export * from './heading';
export * from './image';

export const elementorWidgets = {
	container: createContainerWidget,
	heading: createHeadingWidget,
	image: createImageWidget,
};

export type ElementorWidgetType = keyof typeof elementorWidgets;

export const figmaMappers: Record<
	ElementorWidgetType,
	(node: FigmaNode) => Record<string, unknown>
> = {
	container: mapFigmaFrameToContainer,
	heading: mapFigmaTextToHeading,
	image: mapFigmaImageToImage,
};
