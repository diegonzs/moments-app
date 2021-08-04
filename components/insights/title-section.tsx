import * as React from 'react';
import clsx from 'clsx';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Title } from 'components/typography';

export const TitleSection: React.FC<{ onClickMenu: () => void }> = ({
	onClickMenu,
}) => {
	return (
		<div className={clsx('flex justify-between mt-8 px-5 items-center')}>
			<Title type="2" className="text-primary">
				<Trans>Insights</Trans>
			</Title>
			<div className="cursor-pointer" onClick={onClickMenu}>
				<DotsVerticalIcon className="w-6" />
			</div>
		</div>
	);
};
