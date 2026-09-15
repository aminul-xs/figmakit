import { createElementId } from '@/utils';
import type { ElementorElement, TextEditorWidgetSettings } from '../../types';

export function createTextEditorWidget(
	settings: Partial<TextEditorWidgetSettings>,
	depth = 0
): ElementorElement {
	return {
		id: createElementId(),
		settings,
		elements: [],
		isInner: depth > 0,
		widgetType: 'text-editor',
		elType: 'widget',
	};
}
