import type { FigmaNode } from '@/core/figma';
import type { GutenbergBlock } from '../../types';
import { mapFigmaColumn } from './columnMapper';

export function createColumnBlock(
	node: FigmaNode,
	innerBlocks: GutenbergBlock[],
	parentWidth?: number
): GutenbergBlock {
	const attributes = mapFigmaColumn(node, parentWidth);
	return {
		name: 'core/column',
		attributes,
		innerBlocks,
		sourceNodeId: node.id,
		render: (innerMarkup) => {
			const width =
				typeof attributes.width === 'string'
					? ` style="flex-basis:${attributes.width}"`
					: '';
			return `<div class="wp-block-column"${width}>${innerMarkup ? `\n${innerMarkup}\n` : ''}</div>`;
		},
	};
}
