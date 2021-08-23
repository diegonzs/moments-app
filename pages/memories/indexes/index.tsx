import * as React from 'react';
import Link from 'next/link';
import { t, Trans } from '@lingui/macro';
import { EmptyState } from 'components/empty-state';
import { Icon } from 'components/icon';
import { Layout } from 'components/layout/layout';
import { Loader } from 'components/loader';
import { Subtitle, Title } from 'components/typography';
import { useIndexes } from 'hooks/api';

const HashtagElem: React.FC<{
	content: string;
	moments: number;
	id: string;
}> = ({ id, content, moments }) => {
	return (
		<Link href={`/memories/indexes/${id}`}>
			<li className="flex items-center justify-between bg-background-nav w-full cursor-pointer p-6 rounded-2.5xl">
				<Subtitle type="2" className="text-primary">
					<span className="capitalize">{content}</span>
				</Subtitle>
				<Subtitle type="3" className="text-primary-60">
					{moments} <Trans>Moments</Trans>
				</Subtitle>
			</li>
		</Link>
	);
};

const IndexesPage: React.FC = () => {
	const { indexes, isError, isLoading } = useIndexes();

	return (
		<Layout className="bg-background">
			<div className="flex items-center mt-8 px-5">
				<Link href="/memories">
					<div className="cursor-pointer">
						<Icon src="/images/icons/close.svg" className="text-primary" />
					</div>
				</Link>
				<Title type="2" className="ml-4 text-primary">
					<Trans>Index</Trans>
				</Title>
			</div>
			{isLoading && <Loader />}
			{!!indexes && !isError && !indexes.length && (
				<EmptyState
					ilustration="/images/svgs/empty-state-hashtags.svg"
					darkIlustration="/images/svgs/empty-state-hashtags.svg"
					ilustrationSize="226"
					description={t`Use the index to highlight important moments in your life.`}
				/>
			)}
			{!!indexes && !!indexes.length && (
				<ul className="grid gap-3 content-start mt-10 px-5 w-full">
					{indexes.map((elem) => (
						<HashtagElem
							key={elem.id}
							id={elem.id}
							content={elem.title}
							moments={elem.moments_aggregate?.aggregate?.count || 0}
						/>
					))}
				</ul>
			)}
		</Layout>
	);
};

export default IndexesPage;
