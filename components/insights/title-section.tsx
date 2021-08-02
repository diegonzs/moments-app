import * as React from 'react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Title } from 'components/typography';

export const TitleSection: React.FC = () => {
	return (
		<div className="flex justify-between mt-8 px-5 items-center">
			<Title type="2" className="text-primary">
				<Trans>Insights</Trans>
			</Title>
			<div className="cursor-pointer">
				<DotsVerticalIcon className="w-6" />
			</div>
		</div>
	);
};
