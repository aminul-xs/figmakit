import type { FigmaNode } from '@/core/figma';
import { nodeWidth } from './blockUtils';
import {
	createColumnBlock,
	createColumnsBlock,
	createImageBlock,
	createParagraphBlock,
} from './blocks';
import type { GutenbergBlock } from './types';

function isImage(node: FigmaNode): boolean {
	return (
		node.type === 'IMAGE' ||
		Boolean(node.fills?.some((fill) => fill.type === 'IMAGE'))
	);
}

function isHorizontal(node: FigmaNode): boolean {
	return (node.frame?.layoutMode ?? node.layoutMode) === 'HORIZONTAL';
}

export function convertFigmaNodeToGutenberg(node: FigmaNode): GutenbergBlock[] {
	if (node.visible === false) return [];
	if (node.type === 'TEXT') return [createParagraphBlock(node)];
	if (isImage(node)) return [createImageBlock(node)];

	const children =
		node.children?.filter((child) => child.visible !== false) ?? [];
	if (isHorizontal(node) && children.length) {
		const parentWidth = nodeWidth(node);
		const columns = children.map((child) =>
			createColumnBlock(
				child,
				convertFigmaNodeToGutenberg(child),
				parentWidth
			)
		);
		return [createColumnsBlock(node, columns)];
	}

	return children.flatMap(convertFigmaNodeToGutenberg);
}

export function convertFigmaNodesToGutenberg(
	nodes: FigmaNode | FigmaNode[]
): GutenbergBlock[] {
	return (Array.isArray(nodes) ? nodes : [nodes]).flatMap(
		convertFigmaNodeToGutenberg
	);
}
