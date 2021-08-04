import * as React from 'react';
import {
	CurrentMomentContext,
	IsCreatingMomentContext,
	ModalMediaContext,
} from 'context';
import { OnesignalContext } from 'context/onesignal';

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

export const useBackgroundPage = (className: string) => {
	React.useEffect(() => {
		console.log('this is real');
		const changeBackground = () => {
			document.getElementsByTagName('body')[0].classList.add(className);
		};
		changeBackground();
		return () => {
			document.getElementsByTagName('body')[0].classList.remove(className);
		};
	}, []);
};
