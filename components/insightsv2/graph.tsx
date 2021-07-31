import clsx from 'clsx';
import { Caption, Subtitle } from 'components/typography';
import * as React from 'react';

const days = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

export const Graph = () => {
	return (
		<div className="flex flex-col m-5 mt-8">
			<Subtitle type="2" className="text-primary-60 mb-3">
				Moments by day
			</Subtitle>
			<ul className="h-40 flex items-end justify-between">
				{days.map((day) => (
					<li
						key={day}
						className={clsx(
							'h-full flex items-end w-10 justify-center',
							'bg-gradient-to-b from-graph-from to-graph-to'
						)}
					>
						<Caption className="text-primary-40">{day}</Caption>
					</li>
				))}
			</ul>
		</div>
	);
};
