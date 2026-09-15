import type { FigmaNode } from '@/core/figma';
import type { GutenbergBlock } from '../../types';
import { mapFigmaColumns } from './columnsMapper';

export function createColumnsBlock(
	node: FigmaNode,
	columns: GutenbergBlock[]
): GutenbergBlock {
	const attributes = mapFigmaColumns(node);
	return {
		name: 'core/columns',
		attributes,
		innerBlocks: columns,
		sourceNodeId: node.id,
		render: (innerMarkup) =>
			`<div class="wp-block-columns">${innerMarkup ? `\n${innerMarkup}\n` : ''}</div>`,
	};
}
