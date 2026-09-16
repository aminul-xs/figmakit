import { createColumnBlock, mapFigmaColumn } from './column';
import { createColumnsBlock, mapFigmaColumns } from './columns';
import { createImageBlock, mapFigmaImage } from './image';
import { createParagraphBlock, mapFigmaParagraph } from './paragraph';
import { createButtonBlock, createButtonsBlock } from './button';
import { createGroupBlock } from './group';
import { createHeadingBlock } from './heading';

export * from './column';
export * from './columns';
export * from './image';
export * from './paragraph';
export * from './button';
export * from './group';
export * from './heading';

export const gutenbergBlocks = {
	column: createColumnBlock,
	columns: createColumnsBlock,
	image: createImageBlock,
	paragraph: createParagraphBlock,
	button: createButtonBlock,
	buttons: createButtonsBlock,
	group: createGroupBlock,
	heading: createHeadingBlock,
};

export type GutenbergBlockType = keyof typeof gutenbergBlocks;

export const gutenbergBlockMappers = {
	column: mapFigmaColumn,
	columns: mapFigmaColumns,
	image: mapFigmaImage,
	paragraph: mapFigmaParagraph,
};
