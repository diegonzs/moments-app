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
} from 'components/insightsv2';

const InsightsPage = () => {
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
					<TitleSection />
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
		</Layout>
	);
};

export default InsightsPage;
