import { HeadingWidgetSettings } from '@/types/widget';
import { rgbToHex } from '@/ui/utils/rgbToHex';

/**
 * Default settings and controls for Heading widget
 * Based on Elementor heading widget structure
 */
export const defaultHeadingSettings: HeadingWidgetSettings = {
	title: 'Heading Text',
	header_size: 'h2',
	align: 'left',
	typography_typography: 'custom',
	typography_font_family: 'Inter',
	typography_font_size: {
		unit: 'px',
		size: 24,
		sizes: [],
	},
	typography_font_weight: '400',
	typography_text_transform: 'none',
	typography_font_style: 'normal',
	typography_text_decoration: 'none',
	typography_line_height: {
		unit: 'em',
		size: 1.2,
		sizes: [],
	},
	typography_letter_spacing: {
		unit: 'px',
		size: 0,
		sizes: [],
	},
	typography_word_spacing: {
		unit: 'px',
		size: 0,
		sizes: [],
	},
	title_color: '#000000',
	title_hover_color: '#0066FF',
	blend_mode: 'normal',
};

/**
 * Map Figma text node to Elementor heading settings
 * Extracts ALL text properties dynamically from Figma
 */
export function mapFigmaTextToHeading(
	figmaNode: any
): Partial<HeadingWidgetSettings> {
	const settings: Partial<HeadingWidgetSettings> = {};

	// Map text content
	if (figmaNode.characters) {
		settings.title = figmaNode.characters;
	}

	// Default header size
	settings.header_size = 'h2';
	settings.typography_typography = 'custom';

	// Map font family
	if (figmaNode.style?.fontFamily) {
		settings.typography_font_family = figmaNode.style.fontFamily;
	} else if (figmaNode.fontName?.family) {
		settings.typography_font_family = figmaNode.fontName.family;
	}

	// Map font size
	if (figmaNode.style?.fontSize) {
		settings.typography_font_size = {
			unit: 'px',
			size: figmaNode.style.fontSize,
			sizes: [],
		};
	} else if (figmaNode.fontSize) {
		settings.typography_font_size = {
			unit: 'px',
			size: figmaNode.fontSize,
			sizes: [],
		};
	}

	// Map font weight
	if (figmaNode.style?.fontWeight) {
		settings.typography_font_weight = String(figmaNode.style.fontWeight);
	} else if (figmaNode.fontName?.style) {
		// Extract weight from style name (e.g., "Regular" = 400, "Bold" = 700)
		const styleName = figmaNode.fontName.style.toLowerCase();
		const weightMap: Record<string, string> = {
			thin: '100',
			extralight: '200',
			light: '300',
			regular: '400',
			medium: '500',
			semibold: '600',
			bold: '700',
			extrabold: '800',
			black: '900',
		};
		settings.typography_font_weight = weightMap[styleName] || '400';
	}

	// Map text color
	if (figmaNode.fills && figmaNode.fills.length > 0) {
		const fill = figmaNode.fills[0];
		if (fill.type === 'SOLID' && fill.color) {
			settings.title_color = rgbToHex(fill.color);
		}
	}

	// Map text alignment
	if (figmaNode.style?.textAlignHorizontal) {
		const alignment = figmaNode.style.textAlignHorizontal.toLowerCase();
		settings.align =
			alignment === 'center'
				? 'center'
				: alignment === 'right'
					? 'right'
					: 'left';
	} else if (figmaNode.textAlignHorizontal) {
		const alignment = figmaNode.textAlignHorizontal.toLowerCase();
		settings.align =
			alignment === 'center'
				? 'center'
				: alignment === 'right'
					? 'right'
						: 'left';
	}

	// Map text transform
	if (figmaNode.style?.textCase) {
		const caseMap: Record<string, string> = {
			UPPER: 'uppercase',
			LOWER: 'lowercase',
			TITLE: 'capitalize',
			ORIGINAL: 'none',
		};
		settings.typography_text_transform = caseMap[figmaNode.style.textCase] || 'none';
	} else if (figmaNode.textCase) {
		const caseMap: Record<string, string> = {
			UPPER: 'uppercase',
			LOWER: 'lowercase',
			TITLE: 'capitalize',
			ORIGINAL: 'none',
		};
		settings.typography_text_transform = caseMap[figmaNode.textCase] || 'none';
	} else {
		settings.typography_text_transform = 'none';
	}

	// Map line height
	if (figmaNode.style?.lineHeightPx) {
		settings.typography_line_height = {
			unit: 'px',
			size: figmaNode.style.lineHeightPx,
			sizes: [],
		};
	} else if (figmaNode.lineHeight && typeof figmaNode.lineHeight === 'object') {
		if (figmaNode.lineHeight.unit === 'PIXELS') {
			settings.typography_line_height = {
				unit: 'px',
				size: figmaNode.lineHeight.value,
				sizes: [],
			};
		}
	}

	// Map letter spacing
	if (figmaNode.style?.letterSpacing) {
		settings.typography_letter_spacing = {
			unit: 'px',
			size: figmaNode.style.letterSpacing,
			sizes: [],
		};
	} else if (figmaNode.letterSpacing) {
		settings.typography_letter_spacing = {
			unit: 'px',
			size: figmaNode.letterSpacing,
			sizes: [],
		};
	}

	// Map text decoration
	if (figmaNode.style?.textDecoration) {
		const decoration = figmaNode.style.textDecoration.toLowerCase();
		settings.typography_text_decoration = decoration === 'none' ? 'none' : decoration;
	} else if (figmaNode.textDecoration) {
		const decoration = figmaNode.textDecoration.toLowerCase();
		settings.typography_text_decoration = decoration === 'none' ? 'none' : decoration;
	} else {
		settings.typography_text_decoration = 'none';
	}

	// Map font style (italic)
	if (figmaNode.fontName?.style) {
		const isItalic = figmaNode.fontName.style.toLowerCase().includes('italic');
		settings.typography_font_style = isItalic ? 'italic' : 'normal';
	} else {
		settings.typography_font_style = 'normal';
	}

	return settings;
}
