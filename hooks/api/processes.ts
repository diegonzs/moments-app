import useSWR from 'swr';
import { fetcherGraph } from 'lib';
import { GET_ALL_PROCESSES } from 'gql/queries';
import { useUser } from 'hooks/user/useUser';
import { Processes } from 'types/schema-types';

export const useProcesses = () => {
	const user = useUser();
	const token = user?.token;

	const { data, error, mutate } = useSWR<{ processes: Processes[] }, string>(
		[GET_ALL_PROCESSES, token],
		fetcherGraph
	);

	return {
		processes: data?.processes,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};
