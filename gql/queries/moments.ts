import { gql } from 'graphql-request';

export const GET_ALL_MOMENTS = gql`
	query GET_ALL_MOMENTS($createdAt: timestamptz) {
		moments(
			order_by: { created_at: asc }
			where: { created_at: { _gt: $createdAt } }
		) {
			id
			content
			created_at
			images
			is_thanks
			is_favorite
			emotion
			note_voices
			videos
		}
	}
`;
export const GET_FAVORITE_MOMENTS = gql`
	query GET_FAVORITE_MOMENTS {
		moments(
			order_by: { created_at: asc }
			where: { is_favorite: { _eq: true } }
		) {
			id
			content
			created_at
			images
			is_thanks
			is_favorite
			emotion
			note_voices
			videos
		}
	}
`;
export const GET_MOMENTS_BY_DATE = gql`
	query GET_MOMENTS_BY_DATE(
		$startOfDate: timestamptz
		$endOfDate: timestamptz
	) {
		moments(
			order_by: { created_at: asc }
			where: { created_at: { _gt: $startOfDate, _lt: $endOfDate } }
		) {
			id
			content
			created_at
			images
			is_thanks
			is_favorite
			emotion
			note_voices
			videos
		}
	}
`;

export const GET_ALL_MEMORIES = gql`
	query GET_ALL_MEMORIES($startDate: timestamptz, $endDate: timestamptz) {
		moments(
			where: { created_at: { _gte: $endDate, _lte: $startDate } }
			order_by: { created_at: desc }
		) {
			created_at
			is_favorite
			content
		}
	}
`;

export const GET_MEMORIES_BY_OFFSET = gql`
	query GET_MEMORIES_BY_OFFSET($offset: Int) {
		moments(offset: $offset, limit: 50, order_by: { created_at: desc }) {
			created_at
			is_favorite
		}
		moments_aggregate {
			aggregate {
				count
			}
		}
	}
`;

export const GET_MOMENTS_BY_TAG = gql`
	query GET_MOMENTS_BY_TAG($text: String) {
		moment_tag(where: { tag: { text: { _eq: $text } } }) {
			moment {
				id
				content
				created_at
				images
				is_thanks
				is_favorite
				emotion
				note_voices
				videos
			}
		}
	}
`;

export const GET_MOMENTS_INSIGHTS = gql`
	query GET_MOMENTS_INSIGHTS($startDate: timestamptz, $endDate: timestamptz) {
		favorite_count: moments_aggregate(
			where: {
				is_favorite: { _eq: true }
				created_at: { _gt: $endDate, _lt: $startDate }
			}
		) {
			aggregate {
				count
			}
		}
		moments_count: moments_aggregate(
			where: { created_at: { _gt: $endDate, _lt: $startDate } }
		) {
			aggregate {
				count
			}
		}
		all_moments: moments_aggregate {
			aggregate {
				count
			}
		}
	}
`;

export const GET_INSIGHTS_MOMENTS = gql`
	query GET_INSIGHTS_MOMENTS($startDate: timestamptz, $endDate: timestamptz) {
		moments(
			order_by: { created_at: desc }
			where: { created_at: { _gt: $startDate, _lt: $endDate } }
		) {
			id
			content
			images
			videos
			note_voices
			created_at
		}
		tags(
			where: {
				tag_moments: {
					moment: { created_at: { _gt: $startDate, _lt: $endDate } }
				}
			}
		) {
			text
		}
	}
`;

export const GET_MOMENTS_BY_INDEX = gql`
	query GET_MOMENTS_BY_INDEX($indexId: uuid!) {
		indexes_by_pk(id: $indexId) {
			title
			moments {
				id
				content
				created_at
				images
				is_thanks
				is_favorite
				emotion
				note_voices
				videos
			}
		}
	}
`;

export const GET_MOMENTS_PROCESSES = gql`
	query GET_MOMENTS_PROCESSES {
		processes {
			title
			is_active
			is_completed
			id
			moments(order_by: { created_at: asc }) {
				id
				content
				created_at
				images
				is_thanks
				is_favorite
				emotion
				note_voices
				videos
			}
		}
	}
`;
