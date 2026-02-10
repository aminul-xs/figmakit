/**
 * Page Builder
 * Builds complete Elementor page export JSON
 */

import { ElementorPage, FigmaNode } from '@/types/elementor';
import { WidgetBase } from '@/types/widget';
import {
	convertFigmaFrameToContainer,
	convertMultipleFigmaNodes,
} from './elementorBuilder';
import { defaultPageSettings, ElementorConfig } from '@/config/widgetsConfig';

/**
 * Build a complete Elementor page from Figma nodes
 */
export function buildElementorPage(
	figmaNodes: FigmaNode | FigmaNode[],
	pageTitle: string = 'FigmaKit Page'
): ElementorPage {
	let content: WidgetBase[] = [];

	// Handle single node or array of nodes
	if (Array.isArray(figmaNodes)) {
		content = convertMultipleFigmaNodes(figmaNodes);
	} else {
		const rootContainer = convertFigmaFrameToContainer(figmaNodes);
		if (rootContainer) {
			content = [rootContainer];
		}
	}

	return {
		content,
		page_settings: { ...defaultPageSettings },
		version: ElementorConfig.version,
		title: pageTitle,
		type: 'page',
	};
}

/**
 * Build Elementor page with custom settings
 */
export function buildElementorPageWithSettings(
	figmaNodes: FigmaNode | FigmaNode[],
	pageTitle: string = 'FigmaKit Page',
	customSettings: Record<string, any> = {}
): ElementorPage {
	const page = buildElementorPage(figmaNodes, pageTitle);

	// Merge custom page settings
	page.page_settings = {
		...defaultPageSettings,
		...customSettings,
	};

	return page;
}

/**
 * Convert Elementor page to JSON string
 */
export function exportElementorPageAsJSON(
	page: ElementorPage,
	pretty: boolean = true
): string {
	return JSON.stringify(page, null, pretty ? 2 : 0);
}

/**
 * Build and export Elementor page as JSON in one step
 */
export function buildAndExportElementorPage(
	figmaNodes: FigmaNode | FigmaNode[],
	pageTitle: string = 'FigmaKit Page',
	pretty: boolean = true
): string {
	const page = buildElementorPage(figmaNodes, pageTitle);
	return exportElementorPageAsJSON(page, pretty);
}
