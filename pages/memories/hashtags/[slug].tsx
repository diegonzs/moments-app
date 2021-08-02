import * as React from 'react';
import { HeadMoments } from 'components/head-moments';
import { Icon } from 'components/icon';
import { Layout } from 'components/layout/layout';
import { Title } from 'components/typography';
import { useRouter } from 'next/router';
import { ListMoments } from 'components/list-moments';
import { useMomentsByTag } from 'hooks/api';
import { EmptyState } from 'components/empty-state';
import { Loader } from 'components/loader';
import { t, Trans } from '@lingui/macro';

const MemoriesByHashtag: React.FC = () => {
	const router = useRouter();
	const { slug } = router.query;
	const { moments, isError, isLoading } = useMomentsByTag(slug as string);

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
							<Trans>Memories</Trans>
						</Title>
					</div>
				}
				rightContent={`${moments?.length || 0} #${slug}`}
			/>
			{isLoading && <Loader />}
			{moments && !isError && !moments.length && (
				<EmptyState
					ilustration="/images/svgs/empty-state-rocket.svg"
					darkIlustration="/images/svgs/dark/empty-state-rocket-dark.svg"
					ilustrationSize="218"
					description={t`Start saving moments with this hashtag to see them here.`}
				/>
			)}
			{moments && !!moments.length && <ListMoments moments={moments} />}
		</Layout>
	);
};

export default MemoriesByHashtag;
