import { useContext } from 'react';
import { ConversionContext } from '../context/conversion';

export function useConversion() {
	const context = useContext(ConversionContext);
	if (!context)
		throw new Error(
			'useConversion must be used inside ConversionProvider.'
		);
	return context;
}
