import type { FigmaNode } from '@/core/figma';
import type {
	ConversionDiagnostic,
	ConversionTarget,
	ExportArtifact,
} from '@/core/targets';
import type {
	AppStep,
	ConnectionStatus,
	ConversionState,
	ConversionToggle,
} from '../../context/conversion';

export type ConversionAction =
	| { type: 'STEP'; step: AppStep }
	| { type: 'TARGET'; target: ConversionTarget }
	| { type: 'TOGGLE'; key: ConversionToggle }
	| { type: 'LOADING' }
	| { type: 'NODES'; nodes: FigmaNode[] }
	| { type: 'ERROR'; message: string }
	| {
			type: 'ANALYZED';
			diagnostics: ConversionDiagnostic[];
			artifact: ExportArtifact;
	  }
	| { type: 'WEBSITE_URL'; value: string }
	| { type: 'CONNECTION'; status: ConnectionStatus };

export const initialConversionState: ConversionState = {
	step: 'design',
	nodes: [],
	target: 'elementor',
	aiEnabled: true,
	responsiveEnabled: true,
	preferNative: true,
	loading: false,
	error: '',
	diagnostics: [],
	artifact: null,
	websiteUrl: '',
	connectionStatus: 'idle',
};

export function conversionReducer(
	state: ConversionState,
	action: ConversionAction
): ConversionState {
	switch (action.type) {
		case 'STEP':
			return { ...state, step: action.step, error: '' };
		case 'TARGET':
			return {
				...state,
				target: action.target,
				artifact: null,
				diagnostics: [],
			};
		case 'TOGGLE':
			return { ...state, [action.key]: !state[action.key] };
		case 'LOADING':
			return { ...state, loading: true, error: '' };
		case 'NODES':
			return {
				...state,
				nodes: action.nodes,
				loading: false,
				error: '',
				step: 'target',
			};
		case 'ERROR':
			return { ...state, loading: false, error: action.message };
		case 'ANALYZED':
			return {
				...state,
				loading: false,
				diagnostics: action.diagnostics,
				artifact: action.artifact,
				step: 'review',
			};
		case 'WEBSITE_URL':
			return {
				...state,
				websiteUrl: action.value,
				connectionStatus: 'idle',
			};
		case 'CONNECTION':
			return { ...state, connectionStatus: action.status };
	}
}
