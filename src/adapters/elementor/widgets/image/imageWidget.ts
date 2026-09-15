import { createElementId } from '@/utils';
import type { ElementorElement, ImageWidgetSettings } from '../../types';

export function createImageWidget(
	imageUrl: string,
	settings: Partial<ImageWidgetSettings> = {},
	depth = 0
): ElementorElement {
	return {
		id: createElementId(),
		settings: { image: { url: imageUrl, id: '' }, ...settings },
		elements: [],
		isInner: depth > 0,
		widgetType: 'image',
		elType: 'widget',
	};
}
