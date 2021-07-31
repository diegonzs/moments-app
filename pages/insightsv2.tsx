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

	const images = React.useMemo(() => {
		if (insights && insights.moments.length) {
			return insights.moments.reduce((acum, current) => {
				if (current.images) {
					return acum + current.images.length;
				}
				return acum;
			}, 0);
		}
		return 0;
	}, [insights]);

	return (
		<Layout className="bg-background">
			{isLoading && insights ? (
				<Loader />
			) : (
				<div>
					<TitleSection />
					<TableData
						total={insights?.moments.length || 0}
						images={images}
						words={words}
					/>
					<Graph />
					<Information />
				</div>
			)}
			<NavBar />
		</Layout>
	);
};

export default InsightsPage;
