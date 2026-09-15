import type { FigmaColor, FigmaFill, FigmaNode } from '@/core/figma';
import { rgbToHex } from '@/utils';
import type { ElementorBox, ElementorDimension } from '../types';

export function dimension(size: number, unit = 'px'): ElementorDimension {
	return { unit, size, sizes: [] };
}

export function box(
	top: number,
	right: number,
	bottom: number,
	left: number,
	unit = 'px'
): ElementorBox {
	return {
		unit,
		top: String(top),
		right: String(right),
		bottom: String(bottom),
		left: String(left),
		isLinked: top === right && right === bottom && bottom === left,
	};
}

export function firstSolidColor(
	fills: FigmaFill[] | symbol | undefined
): string | undefined {
	if (!Array.isArray(fills)) return undefined;
	const fill = fills.find((item) => item.type === 'SOLID' && item.color);
	return fill?.color ? rgbToHex(fill.color) : undefined;
}

export function colorWithAlpha(color: FigmaColor & { a?: number }): string {
	if (color.a === undefined || color.a >= 1) return rgbToHex(color);
	const alpha = Math.round(color.a * 255)
		.toString(16)
		.padStart(2, '0');
	return `${rgbToHex(color)}${alpha}`;
}

export function nodeRadius(node: FigmaNode): ElementorBox | undefined {
	const data = node.frame ?? node.rectangle;
	if (!data) return undefined;
	if (typeof data.cornerRadius === 'number') {
		return box(
			data.cornerRadius,
			data.cornerRadius,
			data.cornerRadius,
			data.cornerRadius
		);
	}
	const top = data.topLeftRadius ?? 0;
	const right = data.topRightRadius ?? 0;
	const bottom = data.bottomRightRadius ?? 0;
	const left = data.bottomLeftRadius ?? 0;
	return box(top, right, bottom, left);
}

export function nodeWidth(node: FigmaNode): number | undefined {
	return node.absoluteBoundingBox?.width ?? node.width;
}

export function nodeHeight(node: FigmaNode): number | undefined {
	return node.absoluteBoundingBox?.height ?? node.height;
}
