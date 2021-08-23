export type CardMemoryProps = {
	isAgreatDay: boolean;
	stars: number;
	date: string;
	momentsCount: number;
};

export type TMemories = Record<string, CardMemoryProps>;

export interface TMemoriesPageContext {
	memories: TMemories;
	offset: number;
	updateMemoriesPage: (value: { memories: TMemories; offset: number }) => void;
}
