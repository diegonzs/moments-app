import { gql } from 'graphql-request';
import { Indexes_Mutation_Response } from 'types/schema-types';
import { fetcherGraph } from 'lib';

export const CREATE_INDEX = gql`
	mutation CREATE_INDEX($title: String) {
		insert_indexes(objects: { title: $title }) {
			returning {
				id
				title
			}
		}
	}
`;

interface TCreateIndexInput {
	token: string;
	title: string;
}

interface TCreateIndexResponse {
	insert_indexes: Indexes_Mutation_Response;
}

export const createIndex = async ({ token, title }: TCreateIndexInput) => {
	const data = await fetcherGraph<TCreateIndexResponse, { title: string }>(
		CREATE_INDEX,
		token,
		{
			title,
		}
	);
	return {
		id: data.insert_indexes.returning[0].id,
		title: data.insert_indexes.returning[0].title,
	};
};
