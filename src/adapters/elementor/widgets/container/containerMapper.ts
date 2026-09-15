import type { FigmaNode } from '@/core/figma';
import type { ContainerWidgetSettings } from '../../types';
import {
	box,
	colorWithAlpha,
	dimension,
	firstSolidColor,
	nodeHeight,
	nodeRadius,
	nodeWidth,
} from '../mappingUtils';

const justifyMap: Record<string, string> = {
	MIN: 'flex-start',
	CENTER: 'center',
	MAX: 'flex-end',
	SPACE_BETWEEN: 'space-between',
};

const alignMap: Record<string, string> = {
	MIN: 'flex-start',
	CENTER: 'center',
	MAX: 'flex-end',
	BASELINE: 'baseline',
};

export function mapFigmaFrameToContainer(
	node: FigmaNode
): Partial<ContainerWidgetSettings> {
	const frame = node.frame;
	const layoutMode = frame?.layoutMode ?? node.layoutMode;
	const primaryAlignment =
		frame?.primaryAxisAlignItems ?? node.primaryAxisAlignItems;
	const counterAlignment =
		frame?.counterAxisAlignItems ?? node.counterAxisAlignItems;
	const gap = frame?.itemSpacing ?? node.itemSpacing ?? 0;
	const width = nodeWidth(node);
	const height = nodeHeight(node);
	const settings: Partial<ContainerWidgetSettings> = {
		content_width: 'full',
		flex_direction: layoutMode === 'HORIZONTAL' ? 'row' : 'column',
		flex_wrap: frame?.layoutWrap === 'WRAP' ? 'wrap' : 'nowrap',
		flex_justify_content:
			justifyMap[primaryAlignment ?? ''] ?? 'flex-start',
		flex_align_items: alignMap[counterAlignment ?? ''] ?? 'flex-start',
		flex_gap: {
			size: gap,
			column: String(gap),
			row: String(gap),
			unit: 'px',
			isLinked: true,
		},
		padding: box(
			frame?.paddingTop ?? node.paddingTop ?? 0,
			frame?.paddingRight ?? node.paddingRight ?? 0,
			frame?.paddingBottom ?? node.paddingBottom ?? 0,
			frame?.paddingLeft ?? node.paddingLeft ?? 0
		),
	};

	if (width) settings.width = dimension(Math.round(width));
	if (height) settings.min_height = dimension(Math.round(height));

	const backgroundColor = firstSolidColor(node.fills);
	if (backgroundColor) {
		settings.background_background = 'classic';
		settings.background_color = backgroundColor;
	}

	const radius = nodeRadius(node);
	if (radius) settings.border_radius = radius;

	const borderColor = firstSolidColor(node.strokes);
	if (borderColor && node.strokeWeight) {
		settings.border_border = 'solid';
		settings.border_width = box(
			node.strokeWeight,
			node.strokeWeight,
			node.strokeWeight,
			node.strokeWeight
		);
		settings.border_color = borderColor;
	}

	const shadow = node.effects?.find(
		(effect) => effect.type === 'DROP_SHADOW' && effect.visible !== false
	);
	if (shadow?.color) {
		settings.box_shadow_box_shadow_type = 'yes';
		settings.box_shadow_box_shadow = {
			horizontal: shadow.offset?.x ?? 0,
			vertical: shadow.offset?.y ?? 0,
			blur: shadow.radius ?? 0,
			spread: shadow.spread ?? 0,
			color: colorWithAlpha(shadow.color),
		};
	}

	if (frame?.clipsContent !== undefined) {
		settings.overflow = frame.clipsContent ? 'hidden' : 'visible';
	}

	return settings;
}
