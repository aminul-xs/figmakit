import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { WidgetBase, ImageWidgetSettings } from '@/types/widget';

/**
 * Create an Image widget for Elementor
 * Uses dynamic settings from Figma image node - no static defaults
 */
export function createImageWidget(
	imageUrl: string,
	settings: Partial<ImageWidgetSettings> = {},
	depth: number = 0
): WidgetBase {
	return {
		id: getUniqueId(),
		settings: {
			image: {
				url: imageUrl,
				id: '',
			},
			...settings,
		},
		elements: [],
		isInner: getIsInner(depth),
		widgetType: 'image',
		elType: 'widget',
	};
}
