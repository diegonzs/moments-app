import * as React from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Title } from 'components/typography';
import { Layout } from 'components/layout/layout';
import { HeadMoments } from 'components/head-moments';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { ListMoments } from 'components/list-moments';
import { useMomentsByTimeAndPeriod } from 'hooks/api';
import { Loader } from 'components/loader';
import { EmptyState } from 'components/empty-state';
import { Trans } from '@lingui/macro';

const getHumanPeriod = (time: string, period: string) => {
	if (time === 'weekly') {
		const start = moment().week(Number(period)).startOf('week');
		const end = moment().week(Number(period)).endOf('week');
		const monthStart = moment(start).format('MMM');
		const monthEnd = moment(end).format('MMM');
		const isSameMonth = monthStart === monthEnd;
		return `${moment(start).format('ddd D')} ${
			isSameMonth ? '' : monthStart
		} - ${moment(end).format('ddd D')} ${monthEnd}.`;
	} else if (time === 'monthly') {
		const month = moment().month(Number(period));
		return `${moment(month).format('MMMM')}`;
	} else if (time === 'yearly') {
		return period;
	}
};

const InsightByPeriod = () => {
	const router = useRouter();
	const { time, period } = router.query;
	const { moments, isError, isLoading } = useMomentsByTimeAndPeriod(
		time as string,
		period as string
	);

	const humanPeriod = React.useMemo(() => {
		return getHumanPeriod(time as string, period as string);
	}, [time, period]);

	const periodOptions = React.useMemo(() => {
		if (time === 'weekly') {
			const data = [];
			const lastWeek = moment().week();
			let i = 0;
			while (i <= lastWeek) {
				data.push(JSON.stringify([time, String(i)]));
				i++;
			}
			return data;
		} else if (time === 'monthly') {
			const data = [];
			const lastMonth = moment().month();
			let i = 0;
			while (i <= lastMonth) {
				data.push(JSON.stringify([time, String(i)]));
				i++;
			}
			return data;
		} else if (time === 'yearly') {
			return [JSON.stringify([time, '2021'])];
		}
		return [];
	}, [time, period]);

	const onChangePeriod = (value: string) => {
		const parseValue = JSON.parse(value);
		router.push(`/insights/${parseValue[0]}/${parseValue[1]}`);
	};

	return (
		<Layout className="bg-background" withNavBar={false}>
			<HeadMoments
				leftContent={
					<div className="flex items-center">
						<Link href="/insights">
							<div className="cursor-pointer">
								<Icon src="/images/icons/back-arrow.svg" />
							</div>
						</Link>
						<Title type="2" className="ml-4 capitalize">
							{time}
						</Title>
					</div>
				}
				rightContent={
					<>
						<label
							className="relative flex items-center cursor-pointer"
							htmlFor="period-select"
						>
							<span className="text-secondary">{humanPeriod}</span>
							<div className="ml-3 transform rotate-90">
								<Icon
									src="/images/icons/forward.svg"
									className="text-secondary"
								/>
							</div>
							<select
								name="period-select"
								id="period-select"
								className="absolute w-full opacity-0 appearance-none cursor-pointer"
								value={JSON.stringify([time, period])}
								onChange={(e) => onChangePeriod(e.target.value)}
							>
								{periodOptions.map((elem) => (
									<option value={elem} key={elem}>
										{getHumanPeriod(JSON.parse(elem)[0], JSON.parse(elem)[1])}
									</option>
								))}
							</select>
						</label>
					</>
				}
			/>
			{isLoading && <Loader />}
			{!!moments && !isError && !moments.length && (
				<EmptyState
					ilustration="/images/svgs/empty-state-insights-time.svg"
					darkIlustration="/images/svgs/dark/empty-state-insights-time-dark.svg"
					ilustrationSize="285"
					description={
						<Trans>
							Start journaling today’s moments to see your best moments here
						</Trans>
					}
				/>
			)}
			{moments && !isError && !!moments.length && (
				<ListMoments moments={moments} />
			)}
		</Layout>
	);
};

export default InsightByPeriod;
