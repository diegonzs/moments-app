import * as React from 'react';
import momentjs from 'moment';
import { Subtitle, Title } from 'components/typography';
import { Icon } from 'components/icon';
import { EmptyState } from 'components/empty-state';
import { NavBar } from 'components/nav-bar';
import { CardMemory, CardMemoryProps } from 'components/card-memory';
import { Layout } from 'components/layout/layout';
import Link from 'next/link';
import { useMemoriesByOffset } from 'hooks/api';
import { Loader } from 'components/loader';
import { t, Trans } from '@lingui/macro';
import { BookmarkIcon, DocumentDownloadIcon } from '@heroicons/react/outline';
import { SecondaryCard } from 'components/insightsv3';
// import { GetServerSideProps } from 'next';

const Memories: React.FC = () => {
	const [offset, setOffset] = React.useState(0);
	const [isAllview, setAllView] = React.useState(false);
	const [memoriesData, setMemoriesData] = React.useState<
		Record<string, CardMemoryProps>
	>({});
	const { moments, totalMoments, isError, isLoading } = useMemoriesByOffset(
		offset
	);

	const { memories, momentsInMemoriesCount } = React.useMemo(() => {
		const newMemories = Object.values(memoriesData);
		return {
			memories: newMemories,
			momentsInMemoriesCount: newMemories.reduce(
				(acum, current) => acum + current.momentsCount,
				0
			),
		};
	}, [memoriesData]);

	React.useEffect(() => {
		const data: Record<string, CardMemoryProps> = { ...memoriesData };
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
		setMemoriesData(data);
	}, [moments]);

	React.useEffect(() => {
		if (memories.length < 5 && momentsInMemoriesCount < totalMoments) {
			addMoreMemories();
		}
	}, [memories]);

	const addMoreMemories = () => {
		if (momentsInMemoriesCount < totalMoments) {
			setOffset((prev) => prev + 50);
		}
	};

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
					<Link href="memories/indexes">
						<div>
							<BookmarkIcon className="text-primary w-6 cursor-pointer" />
						</div>
					</Link>
				</div>
			</div>
			{isLoading && !memories.length && <Loader />}
			{moments && !moments?.length && !isError && (
				<EmptyState
					ilustration="/images/svgs/empty-state-memories.svg"
					darkIlustration="/images/svgs/dark/empty-state-memories-dark.svg"
					ilustrationSize="288"
					description={t`You don’t have any moment yet! Make moments to see them here later.`}
				/>
			)}
			{!!memories?.length && (
				<div className="flex flex-col mt-8 px-5">
					<div
						className="mb-4 cursor-pointer"
						onClick={() => setAllView((prev) => !prev)}
					>
						{!isAllview ? (
							<div className="flex w-full justify-end">
								<Subtitle type="2" className="text-secondary">
									<Trans>View All</Trans>
								</Subtitle>
							</div>
						) : (
							<div className="w-full flex justify-between">
								<Subtitle type="2" className="text-primary-60">
									<Trans>All Moments</Trans>
								</Subtitle>
								<Subtitle type="2" className="text-secondary">
									<Trans>View Per Day</Trans>
								</Subtitle>
							</div>
						)}
					</div>
					{isAllview ? (
						<AllViewMemories />
					) : (
						<ul className="grid gap-3 grid-cols-2 content-start mb-3">
							{memories.map((memory) => (
								<CardMemory key={memory.date} {...memory} />
							))}
							{momentsInMemoriesCount < totalMoments && (
								<LoadMoreCardMemory handleClick={addMoreMemories} />
							)}
							{isLoading && <Loader />}
						</ul>
					)}
				</div>
			)}
			<NavBar />
		</Layout>
	);
};

export const LoadMoreCardMemory: React.FC<{ handleClick: () => void }> = ({
	handleClick,
}) => {
	return (
		<div
			className="flex flex-col justify-between px-6 py-5 bg-primary-10 cursor-pointer border-4 border-dashed border-primary-20"
			style={{ borderRadius: 20 }}
			onClick={handleClick}
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

export const AllViewMemories: React.FC = () => {
	return (
		<div className="flex flex-col">
			{/* <Subtitle type="2" className="mb-4 text-primary-60">
				<Trans>Top moments</Trans>
			</Subtitle> */}
			<div className="grid gap-3">
				<SecondaryCard
					href={`/memories/all/weekly/${momentjs().week()}`}
					title="Best Weekly Moments"
					icon="✌️"
				/>
				<SecondaryCard
					href={`/memories/all/monthly/${momentjs().month()}`}
					title="Best Monthly Moments"
					icon="️💪"
				/>
				<SecondaryCard
					href={`/memories/all/yearly/${momentjs().year()}`}
					title="Best Yearly Moments"
					icon="️🙌"
				/>
			</div>
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
