import { GET_ALL_MOMENTS } from 'gql/queries';
import { gql } from 'graphql-request';
import { Moment } from 'interfaces';
import { fetcherGraph } from 'lib';
import { mutate } from 'swr';
import { Moments } from 'types/schema-types';
import { v4 as uuidv4 } from 'uuid';

export const CREATE_MOMENT = gql`
	mutation CREATE_MOMENT(
		$content: String
		$isThanks: Boolean
		$isFavorite: Boolean
		$emotion: String
		$images: _text
		$videos: _text
		$note_voices: _text
		$tags: [moment_tag_insert_input!]! = []
		$indexId: uuid
		$processId: uuid
	) {
		insert_moments(
			objects: {
				content: $content
				is_thanks: $isThanks
				is_favorite: $isFavorite
				emotion: $emotion
				images: $images
				videos: $videos
				note_voices: $note_voices
				moment_tags: { data: $tags }
				index_id: $indexId
				process_id: $processId
			}
		) {
			returning {
				id
				created_at
			}
		}
	}
`;

export interface CreateMomentVariables {
	content: string;
	isThanks: boolean;
	isFavorite: boolean;
	emotion: string | null;
	tags: { tag_id: string }[];
	images: string | null;
	videos: string | null;
	note_voices: string | null;
	processId: string | null;
	indexId: string | null;
}

interface CreateMomentInterface {
	token: string;
	variables: CreateMomentVariables;
}

export const createMoment = async ({
	token,
	variables,
}: CreateMomentInterface): Promise<void> => {
	await fetcherGraph<Moment, CreateMomentVariables>(
		CREATE_MOMENT,
		token,
		variables
	);
	mutate(GET_ALL_MOMENTS);
};

export const createSRWMoment = (
	cacheMoments: Moments[],
	newMoment: Moments
): Moments[] => {
	const newMoments = [
		...cacheMoments,
		{ ...newMoment, id: uuidv4().toString() },
	];
	return newMoments;
};
