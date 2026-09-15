import { useCallback, type Dispatch } from 'react';
import type { ConversionAction } from '../../reducers/conversion';

export function useWebsiteConnection(
	websiteUrl: string,
	dispatch: Dispatch<ConversionAction>
) {
	return useCallback(() => {
		if (!/^https?:\/\//i.test(websiteUrl))
			return dispatch({
				type: 'ERROR',
				message: 'Enter a complete URL beginning with https://.',
			});
		dispatch({ type: 'CONNECTION', status: 'connecting' });
		window.setTimeout(
			() => dispatch({ type: 'CONNECTION', status: 'unavailable' }),
			650
		);
	}, [dispatch, websiteUrl]);
}
