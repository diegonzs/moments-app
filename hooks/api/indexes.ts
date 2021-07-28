import useSWR from 'swr';
import { fetcherGraph } from 'lib';
import { GET_ALL_INDEXES } from 'gql/queries';
import { useUser } from 'hooks/user/useUser';
import { Indexes } from 'types/schema-types';

export const useIndexes = () => {
	const user = useUser();
	const token = user?.token;

	const { data, error, mutate } = useSWR<{ indexes: Indexes[] }, string>(
		[GET_ALL_INDEXES, token],
		fetcherGraph
	);

	return {
		indexes: data?.indexes,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};
