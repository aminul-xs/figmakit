import type { FigmaNode } from '@/core/figma';
import type { ElementorElement, ElementorPage } from './types';
import { defaultPageSettings, elementorConfig } from './config';
import { convertMultipleFigmaNodes } from './converter';
import { createContainerWidget } from './widgets';

export function buildElementorPage(
	figmaNodes: FigmaNode | FigmaNode[],
	pageTitle = 'FigmaKit Page'
): ElementorPage {
	const converted = convertMultipleFigmaNodes(
		Array.isArray(figmaNodes) ? figmaNodes : [figmaNodes]
	);
	let content: ElementorElement[] = converted;
	if (converted.some(({ elType }) => elType === 'widget')) {
		const root = createContainerWidget({ content_width: 'full' });
		root.elements = converted;
		content = [root];
	}
	return {
		content,
		page_settings: { ...defaultPageSettings },
		version: elementorConfig.version,
		title: pageTitle,
		type: 'page',
	};
}

export function buildElementorPageWithSettings(
	figmaNodes: FigmaNode | FigmaNode[],
	pageTitle = 'FigmaKit Page',
	customSettings: Record<string, unknown> = {}
): ElementorPage {
	const page = buildElementorPage(figmaNodes, pageTitle);
	page.page_settings = { ...defaultPageSettings, ...customSettings };
	return page;
}

export function exportElementorPageAsJSON(
	page: ElementorPage,
	pretty = true
): string {
	return JSON.stringify(page, null, pretty ? 2 : 0);
}

export function buildAndExportElementorPage(
	figmaNodes: FigmaNode | FigmaNode[],
	pageTitle = 'FigmaKit Page',
	pretty = true
): string {
	return exportElementorPageAsJSON(
		buildElementorPage(figmaNodes, pageTitle),
		pretty
	);
}
