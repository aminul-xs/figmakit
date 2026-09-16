import type { FigmaNode } from '@/core/figma';
import { createContainerWidget, mapFigmaFrameToContainer } from './container';
import { createHeadingWidget, mapFigmaTextToHeading } from './heading';
import { createImageWidget, mapFigmaImageToImage } from './image';
import { createButtonWidget, mapFigmaButton } from './button';
import { createTextEditorWidget, mapFigmaTextToTextEditor } from './textEditor';

export * from './container';
export * from './heading';
export * from './image';
export * from './button';
export * from './textEditor';

export const elementorWidgets = {
	container: createContainerWidget,
	heading: createHeadingWidget,
	image: createImageWidget,
	button: createButtonWidget,
	textEditor: createTextEditorWidget,
};

export type ElementorWidgetType = keyof typeof elementorWidgets;

export const figmaMappers: Record<
	ElementorWidgetType,
	(node: FigmaNode) => Record<string, unknown>
> = {
	container: mapFigmaFrameToContainer,
	heading: mapFigmaTextToHeading,
	image: mapFigmaImageToImage,
	button: mapFigmaButton,
	textEditor: mapFigmaTextToTextEditor,
};
