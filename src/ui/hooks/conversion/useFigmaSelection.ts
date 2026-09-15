import { useCallback, useEffect, type Dispatch } from 'react';
import type { FigmaNode } from '@/core/figma';
import type { ConversionAction } from '../../reducers/conversion';

export function useFigmaSelection(dispatch: Dispatch<ConversionAction>) {
	useEffect(() => {
		const listener = (event: MessageEvent) => {
			const message = event.data?.pluginMessage;
			if (message?.type === 'figma-nodes-data') {
				dispatch({
					type: 'NODES',
					nodes: message.nodes as FigmaNode[],
				});
			}
			if (message?.type === 'error') {
				dispatch({
					type: 'ERROR',
					message: message.message ?? 'Could not read the selection.',
				});
			}
		};
		window.addEventListener('message', listener);
		return () => window.removeEventListener('message', listener);
	}, [dispatch]);

	return useCallback(() => {
		dispatch({ type: 'LOADING' });
		parent.postMessage({ pluginMessage: { type: 'get-figma-nodes' } }, '*');
	}, [dispatch]);
}
