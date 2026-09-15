import type { FigmaNode } from '@/core/figma';
import { nodeHeight, nodeWidth } from '../../blockUtils';

export interface ImageMapping {
	attributes: Record<string, unknown>;
	url: string;
	alt: string;
	width?: number;
	height?: number;
}

export function mapFigmaImage(node: FigmaNode): ImageMapping {
	const image = node.fills?.find((fill) => fill.type === 'IMAGE');
	const url =
		image?.imageRef ??
		(image?.imageHash ? `figma://image/${image.imageHash}` : '');
	const width = nodeWidth(node);
	const height = nodeHeight(node);
	const attributes: Record<string, unknown> = { url, alt: node.name ?? '' };
	if (width) attributes.width = `${Math.round(width)}px`;
	if (height) attributes.height = `${Math.round(height)}px`;
	if (image?.scaleMode)
		attributes.scale =
			image.scaleMode === 'FIT'
				? 'contain'
				: image.scaleMode === 'FILL' || image.scaleMode === 'CROP'
					? 'cover'
					: 'fill';
	return { attributes, url, alt: node.name ?? '', width, height };
}
