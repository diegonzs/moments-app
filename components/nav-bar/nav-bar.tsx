import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Caption } from 'components/typography';
import { Trans } from '@lingui/macro';

const NavigateIcon: React.FC<{
	route: string;
	icon: string;
	label: string;
	selectedRoute: string;
}> = ({ route, icon, selectedRoute, label }) => {
	return (
		<Link href={route === 'home' ? '/' : `/${route}`}>
			<div className="z-20 cursor-pointer flex flex-col items-center">
				<Icon
					src={`/images/icons/${icon}.svg`}
					width="24"
					height="24"
					className={clsx(
						{ 'text-secondary': route === selectedRoute },
						{ 'text-primary': route !== selectedRoute }
					)}
				/>
				<Caption
					type="2"
					className={clsx(
						'mt-1',
						route === selectedRoute ? 'text-secondary' : 'text-primary'
					)}
				>
					{label}
				</Caption>
			</div>
		</Link>
	);
};

const selectRoute = (
	pathname: string
): 'memories' | 'insights' | 'settings' | 'home' => {
	if (pathname.includes('memories')) {
		return 'memories';
	} else if (pathname.includes('insights')) {
		return 'insights';
	} else if (pathname.includes('settings')) {
		return 'settings';
	} else {
		return 'home';
	}
};

export const NavBar: React.FC = () => {
	// const [isOpen, setIsOpen] = React.useState(false);
	const router = useRouter();
	const selectedRoute = selectRoute(router.pathname);
	// const [selectedRoute, setSelectedRoute] = React.useState('home');
	return (
		<div
			className={clsx(
				'fixed bottom-0 h-16 left-0 flex flex-col p-8 w-full bg-background-nav rounded-t-3xl transform transition-transform duration-300'
				// { '-translate-y-32': isOpen }
			)}
		>
			<div className="flex items-center justify-between h-full">
				<NavigateIcon
					icon="home"
					route="home"
					selectedRoute={selectedRoute}
					label="All"
				/>
				<NavigateIcon
					icon="archive"
					route="memories"
					selectedRoute={selectedRoute}
					label="Memories"
				/>
				<Link href="/create">
					<div className="flex flex-col items-center">
						<div
							className={clsx(
								'flex items-center justify-center w-6 h-6 border-2 border-primary rounded-[4px] cursor-pointer transform transition-all duration-300 bg-primary',
								'focus:outline-none'
							)}
						>
							<Icon
								src="/images/icons/plus.svg"
								width="18"
								height="18"
								className={clsx(
									'stroke-current transition-colors duration-300 text-background-nav'
								)}
							/>
						</div>
						<Caption type="2" className="mt-1 text-primary">
							<Trans>Create</Trans>
						</Caption>
					</div>
				</Link>
				<NavigateIcon
					icon="bar-chart"
					route="insightsv2"
					label="Insights"
					selectedRoute={selectedRoute}
				/>
				<NavigateIcon
					icon="settings"
					route="settings"
					label="Settings"
					selectedRoute={selectedRoute}
				/>
			</div>
		</div>
	);
};
