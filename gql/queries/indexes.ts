import { gql } from 'graphql-request';

export const GET_ALL_INDEXES = gql`
	query GET_ALL_INDEXES {
		indexes {
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
