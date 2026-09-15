import type { FigmaNode } from '@/core/figma';
import type {
	ConversionDiagnostic,
	ConversionTarget,
	ExportArtifact,
} from '@/core/targets';

export type AppStep = 'design' | 'target' | 'review' | 'website' | 'publish';
export type ConnectionStatus =
	| 'idle'
	| 'connecting'
	| 'connected'
	| 'unavailable';
export type ConversionToggle =
	| 'aiEnabled'
	| 'responsiveEnabled'
	| 'preferNative';

export interface ConversionState {
	step: AppStep;
	nodes: FigmaNode[];
	target: ConversionTarget;
	aiEnabled: boolean;
	responsiveEnabled: boolean;
	preferNative: boolean;
	loading: boolean;
	error: string;
	diagnostics: ConversionDiagnostic[];
	artifact: ExportArtifact | null;
	websiteUrl: string;
	connectionStatus: ConnectionStatus;
}

export interface ConversionContextValue extends ConversionState {
	setStep: (step: AppStep) => void;
	setTarget: (target: ConversionTarget) => void;
	toggle: (key: ConversionToggle) => void;
	refreshSelection: () => void;
	analyze: () => void;
	setWebsiteUrl: (value: string) => void;
	connectWebsite: () => void;
	download: () => void;
}
