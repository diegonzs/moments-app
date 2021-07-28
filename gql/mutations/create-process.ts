import { gql } from 'graphql-request';
import { Processes } from 'types/schema-types';
import { fetcherGraph } from 'lib';

export const CREATE_PROCESS = gql`
	mutation CREATE_PROCESS($title: String) {
		insert_processes(objects: { title: $title }) {
			returning {
				id
				title
			}
		}
	}
`;

interface TCreateProcessInput {
	token: string;
	title: string;
}

export const createProcess = async ({ token, title }: TCreateProcessInput) => {
	await fetcherGraph<Processes, { title: string }>(CREATE_PROCESS, token, {
		title,
	});
};
