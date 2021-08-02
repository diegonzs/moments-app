import { Caption, Subtitle } from 'components/typography';
import * as React from 'react';

interface MainCardProps {
	icon: string;
	total: number;
	description: string;
}

export const MainCard: React.FC<MainCardProps> = ({
	icon,
	total,
	description,
}) => {
	return (
		<div className="flex flex-col justify-between px-6 py-5 bg-background-nav rounded-2.5xl">
			<span className="mb-5 text-2xl">{icon}</span>
			<div>
				<Subtitle type="1" className="mb-1 text-primary leading-none">
					{total}
				</Subtitle>
				<Caption type="2" className="text-primary-60">
					{description}
				</Caption>
			</div>
		</div>
	);
};
