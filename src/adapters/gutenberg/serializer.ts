import type { GutenbergBlock } from './types';

function serializeAttributes(attributes: GutenbergBlock['attributes']): string {
	return Object.keys(attributes).length
		? ` ${JSON.stringify(attributes)}`
		: '';
}

export function serializeGutenbergBlock(block: GutenbergBlock): string {
	const innerMarkup = block.innerBlocks
		.map(serializeGutenbergBlock)
		.join('\n');
	return `<!-- wp:${block.name.slice(5)}${serializeAttributes(block.serializedAttributes ?? block.attributes)} -->\n${block.render(innerMarkup)}\n<!-- /wp:${block.name.slice(5)} -->`;
}

export function serializeGutenbergBlocks(blocks: GutenbergBlock[]): string {
	return blocks.map(serializeGutenbergBlock).join('\n\n');
}
