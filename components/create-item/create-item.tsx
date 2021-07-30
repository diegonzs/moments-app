import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { Input } from 'components/forms';
import { BodyText, Subtitle, Title } from 'components/typography';
import * as React from 'react';

interface CreateItemProps {
	title: string;
	onClickElem: (value: { id: string; title: string }) => void;
	onClose: () => void;
	placeholder?: string;
	descriptionTitle: string;
	descriptionBody: string;
	createText: string;
	activeText: string;
	data: { id: string; title: string }[];
	onCreateNewOne: (value: string) => void;
}

export const CreateItem: React.FC<CreateItemProps> = ({
	title,
	placeholder,
	descriptionTitle,
	descriptionBody,
	createText,
	activeText,
	data,
	onClose,
	onClickElem,
	onCreateNewOne,
}) => {
	const [value, setValue] = React.useState('');
	return (
		<div className="absolute inset-0 p-5 bg-background-nav">
			<div className="flex mb-4 items-center">
				<div onClick={onClose} className="cursor-pointer">
					<XIcon className="w-6 mr-5" />
				</div>
				<Title type="2">{title}</Title>
			</div>
			<Input
				placeholder={placeholder}
				value={value}
				onChange={setValue}
				className="mb-6"
			/>
			{!data.length && !value && (
				<>
					<Subtitle type="2" className="text-primary-60 mb-2 text-left">
						{descriptionTitle}
					</Subtitle>
					<Subtitle type="3" className="text-primary-40 text-left">
						{descriptionBody}
					</Subtitle>
				</>
			)}
			{!!data.length && (
				<div className="flex flex-col items-start">
					<Subtitle type="2" className="text-primary-60 mb-4">
						{activeText}
					</Subtitle>
					<ul className="grid gap-4">
						{data
							.filter((e) => e.title.includes(value))
							.map((elem) => (
								<li
									key={elem.id}
									className="cursor-pointer"
									onClick={() => onClickElem(elem)}
								>
									<BodyText type="1" className="text-primary text-left">
										{elem.title}
									</BodyText>
								</li>
							))}
					</ul>
				</div>
			)}
			{!!value && (
				<div onClick={() => onCreateNewOne(value)}>
					<Subtitle
						type="1"
						className={clsx(
							'text-secondary cursor-pointer mt-4',
							!!data.length && 'text-left'
						)}
					>
						{`${createText} "${value}"`}
					</Subtitle>
				</div>
			)}
		</div>
	);
};
