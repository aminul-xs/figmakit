import type {
	ConversionDiagnostic,
	ExportArtifact,
	TargetAdapter,
	ValidationResult,
} from '@/core/targets';
import type { FigmaNode } from '@/core/figma';
import type { ElementorPage } from './types';
import { buildElementorPage } from './pageBuilder';
import { validateElementorPage } from './validation';

export interface ElementorConversionInput {
	nodes: FigmaNode | FigmaNode[];
	pageTitle?: string;
}

export class ElementorAdapter implements TargetAdapter<
	ElementorConversionInput,
	ElementorPage
> {
	readonly target = 'elementor' as const;

	preflight(input: ElementorConversionInput): ConversionDiagnostic[] {
		const nodes = Array.isArray(input.nodes) ? input.nodes : [input.nodes];
		if (!nodes.length) {
			return [
				{
					code: 'elementor.empty-selection',
					message: 'Select at least one Figma node to convert.',
					severity: 'error',
				},
			];
		}

		const diagnostics: ConversionDiagnostic[] = [];
		const visit = (node: FigmaNode) => {
			const supported = ['FRAME', 'GROUP', 'TEXT', 'RECTANGLE', 'IMAGE'];
			if (!supported.includes(node.type)) {
				diagnostics.push({
					code: 'elementor.unsupported-node',
					message: `${node.type} node "${node.name ?? node.id}" is not mapped yet.`,
					severity: 'warning',
					sourceNodeId: node.id,
				});
			}
			const imageFill = node.fills?.find(({ type }) => type === 'IMAGE');
			if (imageFill && !imageFill.imageRef && !imageFill.imageHash) {
				diagnostics.push({
					code: 'elementor.image-reference-missing',
					message: `Image "${node.name ?? node.id}" has no serialized asset reference.`,
					severity: 'error',
					sourceNodeId: node.id,
				});
			}
			for (const child of node.children ?? []) visit(child);
		};
		for (const node of nodes) visit(node);
		return diagnostics;
	}

	transform(input: ElementorConversionInput): ElementorPage {
		return buildElementorPage(input.nodes, input.pageTitle);
	}

	validate(output: ElementorPage): ValidationResult {
		return validateElementorPage(output);
	}

	package(output: ElementorPage): ExportArtifact {
		const safeTitle = output.title
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
		return {
			filename: `${safeTitle || 'figmakit-page'}.json`,
			mimeType: 'application/json',
			content: JSON.stringify(output, null, 2),
		};
	}
}

export const elementorAdapter = new ElementorAdapter();
