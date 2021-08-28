import { gql } from 'graphql-request';
import { Processes } from 'types/schema-types';
import { fetcherGraph } from 'lib';

export const TOGGLE_ACTIVE_PROCESS = gql`
	mutation TOGGLE_ACTIVE_PROCESS($id: uuid!, $activeStatus: Boolean) {
		update_processes_by_pk(
			pk_columns: { id: $id }
			_set: { is_active: $activeStatus }
		) {
			id
			is_active
		}
	}
`;

interface TToggleActiveProcessInput {
	token: string;
	id: string;
	activeStatus: boolean;
}

interface TToggleActiveProcessResponse {
	update_processes_by_pk: Processes;
}

export const toggleActiveProcess = async ({
	token,
	id,
	activeStatus,
}: TToggleActiveProcessInput) => {
	const data = await fetcherGraph<
		TToggleActiveProcessResponse,
		{ id: string; activeStatus: boolean }
	>(TOGGLE_ACTIVE_PROCESS, token, {
		id,
		activeStatus,
	});
	return {
		updatedProcess: data.update_processes_by_pk,
	};
};
