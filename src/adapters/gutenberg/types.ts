export type GutenbergAttributes = Record<string, unknown>;

export interface GutenbergBlock {
	name: 'core/column' | 'core/columns' | 'core/image' | 'core/paragraph';
	attributes: GutenbergAttributes;
	serializedAttributes?: GutenbergAttributes;
	innerBlocks: GutenbergBlock[];
	render: (innerMarkup: string) => string;
	sourceNodeId?: string;
}

export interface GutenbergDocument {
	blocks: GutenbergBlock[];
	markup: string;
}
