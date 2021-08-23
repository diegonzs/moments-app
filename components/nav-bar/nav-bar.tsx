import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Caption, Subtitle } from 'components/typography';
import { t, Trans } from '@lingui/macro';
import { BottomSheet } from 'components/bottom-sheet';
import { Processes } from 'types/schema-types';
import { CheckIcon } from '@heroicons/react/outline';
import { useProcesses } from 'hooks/api';
import { Loader } from 'components/create-moment/loader';
import { useActiveProcess } from 'hooks';

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

const HomeIcon: React.FC<{
	route: string;
	icon: string;
	label: string;
	selectedRoute: string;
	openBottomSheet: () => void;
}> = ({ route, icon, selectedRoute, label, openBottomSheet }) => {
	if (route === selectedRoute) {
		return (
			<div
				className="z-20 cursor-pointer flex flex-col items-center"
				onClick={openBottomSheet}
			>
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
		);
	}
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
	const router = useRouter();
	const selectedRoute = selectRoute(router.pathname);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
	const { processes, isLoading } = useProcesses();
	return (
		<>
			<div
				className={clsx(
					'fixed bottom-0 py-2 pb-6 left-0 flex flex-col px-8 w-full bg-background-nav rounded-t-3xl transform transition-transform duration-300'
				)}
			>
				<div className="flex items-center justify-between h-full">
					<HomeIcon
						icon="home"
						route="home"
						selectedRoute={selectedRoute}
						label="All"
						openBottomSheet={() => setIsBottomSheetOpen(true)}
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
						route="insights"
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
			<BottomSheet
				shouldOpen={isBottomSheetOpen}
				onCloseCallback={() => setIsBottomSheetOpen(false)}
			>
				{({ onClose }) =>
					isLoading ? (
						<Loader />
					) : (
						<div>
							<div className="px-5 mb-4">
								<ProcessListElem
									title={t`All moments`}
									id="normal-moments"
									onClick={() => {
										setIsBottomSheetOpen(false);
										onClose();
									}}
								/>
							</div>
							<div className="w-full h-[3px] bg-primary-10 my-4"></div>
							<ProcessesList
								title={t`🚀 MY PROCESSES`}
								id="active"
								data={processes?.filter((elem) => elem.is_active) || []}
								onClick={() => {
									setIsBottomSheetOpen(false);
									onClose();
								}}
							/>
							<div className="w-full h-[3px] bg-primary-10 my-4"></div>
							<ProcessesList
								id="incative"
								title={t`🗂 Inactive`}
								data={processes?.filter((elem) => !elem.is_active) || []}
								onClick={() => {
									setIsBottomSheetOpen(false);
									onClose();
								}}
							/>
						</div>
					)
				}
			</BottomSheet>
		</>
	);
};

export const ProcessesList: React.FC<{
	id: string;
	title: string;
	data: Processes[];
	onClick: () => void;
}> = ({ id, title, data, onClick }) => {
	return (
		<div className="w-full flex flex-col">
			<Subtitle
				type="2"
				className="text-primary border-b border-secondary-light pb-2 mb-4 px-5"
			>
				{title}
			</Subtitle>
			{!data.length && (
				<Subtitle type="2" className="px-5 text-center text-primary-40">
					No process here!
				</Subtitle>
			)}
			<ul className="grid gap-4 px-5">
				{id === 'active' && !!data.length && (
					<ProcessListElem
						title={t`All Active Processes`}
						id="all"
						onClick={onClick}
					/>
				)}
				{data.map((process) => (
					<ProcessListElem
						key={process.id}
						title={process.title}
						id={process.id}
						onClick={onClick}
					/>
				))}
			</ul>
		</div>
	);
};

export const ProcessListElem: React.FC<{
	title: string;
	id: string;
	onClick: () => void;
}> = ({ title, id, onClick }) => {
	const { activeProcess, setActiveProcess } = useActiveProcess();
	const isActive = activeProcess === id;
	return (
		<div className="flex justify-between items-center">
			<div
				onTouchStart={() => {
					setActiveProcess(id);
					onClick();
				}}
				onClick={() => {
					setActiveProcess(id);
					onClick();
				}}
			>
				<Subtitle
					type="2"
					className={clsx(
						'cursor-pointer',
						isActive ? 'text-primary' : 'text-primary-40'
					)}
				>
					{title}
				</Subtitle>
			</div>
			<CheckIcon
				className={clsx(
					'w-6 text-secondary',
					isActive ? 'opacity-100' : 'opacity-0'
				)}
			/>
		</div>
	);
};
