import * as React from 'react';
import { Layout } from 'components/layout';
import { NavBar } from 'components/nav-bar';
import { Loader } from 'components/loader';
// hooks
import { useMomentsByInsights } from 'hooks/api';
// Page components
import {
	Graph,
	Information,
	TableData,
	TitleSection,
} from 'components/insights';
import { BottomSheet } from 'components/bottom-sheet';
import { BodyText, Subtitle, Title } from 'components/typography';
import { Trans } from '@lingui/macro';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { getMonths, getWeeks, PeriodData, timeTypes } from 'lib/date-utils';
import { useModal } from 'hooks/use-modal';

const InsightsPage = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [dateType, setDateType] = React.useState<PeriodData | null>(
		timeTypes[0]
	);
	const [datePeriod, setDatePeriod] = React.useState<PeriodData | null>({
		label: '7 days',
		value: '7 days',
	});

	const { insights, isLoading } = useMomentsByInsights(
		dateType?.value || '',
		datePeriod?.value || ''
	);

	const words = React.useMemo(() => {
		if (insights && insights.moments.length) {
			return insights.moments.reduce((acum, current) => {
				return acum + current.content.split(' ').length;
			}, 0);
		}
		return 0;
	}, [insights]);

	const tags = React.useMemo(() => {
		const value: string[] = [];
		if (insights?.tags) {
			insights.tags.forEach((elem) => {
				if (!value.includes(elem.text)) {
					value.push(elem.text);
				}
			});
		}
		return value;
	}, [insights]);

	const { images, audios, videos } = React.useMemo(() => {
		const value = { images: 0, audios: 0, videos: 0 };
		if (insights && insights.moments.length) {
			insights.moments.forEach((elem) => {
				if (elem.images?.length) {
					value.images = value.images + elem.images.length;
				}
				if (elem.videos?.length) {
					value.videos = value.videos + elem.videos.length;
				}
				if (elem.note_voices) {
					value.audios = value.audios + elem.note_voices.length;
				}
			});
		}
		return value;
	}, [insights]);

	const periodOptions = React.useMemo(() => {
		let periods: PeriodData[] = [];
		if (dateType) {
			if (dateType.value === 'weekly') {
				periods = getWeeks();
			} else if (dateType.value === 'monthly') {
				periods = getMonths();
			} else if (dateType.value === 'last days') {
				periods = [
					{ label: '7 days', value: '7 days' },
					{ label: '30 days', value: '30 days' },
				];
			} else if (dateType.value === 'yearly') {
				periods = [{ label: '2021', value: '2021' }];
			}
		}
		setDatePeriod(periods[0]);
		return periods;
	}, [dateType]);

	const changeType = (value: string) => {
		const newType = timeTypes.find((elem) => elem.value === value);
		if (newType) {
			setDateType(newType);
			setDatePeriod(null);
		}
	};

	const changePeriod = (value: string) => {
		const currentPeriodOption = periodOptions.find(
			(elem) => elem.value === value
		);
		if (currentPeriodOption) {
			setDatePeriod(currentPeriodOption);
		}
	};

	return (
		<Layout className="bg-background">
			{isLoading || !insights ? (
				<Loader />
			) : (
				<div className="pb-5">
					<TitleSection onClickMenu={() => setIsMenuOpen(true)} />
					<TableData
						label={datePeriod?.label || ''}
						total={insights?.moments.length || 0}
						images={images}
						words={words}
						audios={audios}
						videos={videos}
						tags={tags.length}
					/>
					<Graph
						moments={insights.moments}
						time={dateType?.value || ''}
						period={datePeriod?.value || ''}
					/>
					<Information tags={tags} moments={insights?.moments.length || 0} />
				</div>
			)}
			<NavBar />
			<BottomSheet
				shouldOpen={isMenuOpen}
				onCloseCallback={() => setIsMenuOpen(false)}
				allowTop={false}
			>
				{() => (
					<div className="flex flex-col px-5">
						<Title type="2" className="text-primary text-left mb-6">
							<Trans>Date</Trans>
						</Title>
						<div className="grid gap-4">
							<Dropdown
								options={timeTypes}
								onChange={changeType}
								placeholder="Select a type"
								label="Type"
								currentOption={dateType}
							/>
							<Dropdown
								options={periodOptions}
								disabled={!dateType}
								onChange={changePeriod}
								placeholder="Select a period"
								label="Period"
								currentOption={datePeriod}
							/>
						</div>
					</div>
				)}
			</BottomSheet>
		</Layout>
	);
};

const Dropdown: React.FC<{
	options: PeriodData[];
	currentOption: PeriodData | null;
	disabled?: boolean;
	label: string;
	placeholder: string;
	onChange: (value: string) => void;
}> = ({
	options,
	currentOption,
	label,
	placeholder,
	disabled = false,
	onChange,
}) => {
	const { Modal, isShow, hide, show } = useModal();
	return (
		<div className="relative h-16 rounded-2xl overflow-hidden">
			<div
				className="flex justify-between items-center bg-background-input px-6 cursor-pointer h-full"
				onClick={() => (!disabled ? show() : null)}
				onTouchStart={() => (!disabled ? show() : null)}
			>
				<div className="flex flex-col">
					<Subtitle type="2" className="text-primary-40 text-left">
						{label}
					</Subtitle>
					<BodyText type="1" className="text-primary text-left">
						{currentOption ? currentOption.label : placeholder}
					</BodyText>
				</div>
				<ChevronDownIcon className="w-6" />
			</div>
			<Modal isShow={isShow}>
				<div className="z-50 bg-background p-5 rounded-md h-[400px] w-[300px] overflow-y-scroll">
					<Subtitle type="1" className="text-left mb-3">
						{placeholder}
					</Subtitle>
					<div className="grid gap-2">
						{options.map((elem) => (
							<div
								key={elem.label}
								onClick={() => {
									onChange(elem.value);
									hide();
								}}
							>
								<BodyText type="1" className="text-left cursor-pointer">
									{elem.label}
								</BodyText>
							</div>
						))}
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default InsightsPage;
