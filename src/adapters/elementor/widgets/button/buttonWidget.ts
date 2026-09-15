import { createElementId } from '@/utils';
import type { ButtonWidgetSettings, ElementorElement } from '../../types';
export function createButtonWidget(
	settings: Partial<ButtonWidgetSettings>,
	depth = 0
): ElementorElement {
	return {
		id: createElementId(),
		settings,
		elements: [],
		isInner: depth > 0,
		widgetType: 'button',
		elType: 'widget',
	};
}
