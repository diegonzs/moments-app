import * as React from 'react';
import { Rocket } from './rocket';
import { CardMoment } from 'components/card-moment';
import clsx from 'clsx';
import { Moments } from 'types/schema-types';

interface ListMomentsProps {
	moments: Moments[];
}

interface ElemMoment {
	moment: Moments;
	isRight: boolean;
}

const ElemMoment: React.FC<ElemMoment> = ({ moment, isRight }) => {
	return (
		<div
			className={clsx(
				'transform',
				{ 'self-end rotate-3': isRight },
				{ 'self-start -rotate-3': !isRight }
			)}
		>
			<CardMoment {...moment} />
		</div>
	);
};

export const ListMoments: React.FC<ListMomentsProps> = ({ moments }) => {
	return (
		<div className="self-end w-full flex-grow flex justify-center">
			<div
				className="relative flex flex-col flex-grow items-center self-end justify-end mt-11 pt-10 w-full"
				style={{ height: 'min-content' }}
			>
				<Rocket />
				<ul
					className="flex flex-col-reverse justify-end pb-12"
					style={{ width: '94vw', maxWidth: '24rem' }}
				>
					{moments.map((moment, index) => (
						<ElemMoment
							key={moment.id}
							moment={moment}
							isRight={index % 2 === 0}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};
