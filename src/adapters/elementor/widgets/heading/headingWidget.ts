import { createElementId } from '@/utils';
import type { ElementorElement, HeadingWidgetSettings } from '../../types';

export function createHeadingWidget(
	text: string,
	settings: Partial<HeadingWidgetSettings> = {},
	depth = 0
): ElementorElement {
	return {
		id: createElementId(),
		settings: { title: text, ...settings },
		elements: [],
		isInner: depth > 0,
		widgetType: 'heading',
		elType: 'widget',
	};
}
