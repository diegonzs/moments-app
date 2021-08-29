import { Caption } from 'components/typography';
import * as React from 'react';

type BadgeProps = {
	onClick: () => void;
	text?: string;
};

export const Badge: React.FC<BadgeProps> = ({ onClick, text, children }) => {
	return (
		<span
			className="flex px-2 py-1 bg-secondary-light rounded-lg cursor-pointer"
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			onTouchStart={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			{text ? (
				<Caption type="1" className="text-white">
					{text}
				</Caption>
			) : (
				children
			)}
		</span>
	);
};
