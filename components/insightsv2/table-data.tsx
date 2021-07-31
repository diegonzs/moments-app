import * as React from 'react';
import { Caption, Subtitle } from 'components/typography';
import { Trans } from '@lingui/macro';

interface TableDataProps {
	total: number;
	words: number;
	images: number;
}

export const TableData: React.FC<TableDataProps> = ({
	total,
	words,
	images,
}) => {
	return (
		<div className="flex flex-col mx-5 mt-8">
			<div className="flex justify-between items-center mb-4">
				<Subtitle type="2" className="text-primary-60">
					<Trans>Tracked moments</Trans>
				</Subtitle>
				<Subtitle type="3">Last 7 days</Subtitle>
			</div>
			<div className="bg-background-nav py-4 px-5 grid grid-cols-3 gap-4">
				<InfoContent title="Moments" value={`${total}`} />
				<InfoContent title="hashtags" value="6" />
				<InfoContent title="Words" value={`${words}`} />
				<InfoContent title="Images" value={`${images}`} />
			</div>
		</div>
	);
};

const InfoContent: React.FC<{ title: string; value: string }> = ({
	title,
	value,
}) => {
	return (
		<div className="flex flex-col w-full">
			<Caption type="2" className="mb-1 text-primary-40">
				{title}
			</Caption>
			<Subtitle type="1">{value}</Subtitle>
		</div>
	);
};
