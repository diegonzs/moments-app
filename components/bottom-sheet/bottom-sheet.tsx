import * as React from 'react';
import clsx from 'clsx';

import { DraggableCore } from 'react-draggable';

interface BottomSheetProps {
	allowTop?: boolean;
	onCloseCallback?: () => void;
	shouldOpen?: boolean;
	bgColor?: string;
	children({ onClose }: { onClose: () => void }): React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
	children,
	shouldOpen,
	bgColor,
	allowTop = true,
	onCloseCallback,
}) => {
	// const { currentMoment, setCurrentMoment } = useCurrentMoment();
	const [currentPosition, setCurrenPosition] = React.useState(0);
	const [vh, setVh] = React.useState(0);
	const [isOpen, setIsOpen] = React.useState(false);
	const [isOnTop, setIsOnTop] = React.useState(false);

	React.useEffect(() => {
		console.log(allowTop);
	}, []);

	React.useEffect(() => {
		if (shouldOpen) {
			setIsOpen(true);
		}
	}, [shouldOpen, setIsOpen]);

	const moveElement = React.useCallback(
		(position: number, viewprtHeight: number): void => {
			const $element = document.getElementById('main-content');
			if ($element) {
				$element.style.transform = `translateY(calc(${position}px * -1))`;
				if (
					$element.style.transition &&
					position !== (viewprtHeight * 100) / 2 &&
					position !== viewprtHeight * 100
				) {
					$element.style.transition = '';
				}
			}
		},
		[]
	);

	const closeBottomSheet = React.useCallback((): void => {
		setIsOpen(false);
		setIsOnTop(false);
		setCurrenPosition(0);
		addTransition(true);
		setTimeout(() => {
			onCloseCallback && onCloseCallback();
		}, 350);
	}, []);

	const addTransition = React.useCallback((isRemoving?: boolean): void => {
		const $element = document.getElementById('main-content');
		if ($element) {
			$element.style.transition = 'transform 0.25s ease';
			if (isRemoving) {
				$element.style.transform = ``;
			}
		}
	}, []);

	React.useEffect((): void => {
		if (isOpen) {
			const newPosition = (vh * 100) / 2;
			addTransition();
			moveElement(newPosition, vh);
			setCurrenPosition(newPosition);
		}
	}, [isOpen, addTransition, moveElement, setCurrenPosition]);

	const moveToTop = React.useCallback((): void => {
		const newPosition = vh * 100;
		setIsOnTop(true);
		addTransition();
		moveElement(newPosition, vh);
		setCurrenPosition(newPosition);
	}, [vh]);

	const moveToMiddle = React.useCallback((): void => {
		const newPosition = (vh * 100) / 2;
		addTransition();
		moveElement(newPosition, vh);
		setCurrenPosition(newPosition);
	}, [vh]);

	const checkTopOrClose = (): void => {
		if (currentPosition < vh * 100 * 0.3) {
			closeBottomSheet();
		} else if (currentPosition > vh * 100 * 0.7 && allowTop) {
			moveToTop();
		} else {
			moveToMiddle();
		}
	};

	const resize = (): void => {
		const newVh = window.innerHeight * 0.01;
		setVh(newVh);
		document.documentElement.style.setProperty('--vh', `${newVh}`);
	};

	React.useEffect(() => {
		if (isOnTop) {
			moveToTop();
		}
	}, [vh, moveToTop]);

	React.useEffect(() => {
		resize();
		window.addEventListener('resize', () => resize());
		return () => {
			window.removeEventListener('resize', () => resize());
		};
	}, []);

	const controlEvent = (deltaY: number): void => {
		if (deltaY) {
			const $element = document.getElementById('main-content');
			if ($element) {
				if (isOnTop && deltaY < 0) {
					onScrollElement(deltaY);
				} else if (isOnTop && deltaY > 0 && $element.scrollTop !== 0) {
					onScrollElement(deltaY);
				} else {
					onDragElement(deltaY);
				}
			}
		}
	};

	const onDragElement = (delta: number): void => {
		const newPosition = currentPosition - delta;
		if (delta < 0) {
			if (currentPosition < vh * 100 && !isOnTop) {
				moveElement(newPosition, vh);
				setCurrenPosition(newPosition);
			}
		} else if (delta > 0) {
			moveElement(newPosition, vh);
			setCurrenPosition(newPosition);
			if (isOnTop) {
				setIsOnTop(false);
			}
		}
	};

	const onScrollElement = (delta: number): void => {
		const $element = document.getElementById('main-content');
		if ($element) {
			$element.scrollTop = $element.scrollTop + delta * -1;
		}
	};

	return (
		<>
			{isOpen && (
				<div
					className="fixed z-10 top-0 w-full h-screen bg-dark-50"
					onClick={() => closeBottomSheet()}
				></div>
			)}
			<DraggableCore
				onDrag={(_event, data) => controlEvent(data.deltaY)}
				onStop={() => checkTopOrClose()}
			>
				<div
					id="main-content"
					style={{
						bottom: `-${vh * 100}px`,
						height: `${vh * 100}px`,
					}}
					className={clsx(
						'fixed z-20 left-0 w-full h-screen',
						isOnTop ? 'rounded-none overflow-y-scroll' : 'rounded-t-3xl',
						bgColor ? bgColor : 'bg-background'
					)}
				>
					<div className="flex justify-center w-full mt-3 mb-8">
						<div className={clsx('w-12 h-2 bg-primary-20 rounded-lg z-30')} />
					</div>
					{children({ onClose: closeBottomSheet })}
				</div>
			</DraggableCore>
		</>
	);
};
