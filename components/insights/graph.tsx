import * as React from 'react';
import clsx from 'clsx';
import { Caption, Subtitle } from 'components/typography';
import { Moments } from 'types/schema-types';
import momentjs from 'moment';
interface GraphProps {
	moments: Moments[];
	time: string;
	period: string;
}

export const Graph: React.FC<GraphProps> = ({ moments, time, period }) => {
	const [data, maxCount] = React.useMemo(() => {
		const mydata: Record<number, number> = {};
		if (time === 'last days' || time === 'weekly') {
			if (period !== '30 days') {
				moments.forEach((elem) => {
					const day = momentjs(elem.created_at).weekday();
					mydata[day] = mydata[day] ? mydata[day] + 1 : 1;
				});
			} else {
				moments.forEach((elem) => {
					const day = momentjs(elem.created_at).date();
					mydata[day] = mydata[day] ? mydata[day] + 1 : 1;
				});
			}
		} else if (time === 'monthly') {
			moments.forEach((elem) => {
				const day = momentjs(elem.created_at).date();
				mydata[day] = mydata[day] ? mydata[day] + 1 : 1;
			});
		} else if (time === 'yearly') {
			moments.forEach((elem) => {
				const day = momentjs(elem.created_at).month();
				mydata[day] = mydata[day] ? mydata[day] + 1 : 1;
			});
		}
		const max = Object.values(mydata).reduce((acum, current) => {
			if (current > acum) return current;
			return acum;
		}, 0);
		const record = Object.entries(mydata).map(([label, value]) => ({
			label,
			value,
		}));
		return [record, max];
	}, [moments]);

	const getGraphLabel = (value: number) => {
		if (time === 'last days' || time === 'weekly') {
			if (period !== '30 days') {
				return momentjs().weekday(value).format('ddd');
			} else {
				return momentjs().date(value).format('Do');
			}
		} else if (time === 'monthly') {
			return momentjs().date(value).format('Do');
		} else if (time === 'yearly') {
			return momentjs().month(value).format('MMM');
		}
	};

	return (
		<div className="flex flex-col m-5 mt-8">
			<Subtitle type="2" className="text-pimary-60 mb-7">
				Moments by day
			</Subtitle>
			<ul
				className={clsx(
					'h-40 grid grid-flow-col gap-3 w-full overflow-x-scroll hide-scroll-bar pt-[23px]',
					data.length <= 5 && 'justify-start'
				)}
			>
				{data.map((elem) => (
					<div key={elem.label} className="h-full flex flex-col items-center">
						<li
							className={clsx(
								'flex h-full relative items-end w-10 justify-center'
							)}
						>
							<div
								style={{
									height: `${(elem.value * 100) / maxCount + 5}%`,
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
								{getGraphLabel(Number(elem.label))}
							</Caption>
						</li>
					</div>
				))}
			</ul>
		</div>
	);
};
