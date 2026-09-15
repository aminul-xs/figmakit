import type { FigmaNode, FigmaTextSegment } from '@/core/figma';
import type { TextEditorWidgetSettings } from '../../types';
import { dimension, firstSolidColor } from '../mappingUtils';

const escapeHtml = (value: string) =>
	value.replace(
		/[&<>]/g,
		(item) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[item] ?? item
	);

function segmentHtml(segment: FigmaTextSegment): string {
	const content = escapeHtml(segment.characters);
	const italic = segment.fontName && /italic/i.test(segment.fontName.style);
	const decorated =
		segment.textDecoration && segment.textDecoration !== 'NONE';
	return italic
		? `<em>${content}</em>`
		: decorated
			? `<u>${content}</u>`
			: content;
}

export function richTextHtml(node: FigmaNode): string {
	const content =
		node.text?.segments?.map(segmentHtml).join('') ??
		escapeHtml(node.text?.characters ?? node.characters ?? '');
	return `<p>${content.replace(/\n/g, '<br>')}</p>`;
}

export function mapFigmaTextToTextEditor(
	node: FigmaNode
): Partial<TextEditorWidgetSettings> {
	const text = node.text;
	const fontSize =
		typeof text?.fontSize === 'number' ? text.fontSize : node.fontSize;
	return {
		editor: richTextHtml(node),
		align: text?.textAlignHorizontal?.toLowerCase(),
		text_color: firstSolidColor(text?.fills ?? node.fills),
		typography_typography: 'custom',
		typography_font_family:
			typeof text?.fontName === 'object'
				? text.fontName.family
				: undefined,
		typography_font_size: fontSize ? dimension(fontSize) : undefined,
		typography_font_weight:
			typeof text?.fontWeight === 'number'
				? String(text.fontWeight)
				: undefined,
	};
}
