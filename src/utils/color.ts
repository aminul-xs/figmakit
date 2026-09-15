import type { FigmaColor } from '@/core/figma';

export function rgbToHex(color: FigmaColor): string {
	const channel = (value: number) =>
		Math.round(value * 255)
			.toString(16)
			.padStart(2, '0');
	return `#${channel(color.r)}${channel(color.g)}${channel(color.b)}`.toUpperCase();
}
