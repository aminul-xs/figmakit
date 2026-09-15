import type { FigmaNode } from '@/core/figma';
import type {
	ConversionDiagnostic,
	ExportArtifact,
	TargetAdapter,
	ValidationResult,
} from '@/core/targets';
import { convertFigmaNodesToGutenberg } from './converter';
import { serializeGutenbergBlocks } from './serializer';
import type { GutenbergDocument } from './types';
import { validateGutenbergDocument } from './validation';

export interface GutenbergConversionInput {
	nodes: FigmaNode | FigmaNode[];
	filename?: string;
}

export class GutenbergAdapter implements TargetAdapter<
	GutenbergConversionInput,
	GutenbergDocument
> {
	readonly target = 'gutenberg' as const;

	preflight(input: GutenbergConversionInput): ConversionDiagnostic[] {
		const nodes = Array.isArray(input.nodes) ? input.nodes : [input.nodes];
		if (!nodes.length)
			return [
				{
					code: 'gutenberg.empty-selection',
					message: 'Select at least one Figma node to convert.',
					severity: 'error',
				},
			];
		const diagnostics: ConversionDiagnostic[] = [];
		const visit = (node: FigmaNode) => {
			const hasImage =
				node.type === 'IMAGE' ||
				node.fills?.some((fill) => fill.type === 'IMAGE');
			if (hasImage) {
				const image = node.fills?.find((fill) => fill.type === 'IMAGE');
				if (!image?.imageRef && !image?.imageHash)
					diagnostics.push({
						code: 'gutenberg.image-reference-missing',
						message: `Image “${node.name ?? node.id}” has no asset reference.`,
						severity: 'error',
						sourceNodeId: node.id,
					});
			}
			if (node.type !== 'TEXT' && !hasImage && !node.children?.length)
				diagnostics.push({
					code: 'gutenberg.unsupported-leaf',
					message: `${node.type} “${node.name ?? node.id}” has no mapping in the initial four-block scope.`,
					severity: 'warning',
					sourceNodeId: node.id,
				});
			for (const child of node.children ?? []) visit(child);
		};
		for (const node of nodes) visit(node);
		return diagnostics;
	}

	transform(input: GutenbergConversionInput): GutenbergDocument {
		const blocks = convertFigmaNodesToGutenberg(input.nodes);
		return { blocks, markup: serializeGutenbergBlocks(blocks) };
	}

	validate(output: GutenbergDocument): ValidationResult {
		return validateGutenbergDocument(output);
	}

	package(output: GutenbergDocument): ExportArtifact {
		return {
			filename: 'figmakit-gutenberg.html',
			mimeType: 'text/html',
			content: output.markup,
		};
	}
}

export const gutenbergAdapter = new GutenbergAdapter();
