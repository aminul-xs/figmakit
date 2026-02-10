import { getUniqueId } from '@/utils/getUniqueId';
import { getIsInner } from '@/utils/getIsInner';
import { WidgetBase, ContainerWidgetSettings } from '@/types/widget';

/**
 * Create a Container for Elementor
 * Uses dynamic settings from Figma node mapping - minimal fallbacks
 */
export function createContainerWidget(
	settings: Partial<ContainerWidgetSettings> = {},
	depth: number = 0
): WidgetBase {
	return {
		id: getUniqueId(),
		settings: {
			...settings,
		},
		elements: [],
		isInner: getIsInner(depth),
		elType: 'container',
	};
}

