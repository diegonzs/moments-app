import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { Icon } from 'components/icon';

const NavigateIcon: React.FC<{
	route: string;
	icon: string;
	selectedRoute: string;
}> = ({ route, icon, selectedRoute }) => {
	return (
		<Link href={route === 'home' ? '/' : `/${route}`}>
			<div className="z-20 cursor-pointer">
				<Icon
					src={`/images/icons/${icon}.svg`}
					width="24"
					height="24"
					className={clsx(
						{ 'text-secondary': route === selectedRoute },
						{ 'text-primary': route !== selectedRoute }
					)}
				/>
			</div>
		</Link>
	);
};

const CreateIcon: React.FC<{ type: string; icon: string }> = ({
	type,
	icon,
}) => {
	return (
		<Link href={`/create/${type}`}>
			<div className="flex flex-col items-center cursor-pointer">
				<div
					className={clsx(
						'flex items-center justify-center mb-2 w-10 h-10 bg-background border-2 rounded-full',
						{ 'border-content-note': type === 'note' },
						{ 'border-content-thank': type === 'thank' },
						{ 'border-content-voice': type === 'voice' },
						{ 'border-content-image': type === 'image' },
						{ 'border-content-video': type === 'video' }
					)}
				>
					<Icon
						src={`/images/icons/${icon}.svg`}
						width="24"
						height="24"
						className="text-primary"
					/>
				</div>
				<p className="text-primary-60 font-sans text-xs font-medium capitalize">
					{type}
				</p>
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
				'fixed -bottom-32 left-0 flex flex-col p-8 w-full bg-background-nav rounded-t-3xl transform transition-transform duration-300'
				// { '-translate-y-32': isOpen }
			)}
		>
			<div className="flex items-center justify-between h-full">
				<NavigateIcon icon="home" route="home" selectedRoute={selectedRoute} />
				<NavigateIcon
					icon="archive"
					route="memories"
					selectedRoute={selectedRoute}
				/>
				<Link href="/create">
					<div
						className={clsx(
							'flex items-center justify-center w-12 h-12 border-2 border-primary rounded-full cursor-pointer transform transition-all duration-300 bg-primary',
							'focus:outline-none'
							// {
							// 	'bg-primary-10 rotate-45': isOpen,
							// 	'bg-primary': !isOpen,
							// }
						)}
						// onClick={() => setIsOpen(!isOpen)}
					>
						<Icon
							src="/images/icons/plus.svg"
							width="18"
							height="18"
							className={clsx(
								'stroke-current transition-colors duration-300 text-background-nav'
								// { 'text-primary': isOpen },
								// { 'text-background-nav': !isOpen }
							)}
						/>
					</div>
				</Link>
				<NavigateIcon
					icon="bar-chart"
					route="insightsv2"
					selectedRoute={selectedRoute}
				/>
				<NavigateIcon
					icon="settings"
					route="settings"
					selectedRoute={selectedRoute}
				/>
			</div>
			<div className="flex flex-col mt-6 bg-background-nav">
				<p className="mb-3 text-primary font-sans text-sm font-semibold">
					Create a moment
				</p>
				<div className="flex justify-between">
					<CreateIcon type="note" icon="edit" />
					<CreateIcon type="thank" icon="heart" />
					<CreateIcon type="voice" icon="microphone" />
					<CreateIcon type="image" icon="image" />
					<CreateIcon type="video" icon="video" />
				</div>
			</div>
		</div>
	);
};
