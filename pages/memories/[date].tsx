import { HeadMoments } from 'components/head-moments';
import { Icon } from 'components/icon';
import { Layout } from 'components/layout/layout';
import { Title } from 'components/typography';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ListMoments } from 'components/list-moments';
import { useMomentsByDate } from 'hooks/api';
import { Loader } from 'components/loader';
import { Trans } from '@lingui/macro';

const MemoriesByDate: React.FC = () => {
	const router = useRouter();
	const { date } = router.query;
	const { moments, isLoading } = useMomentsByDate(date as string);
	React.useEffect(() => {
		console.log(date);
	}, [date]);
	return (
		<Layout className="bg-background" withNavBar={false}>
			<HeadMoments
				leftContent={
					<div className="flex items-center">
						<Link href="/memories">
							<div className="cursor-pointer">
								<Icon src="/images/icons/back-arrow.svg" />
							</div>
						</Link>
						<Title type="2" className="ml-4">
							<Trans>Memory</Trans>
						</Title>
					</div>
				}
				rightContent={moment(date, ['MM-DD-YYYY', 'DD-MM-YYYY']).format(
					'Do MMM'
				)}
			/>
			{isLoading && <Loader />}
			{moments && !!moments.length && <ListMoments moments={moments} />}
		</Layout>
	);
};

export default MemoriesByDate;
