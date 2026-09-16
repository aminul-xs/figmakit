import { createContext } from 'react';
import type { ConversionContextValue } from './types';

export const ConversionContext = createContext<ConversionContextValue | null>(
	null
);
