import { createContext } from 'react';
import { Moments } from 'types/schema-types';

interface CurrentMomentInterface {
	currentMoment: Moments | null;
	setCurrentMoment: (value: Moments | null) => void;
}

export const CurrentMomentContext = createContext<CurrentMomentInterface>({
	currentMoment: null,
	setCurrentMoment: () => null,
});
