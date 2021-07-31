import * as React from 'react';
import clsx from 'clsx';

interface CaptionProps {
	type?: '1' | '2' | '3';
	className?: string;
	text?: string;
}

export const Caption: React.FC<CaptionProps> = ({
	type = '1',
	text = '',
	children,
	className,
}) => {
	if (type === '2') {
		return (
			<p className={clsx('font-sans text-xs font-normal', className)}>
				{text || children}
			</p>
		);
	}
	if (type === '3') {
		return (
			<p className={clsx('font-sans text-xs font-semibold', className)}>
				{text || children}
			</p>
		);
	}
	return (
		<p className={clsx('font-sans text-xs font-medium', className)}>
			{text || children}
		</p>
	);
};
