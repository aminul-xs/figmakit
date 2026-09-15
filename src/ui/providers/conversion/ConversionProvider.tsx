import { useMemo, useReducer, type ReactNode } from 'react';
import {
	ConversionContext,
	type ConversionContextValue,
} from '../../context/conversion';
import {
	useAnalyzeConversion,
	useArtifactDownload,
	useFigmaSelection,
	useWebsiteConnection,
} from '../../hooks/conversion';
import {
	conversionReducer,
	initialConversionState,
} from '../../reducers/conversion';

export function ConversionProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(
		conversionReducer,
		initialConversionState
	);
	const refreshSelection = useFigmaSelection(dispatch);
	const analyze = useAnalyzeConversion(state, dispatch);
	const connectWebsite = useWebsiteConnection(state.websiteUrl, dispatch);
	const download = useArtifactDownload(state.artifact);

	const value = useMemo<ConversionContextValue>(
		() => ({
			...state,
			setStep: (step) => dispatch({ type: 'STEP', step }),
			setTarget: (target) => dispatch({ type: 'TARGET', target }),
			toggle: (key) => dispatch({ type: 'TOGGLE', key }),
			refreshSelection,
			analyze,
			setWebsiteUrl: (value) => dispatch({ type: 'WEBSITE_URL', value }),
			connectWebsite,
			download,
		}),
		[state, refreshSelection, analyze, connectWebsite, download]
	);

	return (
		<ConversionContext.Provider value={value}>
			{children}
		</ConversionContext.Provider>
	);
}
