import { gql } from 'graphql-request';

export const GET_ALL_PROCESSES = gql`
	query GET_ALL_PROCESSES {
		processes {
			id
			title
			moments_aggregate {
				aggregate {
					count
				}
			}
		}
	}
`;
