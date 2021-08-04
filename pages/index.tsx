import * as React from 'react';
import { useMoments } from 'hooks/api';
import { NavBar } from 'components/nav-bar';
import moment from 'moment';
import clsx from 'clsx';
import { ListMoments } from 'components/list-moments';
import { HeadMoments } from 'components/head-moments';
import { EmptyState } from 'components/empty-state';
import { GetServerSideProps } from 'next';
import { Loader } from 'components/loader';
import { useBackgroundPage, useIsCreatingMoment } from 'hooks';
import { Trans } from '@lingui/macro';

const Home: React.FC<{ hasSession: boolean; isAuth: boolean }> = ({
	hasSession = false,
	isAuth = false,
}) => {
	useBackgroundPage('bg-background');
	const { isCreatingMoment } = useIsCreatingMoment();
	const { moments, isLoading, isError, mutate } = useMoments({
		revalidateOnMount: false,
	});

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
				rightContent={moment().format('Do MMM')}
			/>
			{(isLoading || (hasSession && !isAuth && !moments)) && <Loader />}
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
