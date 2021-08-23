import { gql } from 'graphql-request';

export const GET_ALL_PROCESSES = gql`
	query GET_ALL_PROCESSES {
		processes {
			id
			title
			is_completed
			is_active
			moments_aggregate {
				aggregate {
					count
				}
			}
		}
	}
`;
