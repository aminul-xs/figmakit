import type { ConversionDiagnostic, ValidationResult } from '@/core/targets';
import type { GutenbergBlock, GutenbergDocument } from './types';

const supported = new Set([
	'core/column',
	'core/columns',
	'core/image',
	'core/paragraph',
]);

export function validateGutenbergDocument(
	document: GutenbergDocument
): ValidationResult {
	const diagnostics: ConversionDiagnostic[] = [];
	const visit = (block: GutenbergBlock, parent?: GutenbergBlock) => {
		if (!supported.has(block.name))
			diagnostics.push({
				code: 'gutenberg.unsupported-block',
				message: `${block.name} is not supported.`,
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (block.name === 'core/column' && parent?.name !== 'core/columns')
			diagnostics.push({
				code: 'gutenberg.orphan-column',
				message: 'core/column must be a direct child of core/columns.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (
			block.name === 'core/columns' &&
			block.innerBlocks.some((child) => child.name !== 'core/column')
		)
			diagnostics.push({
				code: 'gutenberg.invalid-columns-child',
				message: 'core/columns may contain only core/column blocks.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (
			block.name === 'core/image' &&
			typeof block.attributes.url !== 'string'
		)
			diagnostics.push({
				code: 'gutenberg.image-url-invalid',
				message: 'core/image requires a string URL.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (
			block.name === 'core/paragraph' &&
			typeof block.attributes.content !== 'string'
		)
			diagnostics.push({
				code: 'gutenberg.paragraph-content-invalid',
				message: 'core/paragraph requires string content.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		for (const child of block.innerBlocks) visit(child, block);
	};
	for (const block of document.blocks) visit(block);
	if (!document.markup.trim() && document.blocks.length)
		diagnostics.push({
			code: 'gutenberg.markup-empty',
			message: 'Serialized block markup is empty.',
			severity: 'error',
		});
	return {
		valid: !diagnostics.some(({ severity }) => severity === 'error'),
		diagnostics,
	};
}
