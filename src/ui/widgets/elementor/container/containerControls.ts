import { ContainerWidgetSettings } from '@/types/widget';
import { rgbToHex } from '@/ui/utils/rgbToHex';

/**
 * Default settings and controls for Container
 * Based on Elementor container structure
 */
export const defaultContainerSettings: ContainerWidgetSettings = {
	content_position: 'top',
	flex_direction: 'column',
	flex_align_items: 'flex-start',
	flex_justify_content: 'flex-start',
	flex_gap: {
		size: 10,
		column: '10',
		row: '10',
		unit: 'px',
		isLinked: true,
	},
	padding: {
		unit: 'px',
		top: '20',
		right: '20',
		bottom: '20',
		left: '20',
		isLinked: false,
	},
	margin: {
		unit: 'px',
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
		isLinked: false,
	},
	background_background: 'classic',
	background_color: '#FFFFFF',
	border_radius: {
		unit: 'px',
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
		isLinked: true,
	},
	border_width: {
		unit: 'px',
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
		isLinked: true,
	},
};

/**
 * Map Figma frame/group to Elementor container settings
 * Extracts ALL properties dynamically from Figma node
 */
export function mapFigmaFrameToContainer(
	figmaNode: any
): Partial<ContainerWidgetSettings> {
	const settings: Partial<ContainerWidgetSettings> = {};
	
	// Map layout direction
	if (figmaNode.layoutMode) {
		settings.flex_direction =
			figmaNode.layoutMode === 'HORIZONTAL' ? 'row' : 'column';
	} else {
		// Default to column if no layout mode
		settings.flex_direction = 'column';
	}

	// Map primary axis alignment (justify-content)
	if (figmaNode.primaryAxisAlignItems) {
		const alignMap: Record<string, string> = {
			MIN: 'flex-start',
			CENTER: 'center',
			MAX: 'flex-end',
			SPACE_BETWEEN: 'space-between',
		};
		settings.flex_justify_content =
			alignMap[figmaNode.primaryAxisAlignItems] || 'flex-start';
	} else {
		settings.flex_justify_content = 'flex-start';
	}

	// Map counter axis alignment (align-items)
	if (figmaNode.counterAxisAlignItems) {
		const alignMap: Record<string, string> = {
			MIN: 'flex-start',
			CENTER: 'center',
			MAX: 'flex-end',
		};
		settings.flex_align_items =
			alignMap[figmaNode.counterAxisAlignItems] || 'flex-start';
	} else {
		settings.flex_align_items = 'flex-start';
	}

	// Map gap (itemSpacing)
	const spacing = figmaNode.itemSpacing || 10;
	settings.flex_gap = {
		size: spacing,
		column: String(spacing),
		row: String(spacing),
		unit: 'px',
		isLinked: true,
	};

	// Map padding (extract from Figma)
	const paddingTop = figmaNode.paddingTop || 20;
	const paddingRight = figmaNode.paddingRight || 20;
	const paddingBottom = figmaNode.paddingBottom || 20;
	const paddingLeft = figmaNode.paddingLeft || 20;
	
	settings.padding = {
		unit: 'px',
		top: String(paddingTop),
		right: String(paddingRight),
		bottom: String(paddingBottom),
		left: String(paddingLeft),
		isLinked: false,
	};

	// Map background color from fills
	if (figmaNode.fills && figmaNode.fills.length > 0) {
		const fill = figmaNode.fills[0];
		if (fill.type === 'SOLID' && fill.color) {
			settings.background_background = 'classic';
			settings.background_color = rgbToHex(fill.color);
		}
	} else {
		// Default transparent/white
		settings.background_background = 'classic';
		settings.background_color = '#FFFFFF';
	}

	// Map corner radius
	const radius = figmaNode.cornerRadius || 0;
	settings.border_radius = {
		unit: 'px',
		top: String(radius),
		right: String(radius),
		bottom: String(radius),
		left: String(radius),
		isLinked: true,
	};

	// Map stroke/border
	if (figmaNode.strokes && figmaNode.strokes.length > 0 && figmaNode.strokeWeight) {
		const stroke = figmaNode.strokes[0];
		if (stroke.type === 'SOLID' && stroke.color) {
			settings.border_border = 'solid';
			settings.border_width = {
				unit: 'px',
				top: String(figmaNode.strokeWeight),
				right: String(figmaNode.strokeWeight),
				bottom: String(figmaNode.strokeWeight),
				left: String(figmaNode.strokeWeight),
				isLinked: true,
			};
			settings.border_color = rgbToHex(stroke.color);
		}
	}

	// Map opacity
	if (figmaNode.opacity !== undefined && figmaNode.opacity < 1) {
		settings._element_opacity = {
			unit: '',
			size: figmaNode.opacity,
			sizes: [],
		};
	}

	return settings;
}