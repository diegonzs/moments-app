import { gql } from 'graphql-request';
import { Processes_Mutation_Response } from 'types/schema-types';
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

interface TCreateResponse {
	insert_processes: Processes_Mutation_Response;
}

export const createProcess = async ({ token, title }: TCreateProcessInput) => {
	const data = await fetcherGraph<TCreateResponse, { title: string }>(
		CREATE_PROCESS,
		token,
		{
			title,
		}
	);
	return {
		id: data.insert_processes.returning[0].id,
		title: data.insert_processes.returning[0].title,
	};
};
