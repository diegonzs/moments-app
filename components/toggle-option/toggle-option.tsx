import { Toggle } from 'components/forms';
import { Caption, Subtitle } from 'components/typography';
import * as React from 'react';

interface ToggleOptionProps {
	title: string;
	description: string;
	isActive: boolean;
	onToggle: () => void;
	isDisabled?: boolean;
}

export const ToggleOption: React.FC<ToggleOptionProps> = ({
	title,
	description,
	isActive,
	onToggle,
	isDisabled,
}) => {
	return (
		<div className="flex justify-between mb-6">
			<div className="flex flex-col" style={{ maxWidth: 215 }}>
				<Subtitle className="mb-2 text-primary text-left">{title}</Subtitle>
				<Caption className="text-primary-60 text-left">{description}</Caption>
			</div>
			<div>
				<Toggle
					isActive={isActive}
					onClick={onToggle}
					isDisabled={!!isDisabled}
				/>
			</div>
		</div>
	);
};
