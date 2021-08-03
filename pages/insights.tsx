import * as React from 'react';
import { Layout } from 'components/layout';
import { NavBar } from 'components/nav-bar';
import { Loader } from 'components/loader';
// hooks
import { useMomentsByInsights } from 'hooks/api';
// Page components
import {
	Graph,
	Information,
	TableData,
	TitleSection,
} from 'components/insights';
import { BottomSheet } from 'components/bottom-sheet';
import { BodyText, Subtitle, Title } from 'components/typography';
import { Trans } from '@lingui/macro';
import { ChevronDownIcon } from '@heroicons/react/outline';

const InsightsPage = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const { insights, isLoading } = useMomentsByInsights();

	const words = React.useMemo(() => {
		if (insights && insights.moments.length) {
			return insights.moments.reduce((acum, current) => {
				return acum + current.content.split(' ').length;
			}, 0);
		}
		return 0;
	}, [insights]);

	const tags = React.useMemo(() => {
		const value: string[] = [];
		if (insights?.tags) {
			insights.tags.forEach((elem) => {
				if (!value.includes(elem.text)) {
					value.push(elem.text);
				}
			});
		}
		return value;
	}, [insights]);

	const { images, audios, videos } = React.useMemo(() => {
		const value = { images: 0, audios: 0, videos: 0 };
		if (insights && insights.moments.length) {
			insights.moments.forEach((elem) => {
				if (elem.images?.length) {
					value.images = value.images + elem.images.length;
				}
				if (elem.videos?.length) {
					value.videos = value.videos + elem.videos.length;
				}
				if (elem.note_voices) {
					value.audios = value.audios + elem.note_voices;
				}
			});
		}
		return value;
	}, [insights]);

	return (
		<Layout className="bg-background">
			{isLoading || !insights ? (
				<Loader />
			) : (
				<div>
					<TitleSection onClickMenu={() => setIsMenuOpen(true)} />
					<TableData
						total={insights?.moments.length || 0}
						images={images}
						words={words}
						audios={audios}
						videos={videos}
						tags={tags.length}
					/>
					<Graph moments={insights.moments} />
					<Information tags={tags} moments={insights?.moments.length || 0} />
				</div>
			)}
			<NavBar />
			<BottomSheet
				shouldOpen={isMenuOpen}
				onCloseCallback={() => setIsMenuOpen(false)}
				allowTop={false}
			>
				{() => (
					<div className="flex flex-col px-5 py-12">
						<Title type="2" className="text-primary text-left mb-6">
							<Trans>Date</Trans>
						</Title>
						<div className="grid gap-4">
							<Dropdown />
							<Dropdown />
						</div>
					</div>
				)}
			</BottomSheet>
		</Layout>
	);
};

const Dropdown = () => {
	return (
		<div className="flex justify-between items-center bg-background-input h-16 px-6 rounded-2xl cursor-pointer">
			<div className="flex flex-col">
				<Subtitle type="2" className="text-primary-40 text-left">
					Type
				</Subtitle>
				<BodyText type="3" className="text-primary text-left">
					Last Days
				</BodyText>
			</div>
			<ChevronDownIcon className="w-6" />
		</div>
	);
};

export default InsightsPage;
