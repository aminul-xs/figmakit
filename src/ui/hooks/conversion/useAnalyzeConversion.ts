import { useCallback, type Dispatch } from 'react';
import { elementorAdapter } from '@/adapters/elementor';
import { gutenbergAdapter } from '@/adapters/gutenberg';
import type { ConversionState } from '../../context/conversion';
import type { ConversionAction } from '../../reducers/conversion';

export function useAnalyzeConversion(
	state: ConversionState,
	dispatch: Dispatch<ConversionAction>
) {
	return useCallback(() => {
		if (!state.nodes.length)
			return dispatch({
				type: 'ERROR',
				message: 'Select a frame before analyzing.',
			});
		dispatch({ type: 'LOADING' });
		try {
			if (state.target === 'elementor') {
				const input = {
					nodes: state.nodes,
					pageTitle: state.nodes[0]?.name ?? 'FigmaKit Page',
				};
				const output = elementorAdapter.transform(input);
				return dispatch({
					type: 'ANALYZED',
					diagnostics: [
						...elementorAdapter.preflight(input),
						...elementorAdapter.validate(output).diagnostics,
					],
					artifact: elementorAdapter.package(output),
				});
			}
			if (state.target === 'gutenberg') {
				const input = { nodes: state.nodes };
				const output = gutenbergAdapter.transform(input);
				return dispatch({
					type: 'ANALYZED',
					diagnostics: [
						...gutenbergAdapter.preflight(input),
						...gutenbergAdapter.validate(output).diagnostics,
					],
					artifact: gutenbergAdapter.package(output),
				});
			}
			dispatch({
				type: 'ERROR',
				message: 'This target adapter is not available yet.',
			});
		} catch (error) {
			dispatch({
				type: 'ERROR',
				message:
					error instanceof Error
						? error.message
						: 'Conversion failed.',
			});
		}
	}, [dispatch, state.nodes, state.target]);
}
