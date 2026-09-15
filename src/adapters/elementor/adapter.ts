import type {
	ConversionDiagnostic,
	ExportArtifact,
	TargetAdapter,
	ValidationResult,
} from '@/core/targets';
import type { FigmaNode } from '@/core/figma';
import type { ElementorPage } from './types';
import { buildElementorPage } from './pageBuilder';

export interface ElementorConversionInput {
	nodes: FigmaNode | FigmaNode[];
	pageTitle?: string;
}

export class ElementorAdapter
	implements TargetAdapter<ElementorConversionInput, ElementorPage>
{
	readonly target = 'elementor' as const;

	preflight(input: ElementorConversionInput): ConversionDiagnostic[] {
		const nodes = Array.isArray(input.nodes) ? input.nodes : [input.nodes];
		return nodes.length
			? []
			: [{
				code: 'elementor.empty-selection',
				message: 'Select at least one Figma node to convert.',
				severity: 'error',
			}];
	}

	transform(input: ElementorConversionInput): ElementorPage {
		return buildElementorPage(input.nodes, input.pageTitle);
	}

	validate(output: ElementorPage): ValidationResult {
		const diagnostics: ConversionDiagnostic[] = [];
		if (output.version !== '0.4') {
			diagnostics.push({
				code: 'elementor.unsupported-version',
				message: `Unsupported Elementor template version: ${output.version}`,
				severity: 'error',
			});
		}
		if (!Array.isArray(output.content)) {
			diagnostics.push({
				code: 'elementor.invalid-content',
				message: 'Elementor template content must be an array.',
				severity: 'error',
			});
		}
		return {
			valid: !diagnostics.some(({ severity }) => severity === 'error'),
			diagnostics,
		};
	}

	package(output: ElementorPage): ExportArtifact {
		const safeTitle = output.title.trim().toLowerCase()
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
