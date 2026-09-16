import type { FigmaColor, FigmaFill, FigmaNode } from '@/core/figma';
import { rgbToHex } from '@/utils';

export function escapeHtml(value: string): string {
	return value.replace(
		/[&<>\"]/g,
		(character) =>
			({
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
			})[character] ?? character
	);
}

export function richTextHtml(node: FigmaNode): string {
	if (!node.text?.segments?.length)
		return escapeHtml(node.text?.characters ?? node.characters ?? '');
	return node.text.segments
		.map((segment) => {
			const content = escapeHtml(segment.characters);
			if (segment.fontName && /italic/i.test(segment.fontName.style))
				return `<em>${content}</em>`;
			if (segment.textDecoration && segment.textDecoration !== 'NONE')
				return `<u>${content}</u>`;
			return content;
		})
		.join('');
}

export function escapeAttribute(value: string): string {
	return escapeHtml(value).replace(/'/g, '&#039;');
}

export function firstSolidColor(
	fills: FigmaFill[] | symbol | undefined
): string | undefined {
	if (!Array.isArray(fills)) return undefined;
	const fill = fills.find(
		(candidate) => candidate.type === 'SOLID' && candidate.color
	);
	return fill?.color ? rgbToHex(fill.color) : undefined;
}

export function rgba(color: FigmaColor & { a?: number }): string {
	if (color.a === undefined || color.a >= 1) return rgbToHex(color);
	return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`;
}

export function nodeWidth(node: FigmaNode): number | undefined {
	return node.absoluteBoundingBox?.width ?? node.width;
}

export function nodeHeight(node: FigmaNode): number | undefined {
	return node.absoluteBoundingBox?.height ?? node.height;
}

export function styleString(
	styles: Record<string, string | number | undefined>
): string {
	return Object.entries(styles)
		.filter(
			(entry): entry is [string, string | number] =>
				entry[1] !== undefined && entry[1] !== ''
		)
		.map(([property, value]) => `${property}:${value}`)
		.join(';');
}
