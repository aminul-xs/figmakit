import type { FigmaNode } from '@/core/figma';
import { escapeHtml } from '../../blockUtils';
import type { GutenbergBlock } from '../../types';
export function createButtonBlock(node: FigmaNode): GutenbergBlock {
	const child = node.children?.find(({ type }) => type === 'TEXT');
	const text =
		child?.text?.characters ?? child?.characters ?? node.name ?? 'Button';
	return {
		name: 'core/button',
		attributes: { text, url: '' },
		serializedAttributes: {},
		innerBlocks: [],
		sourceNodeId: node.id,
		render: () =>
			`<div class="wp-block-button"><a class="wp-block-button__link wp-element-button">${escapeHtml(text)}</a></div>`,
	};
}
export function createButtonsBlock(node: FigmaNode): GutenbergBlock {
	return {
		name: 'core/buttons',
		attributes: { layout: { type: 'flex', justifyContent: 'center' } },
		innerBlocks: [createButtonBlock(node)],
		sourceNodeId: node.id,
		render: (inner) =>
			`<div class="wp-block-buttons is-content-justification-center is-layout-flex">\n${inner}\n</div>`,
	};
}
