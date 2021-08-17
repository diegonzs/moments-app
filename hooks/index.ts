import * as React from 'react';
import {
	CurrentMomentContext,
	IsCreatingMomentContext,
	ModalMediaContext,
} from 'context';
import { OnesignalContext } from 'context/onesignal';
import { useTheme } from 'next-themes';

export const useCurrentMoment = () => {
	const { currentMoment, setCurrentMoment } = React.useContext(
		CurrentMomentContext
	);

	return {
		currentMoment,
		setCurrentMoment,
	};
};

export const useModalMedia = () => {
	const { modalMedia, setModalMedia } = React.useContext(ModalMediaContext);

	return {
		modalMedia,
		setModalMedia,
	};
};

export const useIsCreatingMoment = () => {
	return React.useContext(IsCreatingMomentContext);
};

export const useOnesignal = () => {
	return React.useContext(OnesignalContext);
};

const backgroundColors: Record<string, Record<string, string>> = {
	light: {
		'bg-background': '#fff7ed',
		'bg-background-nav': '#ffffff',
	},
	dark: {
		'bg-background': '#201c19',
		'bg-background-nav': '#3c3028',
	},
};

export const useBackgroundPage = (className: string) => {
	const { theme } = useTheme();
	React.useEffect(() => {
		const changeBackground = () => {
			document.getElementsByTagName('body')[0].classList.add(className);
			const scheme = document.querySelector('meta[name="theme-color"]');
			if (theme) {
				const color = backgroundColors[theme]?.[className];
				if (color) {
					scheme?.setAttribute('content', color);
				}
			}
		};
		changeBackground();
		return () => {
			document.getElementsByTagName('body')[0].classList.remove(className);
		};
	}, [theme]);
};
