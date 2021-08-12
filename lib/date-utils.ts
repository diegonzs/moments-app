import momentjs from 'moment';

export type TDateTime = 'last days' | 'weekly' | 'monthly' | 'yearly';

export const getHumanPeriod = (time: TDateTime, period: string) => {
	if (time === 'weekly') {
		const start = momentjs().week(Number(period)).startOf('week');
		const end = momentjs().week(Number(period)).endOf('week');
		const monthStart = momentjs(start).format('MMM');
		const monthEnd = momentjs(end).format('MMM');
		const isSameMonth = monthStart === monthEnd;
		return `${momentjs(start).format('ddd D')} ${
			isSameMonth ? '' : monthStart
		} - ${momentjs(end).format('ddd D')} ${monthEnd}.`;
	} else if (time === 'monthly') {
		const month = momentjs().month(Number(period));
		return `${momentjs(month).format('MMMM')}`;
	} else if (time === 'yearly') {
		return period;
	}
};

export const periodOptions = (time: TDateTime) => {
	if (time === 'last days') {
		return [
			JSON.stringify([time, '7 Days']),
			JSON.stringify([time, '30 Days']),
		];
	} else if (time === 'weekly') {
		const data = [];
		const lastWeek = momentjs().week();
		let i = 0;
		while (i <= lastWeek) {
			data.push(JSON.stringify([time, String(i)]));
			i++;
		}
		return data;
	} else if (time === 'monthly') {
		const data = [];
		const lastMonth = momentjs().month();
		let i = 0;
		while (i <= lastMonth) {
			data.push(JSON.stringify([time, String(i)]));
			i++;
		}
		return data;
	} else if (time === 'yearly') {
		return [JSON.stringify([time, '2021'])];
	}
	return [];
};

export type PeriodData = {
	label: string;
	value: string;
};

export const getWeeks = (): PeriodData[] => {
	const lastWeek = momentjs().week();
	const data: PeriodData[] = [];
	let i = 0;
	while (i <= lastWeek) {
		const label = getHumanPeriod('weekly', `${i}`);
		if (label) {
			data.push({ label, value: `${i}` });
		}
		i++;
	}
	return data.reverse();
};
export const getMonths = (): PeriodData[] => {
	const lastMonth = momentjs().month();
	const data: PeriodData[] = [];
	let i = 0;
	while (i <= lastMonth) {
		const label = getHumanPeriod('monthly', `${i}`);
		if (label) {
			data.push({ label, value: `${i}` });
		}
		i++;
	}
	return data.reverse();
};

export const timeTypes: PeriodData[] = [
	{ label: 'Last days', value: 'last days' },
	{ label: 'Weekly', value: 'weekly' },
	{ label: 'Monthly', value: 'monthly' },
	{ label: 'Yearly', value: 'yearly' },
];
