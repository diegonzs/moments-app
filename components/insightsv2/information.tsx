import * as React from 'react';
import { Trans } from '@lingui/macro';
import { Caption, Subtitle } from 'components/typography';

interface InformationProps {
	moments: number;
	tags: string[];
}

export const Information: React.FC<InformationProps> = ({ moments, tags }) => {
	return (
		<div className="flex flex-col mx-5 mt-6">
			<div className="grid grid-flow-col gap-14 w-max">
				<div className="flex flex-col">
					<Caption type="3" className="mb-2 text-primary-40">
						<Trans>
							Total
							<br />
							Moments
						</Trans>
					</Caption>
					<Subtitle type="1">{moments}</Subtitle>
				</div>
				<div className="flex flex-col">
					<Caption type="3" className="mb-2 text-primary-40">
						<Trans>
							Most used type
							<br />
							of emotions
						</Trans>
					</Caption>
					<Subtitle type="1">😏</Subtitle>
				</div>
			</div>
			<div className="mt-6 flex flex-col">
				<Subtitle type="1" className="mb-4 text-primary-60">
					<Trans>Most used hastags</Trans>
				</Subtitle>
				<ul className="grid gap-3">
					{tags.map((elem, index) => (
						<li key={elem}>
							<Subtitle type="1" className="text-primary">
								{index + 1}. #{elem}
							</Subtitle>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
