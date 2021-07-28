import { gql } from 'graphql-request';
import { Indexes } from 'types/schema-types';
import { fetcherGraph } from 'lib';

export const CREATE_INDEX = gql`
	mutation CREATE_INDEX($title: String) {
		insert_processes(objects: { title: $title }) {
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

export const createIndex = async ({ token, title }: TCreateIndexInput) => {
	await fetcherGraph<Indexes, { title: string }>(CREATE_INDEX, token, {
		title,
	});
};
