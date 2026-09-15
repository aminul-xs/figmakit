import type { FigmaNode } from '@/core/figma';
import { nodeWidth } from '../../blockUtils';

export function mapFigmaColumn(
	node: FigmaNode,
	parentWidth?: number
): Record<string, unknown> {
	const width = nodeWidth(node);
	if (!width || !parentWidth) return {};
	return { width: `${Number(((width / parentWidth) * 100).toFixed(2))}%` };
}
