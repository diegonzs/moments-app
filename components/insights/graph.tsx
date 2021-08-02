import * as React from 'react';
import clsx from 'clsx';
import { Caption, Subtitle } from 'components/typography';
import { Moments } from 'types/schema-types';
import momentjs from 'moment';
interface GraphProps {
	moments: Moments[];
}

export const Graph: React.FC<GraphProps> = ({ moments }) => {
	const data = React.useMemo(() => {
		const mydata: Record<number, number> = {};
		moments.forEach((elem) => {
			const day = momentjs(elem.created_at).weekday();
			mydata[day] = mydata[day] ? mydata[day] + 1 : 1;
		});
		return Object.entries(mydata).map(([label, value]) => ({ label, value }));
	}, [moments]);

	return (
		<div className="flex flex-col m-5 mt-8">
			<Subtitle type="2" className="text-primary-60 mb-3">
				Moments by day
			</Subtitle>
			<ul className="h-40 flex items-end justify-between">
				{data.map((elem) => (
					<div key={elem.label} className="h-full flex flex-col items-center">
						<li
							className={clsx(
								'flex h-full relative items-end w-10 justify-center'
							)}
						>
							<div
								style={{
									height: `${(elem.value * 100) / moments.length + 10}%`,
								}}
								className="absolute bottom-0 w-full border-t border-primary bg-gradient-to-b from-graph-from to-graph-to"
							>
								<Subtitle
									className="absolute -top-5 flex justify-center w-full left-0"
									type="2"
								>
									{elem.value}
								</Subtitle>
							</div>
							<Caption className="text-primary-40">
								{momentjs().weekday(Number(elem.label)).format('ddd')}
							</Caption>
						</li>
					</div>
				))}
			</ul>
		</div>
	);
};
