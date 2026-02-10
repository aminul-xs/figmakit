/**
 * Global Widget Registry
 * Central registry for all widgets in FigmaKit (Elementor + ElementsKit)
 */

import {
	createHeadingWidget,
	mapFigmaTextToHeading,
	createImageWidget,
	mapFigmaImageToImage,
	createContainerWidget,
	mapFigmaFrameToContainer,
} from './elementor';
import { ElementsKitWidgets } from './elementskit';

/**
 * Elementor Widget factory functions registry
 * Maps widget types to their creation functions
 */
export const ElementorWidgetsRegistry = {
	heading: createHeadingWidget,
	image: createImageWidget,
	container: createContainerWidget,
};

/**
 * Combined Widgets Registry (Elementor + ElementsKit)
 */
export const WidgetsRegistry = {
	...ElementorWidgetsRegistry,
	...ElementsKitWidgets,
};

/**
 * Figma to Elementor mapping functions
 * Maps Figma node data to widget settings
 */
export const FigmaMappers = {
	heading: mapFigmaTextToHeading,
	image: mapFigmaImageToImage,
	container: mapFigmaFrameToContainer,
};

/**
 * Available widget types
 */
export type WidgetType = keyof typeof WidgetsRegistry;

/**
 * Check if widget type is valid
 */
export function isValidWidgetType(type: string): type is WidgetType {
	return type in WidgetsRegistry;
}

/**
 * Get widget factory by type
 */
export function getWidgetFactory(type: WidgetType) {
	return WidgetsRegistry[type];
}

/**
 * Get Figma mapper by widget type
 */
export function getFigmaMapper(type: WidgetType) {
	return FigmaMappers[type];
}
