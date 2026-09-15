import type { FigmaNode } from '@/core/figma';
import { escapeHtml, styleString } from '../../blockUtils';
import type { GutenbergBlock } from '../../types';
import { mapFigmaParagraph } from './paragraphMapper';

export function createParagraphBlock(node: FigmaNode): GutenbergBlock {
	const mapping = mapFigmaParagraph(node);
	return {
		name: 'core/paragraph',
		attributes: mapping.attributes,
		serializedAttributes: Object.fromEntries(
			Object.entries(mapping.attributes).filter(
				([key]) => key !== 'content'
			)
		),
		innerBlocks: [],
		sourceNodeId: node.id,
		render: () => {
			const style = styleString(mapping.styles);
			const align =
				typeof mapping.attributes.align === 'string'
					? ` has-text-align-${mapping.attributes.align}`
					: '';
			return `<p${align ? ` class="${align.trim()}"` : ''}${style ? ` style="${style}"` : ''}>${escapeHtml(mapping.content).replace(/\n/g, '<br>')}</p>`;
		},
	};
}
