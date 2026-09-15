import type { FigmaNode } from '@/core/figma';
import { firstSolidColor } from '../../blockUtils';

export interface ParagraphMapping {
	content: string;
	attributes: Record<string, unknown>;
	styles: Record<string, string | number | undefined>;
}

export function mapFigmaParagraph(node: FigmaNode): ParagraphMapping {
	const text = node.text;
	const content = text?.characters ?? node.characters ?? '';
	const fontSize =
		typeof text?.fontSize === 'number'
			? text.fontSize
			: (node.style?.fontSize ?? node.fontSize);
	const fontWeight =
		typeof text?.fontWeight === 'number'
			? text.fontWeight
			: node.style?.fontWeight;
	const fontFamily =
		typeof text?.fontName === 'object'
			? text.fontName.family
			: (node.fontName?.family ?? node.style?.fontFamily);
	const align =
		text?.textAlignHorizontal ??
		node.textAlignHorizontal ??
		node.style?.textAlignHorizontal;
	const color = firstSolidColor(text?.fills ?? node.fills);
	const lineHeight =
		typeof text?.lineHeight === 'object' &&
		text.lineHeight.value !== undefined
			? `${text.lineHeight.value}${text.lineHeight.unit === 'PIXELS' ? 'px' : '%'}`
			: node.style?.lineHeightPx
				? `${node.style.lineHeightPx}px`
				: undefined;
	const letterSpacing =
		typeof text?.letterSpacing === 'object'
			? `${text.letterSpacing.value}${text.letterSpacing.unit === 'PIXELS' ? 'px' : '%'}`
			: node.style?.letterSpacing !== undefined
				? `${node.style.letterSpacing}px`
				: undefined;
	const textAlign = align?.toLowerCase();
	const attributes: Record<string, unknown> = { content };
	if (textAlign && textAlign !== 'left') attributes.align = textAlign;
	const typography = {
		fontFamily,
		fontSize: fontSize ? `${fontSize}px` : undefined,
		fontWeight: fontWeight ? String(fontWeight) : undefined,
		fontStyle:
			typeof text?.fontName === 'object' &&
			/italic/i.test(text.fontName.style)
				? 'italic'
				: undefined,
		lineHeight,
		letterSpacing,
		textTransform:
			typeof text?.textCase === 'string'
				? text.textCase.toLowerCase().replace('_', '-')
				: undefined,
		textDecoration:
			typeof text?.textDecoration === 'string'
				? text.textDecoration.toLowerCase().replace('_', '-')
				: undefined,
	};
	const cleanTypography = Object.fromEntries(
		Object.entries(typography).filter(([, value]) => value !== undefined)
	);
	const blockStyle: Record<string, unknown> = {};
	if (color) blockStyle.color = { text: color };
	if (Object.keys(cleanTypography).length)
		blockStyle.typography = cleanTypography;
	if (Object.keys(blockStyle).length) attributes.style = blockStyle;
	return {
		content,
		attributes,
		styles: {
			color,
			'font-family': fontFamily,
			'font-size': fontSize ? `${fontSize}px` : undefined,
			'font-weight': fontWeight,
			'font-style':
				typeof text?.fontName === 'object' &&
				/italic/i.test(text.fontName.style)
					? 'italic'
					: undefined,
			'line-height': lineHeight,
			'letter-spacing': letterSpacing,
			'text-align': textAlign,
			'text-transform':
				typeof text?.textCase === 'string'
					? text.textCase.toLowerCase().replace('_', '-')
					: undefined,
			'text-decoration':
				typeof text?.textDecoration === 'string'
					? text.textDecoration.toLowerCase().replace('_', '-')
					: undefined,
		},
	};
}
