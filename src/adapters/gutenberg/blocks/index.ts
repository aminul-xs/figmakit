import { createColumnBlock, mapFigmaColumn } from './column';
import { createColumnsBlock, mapFigmaColumns } from './columns';
import { createImageBlock, mapFigmaImage } from './image';
import { createParagraphBlock, mapFigmaParagraph } from './paragraph';

export * from './column';
export * from './columns';
export * from './image';
export * from './paragraph';

export const gutenbergBlocks = {
	column: createColumnBlock,
	columns: createColumnsBlock,
	image: createImageBlock,
	paragraph: createParagraphBlock,
};

export type GutenbergBlockType = keyof typeof gutenbergBlocks;

export const gutenbergBlockMappers = {
	column: mapFigmaColumn,
	columns: mapFigmaColumns,
	image: mapFigmaImage,
	paragraph: mapFigmaParagraph,
};
