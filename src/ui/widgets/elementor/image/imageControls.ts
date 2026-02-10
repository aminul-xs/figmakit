import { ImageWidgetSettings } from '@/types/widget';

/**
 * Default settings and controls for Image widget
 * Based on Elementor image widget structure
 */
export const defaultImageSettings: ImageWidgetSettings = {
	image: {
		url: '',
		id: '',
	},
	image_size: 'full',
	width: {
		unit: '%',
		size: 100,
		sizes: [],
	},
	height: {
		unit: 'auto',
		size: 300,
		sizes: [],
	},
	object_fit: 'cover',
	align: 'center',
	caption_source: 'none',
	hover_animation: 'none',
};

/**
 * Map Figma image node to Elementor image settings
 * Extracts ALL image properties dynamically from Figma
 */
export function mapFigmaImageToImage(
	figmaNode: any
): Partial<ImageWidgetSettings> {
	const settings: Partial<ImageWidgetSettings> = {};

	// Map image URL from fills
	if (figmaNode.fills && figmaNode.fills.length > 0) {
		const imageFill = figmaNode.fills.find((fill: any) => fill.type === 'IMAGE');
		if (imageFill) {
			if (imageFill.imageRef) {
				settings.image = {
					url: imageFill.imageRef,
					id: figmaNode.id,
				};
			} else if (imageFill.imageHash) {
				settings.image = {
					url: `figma://image/${imageFill.imageHash}`,
					id: figmaNode.id,
				};
			}

			// Map image fit from scale mode
			if (imageFill.scaleMode) {
				const scaleModeMap: Record<string, string> = {
					FILL: 'cover',
					FIT: 'contain',
					CROP: 'cover',
					TILE: 'none',
				};
				settings.object_fit = scaleModeMap[imageFill.scaleMode] || 'cover';
			}
		}
	}

	// Map dimensions from node size
	if (figmaNode.absoluteBoundingBox) {
		if (figmaNode.absoluteBoundingBox.width) {
			settings.width = {
				unit: 'px',
				size: Math.round(figmaNode.absoluteBoundingBox.width),
				sizes: [],
			};
		}
		if (figmaNode.absoluteBoundingBox.height) {
			settings.height = {
				unit: 'px',
				size: Math.round(figmaNode.absoluteBoundingBox.height),
				sizes: [],
			};
		}
	}

	// Fallback: use width and height properties
	if (!settings.width && figmaNode.width) {
		settings.width = {
			unit: 'px',
			size: Math.round(figmaNode.width),
			sizes: [],
		};
	}
	if (!settings.height && figmaNode.height) {
		settings.height = {
			unit: 'px',
			size: Math.round(figmaNode.height),
			sizes: [],
		};
	}

	// Map corner radius for rounded images
	if (figmaNode.cornerRadius !== undefined && figmaNode.cornerRadius > 0) {
		settings.border_radius = {
			unit: 'px',
			top: String(Math.round(figmaNode.cornerRadius)),
			right: String(Math.round(figmaNode.cornerRadius)),
			bottom: String(Math.round(figmaNode.cornerRadius)),
			left: String(Math.round(figmaNode.cornerRadius)),
			isLinked: true,
		};
	} else if (figmaNode.rectangleCornerRadii) {
		// Handle individual corner radii
		const [topLeft, topRight, bottomRight, bottomLeft] = figmaNode.rectangleCornerRadii;
		settings.border_radius = {
			unit: 'px',
			top: String(Math.round(topLeft)),
			right: String(Math.round(topRight)),
			bottom: String(Math.round(bottomRight)),
			left: String(Math.round(bottomLeft)),
			isLinked: topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft,
		};
	}

	// Map border/strokes
	if (figmaNode.strokes && figmaNode.strokes.length > 0 && figmaNode.strokeWeight) {
		const stroke = figmaNode.strokes[0];
		if (stroke.type === 'SOLID' && stroke.color) {
			const r = Math.round(stroke.color.r * 255);
			const g = Math.round(stroke.color.g * 255);
			const b = Math.round(stroke.color.b * 255);
			settings.border_border = 'solid';
			settings.border_width = {
				unit: 'px',
				top: String(figmaNode.strokeWeight),
				right: String(figmaNode.strokeWeight),
				bottom: String(figmaNode.strokeWeight),
				left: String(figmaNode.strokeWeight),
				isLinked: true,
			};
			settings.border_color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
		}
	}

	// Map opacity
	if (figmaNode.opacity !== undefined && figmaNode.opacity < 1) {
		settings._element_opacity = {
			unit: 'px',
			size: figmaNode.opacity,
			sizes: [],
		};
	}

	// Always set image size to full to use original dimensions
	settings.image_size = 'full';

	return settings;
}
