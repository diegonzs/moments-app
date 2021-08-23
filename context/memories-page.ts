import { createContext } from 'react';
import { TMemoriesPageContext } from 'types/global-types';

export const MemoriesPageContext = createContext<TMemoriesPageContext>({
	memories: {},
	offset: 0,
	updateMemoriesPage: () => null,
});
