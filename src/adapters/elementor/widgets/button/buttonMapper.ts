import type { FigmaNode } from '@/core/figma';
import type { ButtonWidgetSettings } from '../../types';
import { box, dimension, firstSolidColor, nodeRadius } from '../mappingUtils';

export function mapFigmaButton(node: FigmaNode): Partial<ButtonWidgetSettings> {
	const label = node.children?.find((child) => child.type === 'TEXT');
	const size =
		typeof label?.text?.fontSize === 'number' ? label.text.fontSize : 14;
	return {
		text:
			label?.text?.characters ??
			label?.characters ??
			node.name ??
			'Button',
		link: { url: '', is_external: '', nofollow: '' },
		align: 'center',
		background_color: firstSolidColor(node.fills),
		button_text_color: firstSolidColor(label?.text?.fills ?? label?.fills),
		border_radius: nodeRadius(node) ?? box(4, 4, 4, 4),
		typography_typography: 'custom',
		typography_font_size: dimension(size),
	};
}
