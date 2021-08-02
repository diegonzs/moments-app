import { Subtitle } from 'components/typography';
import Link from 'next/link';
import * as React from 'react';

interface SecondaryCardProps {
	title: string;
	icon: string;
	href: string;
}

export const SecondaryCard: React.FC<SecondaryCardProps> = ({
	href,
	icon,
	title,
}) => {
	return (
		<Link href={href}>
			<div className="flex items-center px-6 h-16 bg-background-nav rounded-2.5xl cursor-pointer">
				<span className="mr-5 text-2xl">{icon}</span>
				<Subtitle type="2" className="text-primary">
					{title}
				</Subtitle>
			</div>
		</Link>
	);
};
