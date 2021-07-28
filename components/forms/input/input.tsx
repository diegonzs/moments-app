import clsx from 'clsx';
import * as React from 'react';

interface InputProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
	placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
	value,
	onChange,
	className,
	placeholder,
}) => {
	return (
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className={clsx(
				'flex items-center px-6 w-full h-16 bg-background-input border-none rounded-2xl',
				className
			)}
		/>
	);
};
