import type { FigmaNode } from '@/core/figma';
import { rgbToHex } from '@/utils';
import type { HeadingWidgetSettings } from '../../types';

export function mapFigmaTextToHeading(
	node: FigmaNode
): Partial<HeadingWidgetSettings> {
	const settings: Partial<HeadingWidgetSettings> = {
		title: node.characters,
		header_size: 'h2',
		typography_typography: 'custom',
	};
	const family = node.style?.fontFamily ?? node.fontName?.family;
	if (family) settings.typography_font_family = family;
	const size = node.style?.fontSize ?? node.fontSize;
	if (size) settings.typography_font_size = { unit: 'px', size, sizes: [] };
	const weight = node.style?.fontWeight;
	if (weight) settings.typography_font_weight = String(weight);
	const fill = node.fills?.find((candidate) => candidate.type === 'SOLID' && candidate.color);
	if (fill?.color) settings.title_color = rgbToHex(fill.color);
	const align = node.style?.textAlignHorizontal ?? node.textAlignHorizontal;
	if (align) settings.align = align.toLowerCase();
	return settings;
}
