export type ConversionTarget =
	| 'elementor'
	| 'gutenberg'
	| 'elementskit'
	| 'gutenkit';

export type DiagnosticSeverity = 'info' | 'warning' | 'error';

export interface ConversionDiagnostic {
	code: string;
	message: string;
	severity: DiagnosticSeverity;
	sourceNodeId?: string;
}

export interface ValidationResult {
	valid: boolean;
	diagnostics: ConversionDiagnostic[];
}

export interface ExportArtifact {
	filename: string;
	mimeType: string;
	content: string;
}

export interface TargetAdapter<TInput, TOutput> {
	readonly target: ConversionTarget;
	preflight(input: TInput): ConversionDiagnostic[];
	transform(input: TInput): TOutput;
	validate(output: TOutput): ValidationResult;
	package(output: TOutput): ExportArtifact;
}
