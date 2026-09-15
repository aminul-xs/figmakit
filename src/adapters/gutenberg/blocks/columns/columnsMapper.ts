import type { FigmaNode } from '@/core/figma';

const alignmentMap: Record<string, string> = {
	MIN: 'top',
	CENTER: 'center',
	MAX: 'bottom',
};

export function mapFigmaColumns(node: FigmaNode): Record<string, unknown> {
	const alignment =
		node.frame?.counterAxisAlignItems ?? node.counterAxisAlignItems;
	const attributes: Record<string, unknown> = { isStackedOnMobile: true };
	if (alignmentMap[alignment ?? ''])
		attributes.verticalAlignment = alignmentMap[alignment ?? ''];
	return attributes;
}
