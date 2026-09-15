import type { FigmaNode } from '@/core/figma';
import type { HeadingWidgetSettings } from '../../types';
import { dimension, firstSolidColor } from '../mappingUtils';

const weightByName: Record<string, string> = {
	thin: '100',
	'extra light': '200',
	extralight: '200',
	light: '300',
	regular: '400',
	normal: '400',
	medium: '500',
	'semi bold': '600',
	semibold: '600',
	bold: '700',
	'extra bold': '800',
	extrabold: '800',
	black: '900',
};

function inferHeadingTag(name: string, fontSize?: number): string {
	const match = name.match(/(?:^|\b)h([1-6])(?:\b|$)/i);
	if (match) return `h${match[1]}`;
	if (!fontSize) return 'h2';
	if (fontSize >= 48) return 'h1';
	if (fontSize >= 36) return 'h2';
	if (fontSize >= 28) return 'h3';
	if (fontSize >= 22) return 'h4';
	if (fontSize >= 18) return 'h5';
	return 'h6';
}

export function mapFigmaTextToHeading(
	node: FigmaNode
): Partial<HeadingWidgetSettings> {
	const text = node.text;
	const fontSize =
		typeof text?.fontSize === 'number'
			? text.fontSize
			: (node.style?.fontSize ?? node.fontSize);
	const fontName =
		text?.fontName && typeof text.fontName !== 'symbol'
			? text.fontName
			: node.fontName;
	const numericWeight =
		typeof text?.fontWeight === 'number'
			? text.fontWeight
			: node.style?.fontWeight;
	const settings: Partial<HeadingWidgetSettings> = {
		title: text?.characters ?? node.characters ?? '',
		header_size: inferHeadingTag(node.name ?? '', fontSize),
		size: 'default',
		typography_typography: 'custom',
	};

	if (fontName?.family) settings.typography_font_family = fontName.family;
	if (fontSize) settings.typography_font_size = dimension(fontSize);
	if (numericWeight) {
		settings.typography_font_weight = String(numericWeight);
	} else if (fontName?.style) {
		const normalized = fontName.style
			.toLowerCase()
			.replace(/italic/g, '')
			.trim();
		settings.typography_font_weight = weightByName[normalized] ?? '400';
	}
	if (fontName?.style.toLowerCase().includes('italic')) {
		settings.typography_font_style = 'italic';
	}

	const color = firstSolidColor(text?.fills ?? node.fills);
	if (color) settings.title_color = color;

	const align =
		text?.textAlignHorizontal ??
		node.style?.textAlignHorizontal ??
		node.textAlignHorizontal;
	if (align) {
		settings.align =
			({ LEFT: 'start', RIGHT: 'end' } as Record<string, string>)[
				align
			] ?? align.toLowerCase();
	}

	const textCase =
		typeof text?.textCase === 'string'
			? text.textCase
			: (node.style?.textCase ?? node.textCase);
	if (textCase) {
		settings.typography_text_transform =
			(
				{
					UPPER: 'uppercase',
					LOWER: 'lowercase',
					TITLE: 'capitalize',
					ORIGINAL: 'none',
				} as Record<string, string>
			)[textCase] ?? 'none';
	}

	const decoration =
		typeof text?.textDecoration === 'string'
			? text.textDecoration
			: (node.style?.textDecoration ?? node.textDecoration);
	if (decoration) {
		settings.typography_text_decoration = decoration.toLowerCase();
	}

	if (text?.lineHeight && typeof text.lineHeight !== 'symbol') {
		const { unit, value } = text.lineHeight;
		if (value !== undefined) {
			settings.typography_line_height = dimension(
				unit === 'PERCENT' ? value / 100 : value,
				unit === 'PERCENT' ? 'em' : 'px'
			);
		}
	}
	if (text?.letterSpacing && typeof text.letterSpacing !== 'symbol') {
		settings.typography_letter_spacing = dimension(
			text.letterSpacing.value,
			text.letterSpacing.unit === 'PERCENT' ? '%' : 'px'
		);
	}

	if (
		text?.hyperlink &&
		typeof text.hyperlink !== 'symbol' &&
		text.hyperlink.type === 'URL' &&
		text.hyperlink.value
	) {
		settings.link = {
			url: text.hyperlink.value,
			is_external: '',
			nofollow: '',
		};
	}

	if (node.blendMode && node.blendMode !== 'NORMAL') {
		settings.blend_mode = node.blendMode.toLowerCase().replace('_', '-');
	}
	return settings;
}
