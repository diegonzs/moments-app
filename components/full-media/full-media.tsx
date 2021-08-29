import * as React from 'react';
import Image from 'next/image';
import { Icon } from 'components/icon';
import { useSwipeable } from 'react-swipeable';
import { DownloadIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export const FullMedia: React.FC<{
	hideModal: () => void;
	images: string[];
	videos: string[];
	audios: string[];
	media?: string[];
	defaultIndex?: number;
}> = ({ hideModal, images, audios, videos, defaultIndex = 0 }) => {
	const [currentIndex, setCurrentIndex] = React.useState<number>(defaultIndex);

	const mediaContent = React.useMemo(() => {
		const data = [
			...images.map((ele) => ({ type: 'image', url: ele })),
			...videos.map((ele) => ({ type: 'video', url: ele })),
			...audios.map((ele) => ({ type: 'audio', url: ele })),
		];
		return data;
	}, [images, videos, audios]);

	const handlers = useSwipeable({
		trackTouch: true,
		preventDefaultTouchmoveEvent: true,
		onSwiped: (eventData) => console.log('User Swiped!', eventData),
		onSwipedRight: () =>
			setCurrentIndex((value) => (value === 0 ? 0 : value - 1)),
		onSwipedLeft: () =>
			setCurrentIndex((value) =>
				value === mediaContent.length - 1 ? value : value + 1
			),
	});

	React.useEffect(() => console.log(mediaContent), [mediaContent]);

	return (
		<div
			{...handlers}
			className="fixed z-40 bottom-0 left-0 right-0 top-0 flex items-center justify-center w-full h-screen bg-dark"
		>
			<div className="w-full absolute top-0 left-0 right-0 py-3 flex justify-between items-center px-6">
				<div className="cursor-pointer" onClick={hideModal}>
					<Icon src="/images/icons/close.svg" className="text-light" />
				</div>
				<ul className="grid grid-flow-col gap-2">
					{mediaContent.map((elem, index) => (
						<div
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={clsx(
								'w-8 h-8 border-2 rounded-1.2lg overflow-hidden cursor-pointer bg-secondary-light flex justify-center items-center',
								index === currentIndex ? 'border-light' : 'border-primary-light'
							)}
						>
							{elem.type === 'video' && (
								<video
									src={elem.url}
									autoPlay={false}
									controls={false}
									className="w-full"
								/>
							)}
							{elem.type === 'image' && (
								<Image
									width="32"
									height="32"
									layout="fixed"
									src={elem.url}
									alt="image-detail"
									objectFit="cover"
									objectPosition="center"
								/>
							)}
							{elem.type === 'audio' && (
								<Icon src="/images/icons/audio-wave.svg" width="12px" />
							)}
						</div>
					))}
				</ul>
				<DownloadIcon width="24" className="cursor-pointer text-light" />
			</div>
			<div
				className="relative flex justify-center items-center w-full max-w-md h-full"
				style={{ maxHeight: '80vh' }}
			>
				{mediaContent[currentIndex].type === 'video' && (
					<video
						src={mediaContent[currentIndex].url}
						autoPlay={false}
						controls
						className="max-h-full"
					/>
				)}
				{mediaContent[currentIndex].type === 'image' && (
					<Image
						layout="fill"
						src={mediaContent[currentIndex].url}
						alt="image-detail"
						objectFit="contain"
						objectPosition="center"
					/>
				)}
				{mediaContent[currentIndex].type === 'audio' && (
					<audio
						src={mediaContent[currentIndex].url}
						controls
						className="w-80"
					/>
				)}
			</div>
		</div>
	);
};
