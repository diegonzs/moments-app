import { gql } from 'graphql-request';
import { Moment } from 'interfaces';
import { fetcherGraph } from 'lib';
import { Moments } from 'types/schema-types';

export const UPDATE_FAVORITE_MOMENT = gql`
	mutation UPDATE_FAVORITE_MOMENT($id: uuid, $isFavorite: Boolean) {
		update_moments(
			where: { id: { _eq: $id } }
			_set: { is_favorite: $isFavorite }
		) {
			returning {
				id
			}
		}
	}
`;

interface CreateMomentVariables {
	id: string;
	isFavorite: boolean;
}

interface UpdateMomentInterface {
	token: string;
	variables: CreateMomentVariables;
}

export const updateFavoriteMoment = async ({
	token,
	variables,
}: UpdateMomentInterface): Promise<void> => {
	await fetcherGraph<Moment, CreateMomentVariables>(
		UPDATE_FAVORITE_MOMENT,
		token,
		variables
	);
};

export const updateSWRFavoriteMoment = (
	cacheMoments: Moments[],
	currentMoment: Moments
): Moments[] => {
	const updatedMoments = cacheMoments.map((elem) => {
		if (elem.id === currentMoment.id) {
			return {
				...currentMoment,
				is_favorite: !currentMoment.is_favorite,
			};
		}
		return elem;
	});
	return updatedMoments;
};
