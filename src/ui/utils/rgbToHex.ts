/**
 * Convert Figma RGB color to hex
 */
export function rgbToHex(color: { r: number; g: number; b: number }): string {
	const toHex = (value: number) => {
		const hex = Math.round(value * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`.toUpperCase();
}
