import * as React from 'react';
import { HeadPage } from 'components/head-page';
import { Layout } from 'components/layout';
import { ToggleOption } from 'components/toggle-option';
import { Loader } from 'components/loader';
import { t } from '@lingui/macro';

const Reminders: React.FC = () => {
	// const [isOnesignalActive, setIsOnesignalActive] = React.useState(false);
	const isOnesignalActive = true;
	const [isMorningActive, setIsMorningActive] = React.useState(false);
	const [isNightActive, setIsNightActive] = React.useState(false);

	const onToggleMornig = async () => {
		console.log('click on morning toggle now checking if user is subscribe');
		let isSubscribed = await window.OneSignal.isPushNotificationsEnabled();
		setIsMorningActive(!isMorningActive);
		if (!isSubscribed) {
			console.log('if not subscribe will show a native propmt');
			await window.OneSignal.showNativePrompt();
			isSubscribed = await window.OneSignal.isPushNotificationsEnabled();
			if (!isSubscribed) {
				console.log(
					'after checking for second time we realize that the user do not want notifications'
				);
				setIsMorningActive(false);
				return;
			}
		}
		if (!isMorningActive && isOnesignalActive) {
			console.log('activating morning tags');
			window.OneSignal.sendTag('morning', 'active');
			setIsMorningActive(true);
		}
		if (isMorningActive && isOnesignalActive) {
			console.log('disabling morning tags');
			window.OneSignal.sendTag('morning', 'disabled');
			setIsMorningActive(false);
		}
	};

	const onToggleNight = async () => {
		let isSubscribed = await window.OneSignal.isPushNotificationsEnabled();
		setIsNightActive(!isNightActive);
		if (!isSubscribed) {
			await window.OneSignal.showNativePrompt();
			isSubscribed = await window.OneSignal.isPushNotificationsEnabled();
			if (!isSubscribed) {
				setIsNightActive(isNightActive);
				return;
			}
		}
		if (!isMorningActive && isOnesignalActive) {
			window.OneSignal.sendTag('night', 'active');
		}
		if (isMorningActive && isOnesignalActive) {
			window.OneSignal.sendTag('night', 'disabled');
		}
		setIsNightActive(!isNightActive);
	};

	React.useEffect(() => {
		(async () => {
			console.log('checking if oneSignal is active');
			if (isOnesignalActive) {
				console.log('onesignal is active :P');
				try {
					const isSubscribed = await window.OneSignal.isPushNotificationsEnabled();
					console.log('checking if user is subscribed to oneSignal');
					if (isSubscribed) {
						console.log('checking if user is subscribed to some tags');
						const tags = await window.OneSignal.getTags();
						if (!!tags.morning && tags.morning === 'active') {
							console.log('useris subscribe to mornig tag');
							setIsMorningActive(true);
						}
						if (!!tags.night && tags.night === 'active') {
							console.log('useris subscribe to night tag');
							setIsNightActive(true);
						}
					}
				} catch (err) {
					console.log(err);
				}
			}
		})();
	}, [isOnesignalActive]);

	// React.useEffect(() => {
	// 	const script = document.getElementById('onesignal-script');
	// 	console.log('script', script);
	// 	if (script) {
	// 		script.onload = script.onreadystatechange = function () {
	// 			alert('Script loaded!');
	// 		};
	// 	}
	// 	const check = () => {
	// 		console.log('it finished loading onesignal script');
	// 		setIsOnesignalActive(true);
	// 	};
	// 	script && script.addEventListener('load', check);
	// 	return () => {
	// 		script && script.removeEventListener('load', check);
	// 	};
	// }, []);

	return (
		<Layout className="bg-background" withNavBar={false}>
			<HeadPage title={t`Reminders`} href="/settings" />
			<div className="self-start px-5 w-full">
				{!isOnesignalActive ? (
					<Loader />
				) : (
					<>
						<ToggleOption
							title={t`Morning reminder`}
							description={t`Don’t forget to save your morning moments. A friendly push at 9:00am.`}
							isActive={isMorningActive}
							onToggle={onToggleMornig}
						/>
						<ToggleOption
							title={t`Night reminder`}
							description={t`Don’t forget to save your evening moments. A friendly push at 8:00pm.`}
							isActive={isNightActive}
							onToggle={onToggleNight}
						/>
					</>
				)}
			</div>
		</Layout>
	);
};

export default Reminders;
