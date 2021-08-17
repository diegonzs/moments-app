import useSWR, { ConfigInterface } from 'swr';
import { Aggregate, Moment } from 'interfaces';
import { fetcherGraph } from 'lib';
import {
	GET_ALL_MEMORIES,
	GET_ALL_MOMENTS,
	GET_MOMENTS_BY_DATE,
	GET_MOMENTS_BY_TAG,
	GET_FAVORITE_MOMENTS,
	GET_MOMENTS_INSIGHTS,
	GET_INSIGHTS_MOMENTS,
} from 'gql/queries';
import { useUser } from 'hooks/user/useUser';
import moment from 'moment';
import { Moments, Tags } from 'types/schema-types';
import React from 'react';

export const useMoments = (config?: ConfigInterface) => {
	const user = useUser();
	const token = user?.token;

	const startOfDay = moment().startOf('day').format();

	const { data, error, mutate } = useSWR<{ moments: Moment[] }, string>(
		[GET_ALL_MOMENTS, token],
		(query, jwt) =>
			fetcherGraph<{ moments: Moment[] }, { createdAt: string }>(query, jwt, {
				createdAt: startOfDay,
			}),
		config
	);

	return {
		moments: data?.moments,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};

export const useMomentsByTag = (text: string) => {
	const user = useUser();
	const token = user?.token;

	const { data, error, mutate } = useSWR<
		{ moment_tag: { moment: Moment }[] },
		string
	>([GET_MOMENTS_BY_TAG, token, text], (query, jwt, text) =>
		fetcherGraph<{ moment_tag: { moment: Moment }[] }, { text: string }>(
			query,
			jwt,
			{
				text,
			}
		)
	);

	return {
		moments: data?.moment_tag.map((elem) => elem.moment),
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};

export const useMomentsFavorite = () => {
	const user = useUser();
	const token = user?.token;

	const { data, error, mutate } = useSWR<{ moments: Moment[] }, string>(
		[GET_FAVORITE_MOMENTS, token],
		(query, jwt) =>
			fetcherGraph<{ moments: Moment[] }, undefined>(query, jwt, undefined)
	);

	return {
		moments: data?.moments,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};

export const useMomentsByDate = (date: string) => {
	const user = useUser();
	const token = user?.token;

	const startOfDay = moment(date, ['MM-DD-YYYY', 'DD-MM-YYYY'])
		.startOf('day')
		.format();
	const endOfDay = moment(date, ['MM-DD-YYYY', 'DD-MM-YYYY'])
		.endOf('day')
		.format();
	console.log({ startOfDay, endOfDay, date });
	const { data, error, mutate } = useSWR<{ moments: Moment[] }, string>(
		[GET_MOMENTS_BY_DATE, token, startOfDay, endOfDay],
		(query, jwt, startOfDate, endOfDate) =>
			fetcherGraph<
				{ moments: Moment[] },
				{ startOfDate: string; endOfDate: string }
			>(query, jwt, {
				startOfDate,
				endOfDate,
			})
	);

	return {
		moments: data?.moments,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};

export const useMemories = () => {
	const user = useUser();
	const token = user?.token;

	const endDateOfYesterday = moment().subtract(1, 'days').endOf('day').format();

	const { data, error, mutate } = useSWR<{ moments: Moment[] }, string>(
		[GET_ALL_MEMORIES, token],
		(query, jwt) =>
			fetcherGraph<
				{ moments: Moment[] },
				{ startDate: string; endDate: string }
			>(query, jwt, {
				startDate: endDateOfYesterday,
				endDate: moment().subtract(30, 'days').startOf('day').format(),
			})
	);

	return {
		moments: data?.moments,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};

export const useInsigthMoments = () => {
	const user = useUser();
	const token = user?.token;

	const endDateOfToday = moment().endOf('day').format();

	const { data, error, mutate } = useSWR<
		{
			favorite_count: Aggregate;
			moments_count: Aggregate;
			all_moments: Aggregate;
		},
		string
	>([GET_MOMENTS_INSIGHTS, token], (query, jwt) =>
		fetcherGraph<
			{
				favorite_count: Aggregate;
				moments_count: Aggregate;
				all_moments: Aggregate;
			},
			{ startDate: string; endDate: string }
		>(query, jwt, {
			startDate: endDateOfToday,
			endDate: moment().subtract(7, 'days').startOf('day').format(),
		})
	);

	return {
		insights: data,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};

export const useMomentsByTimeAndPeriod = (time: string, period: string) => {
	const user = useUser();
	const token = user?.token;

	let startDate = '';
	let endDate = '';

	if (time === 'weekly') {
		startDate = moment().week(Number(period)).startOf('week').format();
		endDate = moment().week(Number(period)).endOf('week').format();
	} else if (time === 'monthly') {
		startDate = moment().month(Number(period)).startOf('month').format();
		endDate = moment().month(Number(period)).endOf('month').format();
	} else if (time === 'yearly') {
		startDate = moment().year(Number(period)).startOf('year').format();
		endDate = moment().year(Number(period)).endOf('year').format();
	}

	const { data, error, mutate } = useSWR<{ moments: Moment[] }, string>(
		[GET_MOMENTS_BY_DATE, token, startDate, endDate],
		(query, jwt, startOfDate, endOfDate) =>
			fetcherGraph<
				{ moments: Moment[] },
				{ startOfDate: string; endOfDate: string }
			>(query, jwt, {
				startOfDate,
				endOfDate,
			})
	);

	return {
		moments: data?.moments,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};

export const useMomentsByInsights = (time: string, period: string) => {
	const user = useUser();
	const token = user?.token;

	const { startDate, endDate } = React.useMemo(() => {
		let currentStartDate = '';
		let currentEndDate = '';
		if (time === 'last days') {
			if (period === '7 days') {
				currentEndDate = moment().endOf('day').format();
				currentStartDate = moment().endOf('day').subtract(7, 'days').format();
			} else if (period === '30 days') {
				currentEndDate = moment().endOf('day').format();
				currentStartDate = moment().endOf('day').subtract(30, 'days').format();
			}
		} else if (time === 'weekly') {
			currentStartDate = moment().week(Number(period)).startOf('week').format();
			currentEndDate = moment().week(Number(period)).endOf('week').format();
		} else if (time === 'monthly') {
			currentStartDate = moment()
				.month(Number(period))
				.startOf('month')
				.format();
			currentEndDate = moment().month(Number(period)).endOf('month').format();
		} else if (time === 'yearly') {
			currentStartDate = moment().year(Number(period)).startOf('year').format();
			currentEndDate = moment().year(Number(period)).endOf('year').format();
		}
		return {
			startDate: currentStartDate,
			endDate: currentEndDate,
		};
	}, [time, period]);

	const { data, error, mutate } = useSWR<
		{ moments: Moments[]; tags: Tags[] },
		string
	>([GET_INSIGHTS_MOMENTS, token, startDate, endDate], (query, jwt) =>
		fetcherGraph<
			{ moments: Moments[]; tags: Tags[] },
			{ startDate: string; endDate: string }
		>(query, jwt, {
			startDate,
			endDate,
		})
	);

	return {
		insights: data,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};
