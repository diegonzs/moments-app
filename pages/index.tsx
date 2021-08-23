import * as React from 'react';
import { useMoments, useMomentsByProcesses } from 'hooks/api';
import { NavBar } from 'components/nav-bar';
import moment from 'moment';
import clsx from 'clsx';
import { ListMoments } from 'components/list-moments';
import { HeadMoments } from 'components/head-moments';
import { EmptyState } from 'components/empty-state';
import { GetServerSideProps } from 'next';
import { Loader } from 'components/loader';
import {
	useActiveProcess,
	useBackgroundPage,
	useIsCreatingMoment,
} from 'hooks';
import { Trans } from '@lingui/macro';
import Link from 'next/link';
import { BookmarkIcon } from '@heroicons/react/outline';
import { Moments } from 'types/schema-types';

const Home: React.FC<{ hasSession: boolean; isAuth: boolean }> = ({
	hasSession = false,
	isAuth = false,
}) => {
	useBackgroundPage('bg-background');
	const { isCreatingMoment } = useIsCreatingMoment();
	const { activeProcess } = useActiveProcess();
	const { moments: todaysMoments, isLoading, isError, mutate } = useMoments({
		revalidateOnMount: false,
	});

	const { processes, isLoading: isLoadingProcesses } = useMomentsByProcesses();

	const moments = React.useMemo(() => {
		let selectedMoments: Moments[] = [];
		if (todaysMoments && activeProcess === 'normal-moments') {
			selectedMoments = todaysMoments;
		} else if (activeProcess !== 'normal-moments') {
			if (activeProcess === 'all') {
				selectedMoments =
					processes
						?.flatMap((process) => process.moments)
						.sort((a, b) => {
							const dateA = moment(a.created_at);
							const dateB = moment(b.created_at);
							return moment(dateA).diff(dateB);
						}) || [];
			} else {
				selectedMoments =
					processes?.find((process) => process.id === activeProcess)?.moments ||
					[];
			}
		}
		return selectedMoments;
	}, [todaysMoments, activeProcess]);

	React.useEffect(() => {
		if (!isCreatingMoment) {
			mutate();
		}
	}, [isCreatingMoment]);

	return (
		<div
			className={clsx(
				'relative flex flex-col flex-grow w-full h-full bg-background justify-between pb-24'
			)}
		>
			<HeadMoments
				leftContent={
					<Trans>
						How is your
						<br /> day going? ☀️
					</Trans>
				}
				rightContent={
					<div className="flex flex-col items-end">
						<Link href="/memories/indexes">
							<a className="cursor-pointer mb-4">
								<BookmarkIcon className="w-6" />
							</a>
						</Link>
						{moment().format('Do MMM')}
					</div>
				}
			/>
			{(isLoading ||
				isLoadingProcesses ||
				(hasSession && !isAuth && !moments)) && <Loader />}
			{!!moments && !isError && !moments.length && (
				<div className="flex-grow flex items-center">
					<EmptyState
						ilustration="/images/svgs/empty-state.svg"
						darkIlustration="/images/svgs/dark/empty-state-home-dark.svg"
						ilustrationSize="269"
						description={<Trans>Start journaling today’s moments</Trans>}
					/>
				</div>
			)}
			{!!moments && !!moments.length && <ListMoments moments={moments} />}
			<NavBar />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const isAuth = context.req.cookies?.auth;
	const hasSession = context.req.cookies?.hasSession;
	if (!isAuth && !hasSession) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {
			hasSession: !!hasSession,
			isAuth: !!isAuth,
		},
	};
};

export default Home;
