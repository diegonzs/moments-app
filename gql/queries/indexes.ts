import { gql } from 'graphql-request';

export const GET_ALL_INDEXES = gql`
	query GET_ALL_INDEXES {
		indexes {
			id
			title
			moment_indexes_aggregate {
				aggregate {
					count
				}
			}
		}
	}
`;
