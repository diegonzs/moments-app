import clsx from 'clsx';
import { useBackgroundPage } from 'hooks';
import * as React from 'react';

interface LayoutProps {
	className: string;
	withNavBar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
	className,
	withNavBar = true,
	children,
}) => {
	useBackgroundPage(className);
	return (
		<div
			// style={{ gridTemplateRows: 'auto 1fr' }}
			className={clsx(
				'relative flex flex-col flex-grow h-full w-full',
				{ 'pb-20': withNavBar },
				{ 'pb-10': !withNavBar },
				className
			)}
		>
			{children}
		</div>
	);
};
