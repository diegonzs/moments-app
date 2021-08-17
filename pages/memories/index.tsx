import * as React from 'react';
import momentjs from 'moment';
import { Subtitle, Title } from 'components/typography';
import { Icon } from 'components/icon';
import { EmptyState } from 'components/empty-state';
import { NavBar } from 'components/nav-bar';
import { CardMemory, CardMemoryProps } from 'components/card-memory';
import { Layout } from 'components/layout/layout';
import Link from 'next/link';
import { useMemories } from 'hooks/api';
import { Loader } from 'components/loader';
import { t, Trans } from '@lingui/macro';
import { DocumentDownloadIcon } from '@heroicons/react/outline';
// import { GetServerSideProps } from 'next';

const Memories: React.FC = () => {
	const { moments, isError, isLoading } = useMemories();

	const memories = React.useMemo(() => {
		const data: Record<string, CardMemoryProps> = {};
		if (moments) {
			moments.forEach((moment) => {
				const key = momentjs(moment.created_at).format('DD-MM-YYYY');
				if (key in data) {
					data[key] = {
						...data[key],
						momentsCount: data[key].momentsCount + 1,
						stars: moment.is_favorite ? data[key].stars + 1 : data[key].stars,
					};
				} else {
					data[key] = {
						isAgreatDay: false,
						stars: moment.is_favorite ? 1 : 0,
						momentsCount: 1,
						date: moment.created_at,
					};
				}
			});
		}
		return Object.values(data);
	}, [moments]);

	return (
		<Layout className="bg-background">
			<div className="flex justify-between mt-8 px-5">
				<Title type="2" className="text-primary">
					<Trans>Memories</Trans>
				</Title>
				<div className="grid gap-4 grid-flow-col items-center">
					<Link href="memories/hashtags">
						<div>
							<Icon
								src="/images/icons/tag.svg"
								pointer
								className="text-primary"
							/>
						</div>
					</Link>
					<Link href="memories/favorite">
						<div>
							<Icon
								src="/images/icons/star.svg"
								pointer
								className="text-primary"
							/>
						</div>
					</Link>
				</div>
			</div>
			{isLoading && <Loader />}
			{moments && !moments?.length && !isError && (
				<EmptyState
					ilustration="/images/svgs/empty-state-memories.svg"
					darkIlustration="/images/svgs/dark/empty-state-memories-dark.svg"
					ilustrationSize="288"
					description={t`You don’t have any moment yet! Make moments to see them here later.`}
				/>
			)}
			{!!memories?.length && (
				<ul className="grid gap-3 grid-cols-2 content-start mt-8 mb-3 px-5">
					{memories.map((memory) => (
						<CardMemory key={memory.date} {...memory} />
					))}
					<LoadMoreCardMemory />
				</ul>
			)}
			<NavBar />
		</Layout>
	);
};

export const LoadMoreCardMemory = () => {
	return (
		<div
			className="flex flex-col justify-between px-6 py-5 bg-primary-10 cursor-pointer border-4 border-dashed border-primary-20"
			style={{ borderRadius: 20 }}
		>
			<DocumentDownloadIcon className="w-6 mb-4" />
			<Subtitle type="1">
				<Trans>
					Load More <br /> Memories
				</Trans>
			</Subtitle>
		</div>
	);
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const isAuth = context.req.cookies?.auth;

// 	if (!isAuth) {
// 		return {
// 			redirect: {
// 				destination: '/auth',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {},
// 	};
// };

export default Memories;
