import type { FigmaNode } from '@/core/figma';
import { rgbToHex } from '@/utils';
import type { ContainerWidgetSettings } from '../../types';

export function mapFigmaFrameToContainer(
	node: FigmaNode
): Partial<ContainerWidgetSettings> {
	const settings: Partial<ContainerWidgetSettings> = {
		flex_direction: node.layoutMode === 'HORIZONTAL' ? 'row' : 'column',
		flex_justify_content: ({
			MIN: 'flex-start', CENTER: 'center', MAX: 'flex-end', SPACE_BETWEEN: 'space-between',
		} as Record<string, string>)[node.primaryAxisAlignItems ?? ''] ?? 'flex-start',
		flex_align_items: ({ MIN: 'flex-start', CENTER: 'center', MAX: 'flex-end' } as Record<string, string>)[node.counterAxisAlignItems ?? ''] ?? 'flex-start',
	};
	const gap = node.itemSpacing ?? 0;
	settings.flex_gap = { size: gap, column: String(gap), row: String(gap), unit: 'px', isLinked: true };
	settings.padding = {
		unit: 'px',
		top: String(node.paddingTop ?? 0),
		right: String(node.paddingRight ?? 0),
		bottom: String(node.paddingBottom ?? 0),
		left: String(node.paddingLeft ?? 0),
		isLinked: false,
	};
	const fill = node.fills?.find((candidate) => candidate.type === 'SOLID' && candidate.color);
	if (fill?.color) {
		settings.background_background = 'classic';
		settings.background_color = rgbToHex(fill.color);
	}
	const radius = node.cornerRadius ?? 0;
	settings.border_radius = {
		unit: 'px', top: String(radius), right: String(radius),
		bottom: String(radius), left: String(radius), isLinked: true,
	};
	return settings;
}
