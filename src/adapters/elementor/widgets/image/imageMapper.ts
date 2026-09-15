import type { FigmaNode } from '@/core/figma';
import { rgbToHex } from '@/utils';
import type { ImageWidgetSettings } from '../../types';

export function mapFigmaImageToImage(
	node: FigmaNode
): Partial<ImageWidgetSettings> {
	const settings: Partial<ImageWidgetSettings> = { image_size: 'full' };
	const image = node.fills?.find((fill) => fill.type === 'IMAGE');
	if (image) {
		settings.image = {
			url: image.imageRef ?? (image.imageHash ? `figma://image/${image.imageHash}` : ''),
			id: node.id,
		};
		settings.object_fit = ({ FILL: 'cover', FIT: 'contain', CROP: 'cover', TILE: 'none' } as Record<string, string>)[image.scaleMode ?? ''] ?? 'cover';
	}
	const width = node.absoluteBoundingBox?.width ?? node.width;
	const height = node.absoluteBoundingBox?.height ?? node.height;
	if (width) settings.width = { unit: 'px', size: Math.round(width), sizes: [] };
	if (height) settings.height = { unit: 'px', size: Math.round(height), sizes: [] };
	if (node.cornerRadius) {
		const value = String(Math.round(node.cornerRadius));
		settings.border_radius = { unit: 'px', top: value, right: value, bottom: value, left: value, isLinked: true };
	}
	const stroke = node.strokes?.find((candidate) => candidate.type === 'SOLID' && candidate.color);
	if (stroke?.color && node.strokeWeight) {
		settings.border_border = 'solid';
		settings.border_color = rgbToHex(stroke.color);
	}
	return settings;
}
