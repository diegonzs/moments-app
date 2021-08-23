import { createContext } from 'react';

interface ActiveprocessInterface {
	activeProcess: string | null;
	setActiveProcess: (value: string) => void;
}

export const ActiveProcessContext = createContext<ActiveprocessInterface>({
	activeProcess: null,
	setActiveProcess: () => null,
});
