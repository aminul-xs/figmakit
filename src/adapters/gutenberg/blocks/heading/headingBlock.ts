import type { FigmaNode } from '@/core/figma';
import { richTextHtml } from '../../blockUtils';
import type { GutenbergBlock } from '../../types';
export function createHeadingBlock(node: FigmaNode): GutenbergBlock {
	const content = node.text?.characters ?? node.characters ?? '';
	return {
		name: 'core/heading',
		attributes: { content, level: 2 },
		serializedAttributes: {},
		innerBlocks: [],
		sourceNodeId: node.id,
		render: () => `<h2 class="wp-block-heading">${richTextHtml(node)}</h2>`,
	};
}
