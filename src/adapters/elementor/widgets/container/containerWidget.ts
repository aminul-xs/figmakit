import { createElementId } from '@/utils';
import type { ContainerWidgetSettings, ElementorElement } from '../../types';

export function createContainerWidget(
	settings: Partial<ContainerWidgetSettings> = {},
	depth = 0
): ElementorElement {
	return {
		id: createElementId(),
		settings,
		elements: [],
		isInner: depth > 0,
		elType: 'container',
	};
}
