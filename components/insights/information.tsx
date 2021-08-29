import * as React from 'react';
import { Trans } from '@lingui/macro';
import { Caption, Subtitle } from 'components/typography';
import Link from 'next/link';

interface InformationProps {
	moments: number;
	tags: { title: string; count: number }[];
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
							Most recurrent
							<br />
							mood
						</Trans>
					</Caption>
					<Subtitle type="1">😏</Subtitle>
				</div>
			</div>
			<div className="mt-6 flex flex-col">
				<Subtitle type="1" className="mb-4 text-primary-60">
					<Trans>Most used hashtags</Trans>
				</Subtitle>
				<ul className="grid gap-3">
					{tags
						.sort((a, b) => a.count + b.count)
						.slice(0, 5)
						.map((elem, index) => (
							<li
								className="flex justify-between items-center"
								key={elem.title}
							>
								<Link href={`/memories/hashtags/${elem}`}>
									<Subtitle type="1" className="text-primary cursor-pointer">
										{index + 1}. #{elem.title}
									</Subtitle>
								</Link>
								<Link href={`/memories/hashtags/${elem}`} key={elem.title}>
									<Subtitle type="3" className="text-primary cursor-pointer">
										{elem.count} <Trans>moments</Trans>
									</Subtitle>
								</Link>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};
