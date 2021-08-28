import * as React from 'react';
import { HeadMoments } from 'components/head-moments';
import { Icon } from 'components/icon';
import { Layout } from 'components/layout/layout';
import { Title } from 'components/typography';
import { useRouter } from 'next/router';
import { ListMoments } from 'components/list-moments';
import { useMomentsByIndex } from 'hooks/api';
import { EmptyState } from 'components/empty-state';
import { Loader } from 'components/loader';
import { t } from '@lingui/macro';

const MemoriesByIndex: React.FC = () => {
	const router = useRouter();
	const { moments, indexTitle, isLoading, isError } = useMomentsByIndex(
		router.query.slug ? (router.query.slug as string) : ''
	);

	return (
		<Layout className="bg-background" withNavBar={false}>
			<HeadMoments
				leftContent={
					<div className="flex items-center">
						<div onClick={() => router.back()}>
							<div className="cursor-pointer">
								<Icon src="/images/icons/back-arrow.svg" />
							</div>
						</div>
						<Title type="2" className="ml-4">
							{indexTitle}
						</Title>
					</div>
				}
				rightContent={null}
			/>
			{isLoading && <Loader />}
			{moments && !isError && !moments.length && (
				<EmptyState
					ilustration="/images/svgs/empty-state-rocket.svg"
					darkIlustration="/images/svgs/dark/empty-state-rocket-dark.svg"
					ilustrationSize="218"
					description={t`Start saving moments with this index to see them here.`}
				/>
			)}
			{moments && !!moments.length && <ListMoments moments={moments} />}
		</Layout>
	);
};

export default MemoriesByIndex;
