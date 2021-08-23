import { GraphQLClient } from 'graphql-request';

export const authFetcher = <T>(url: string, token?: string): Promise<T> =>
	fetcher<T>(url, token);

export const fetcher = <T>(
	url: string,
	_token?: string,
	options?: RequestInit
): Promise<T> => {
	return fetch(url, {
		...options,
		headers: {
			Accept: 'application/json',
			// Authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());
};

const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;

const client = new GraphQLClient(apiURL);

export const fetcherGraph = async <T, R>(
	query: string,
	token: string,
	variables: R | undefined
): Promise<T> => {
	console.log('running a query with varialbes:', variables);
	return client.request<T, R>(query, variables, {
		Authorization: `Bearer ${token}`,
	});
};
