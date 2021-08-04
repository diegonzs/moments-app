import * as React from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import momentjs from 'moment';
import { ThemeProvider } from 'next-themes';
import { Moment } from 'interfaces';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import { uploadFiles } from 'lib/upload-file';
import { createMoment, CreateMomentVariables } from 'gql/mutations';
import { IsCreatingMomentContext, UserContext } from 'context';
import { CurrentMomentContext } from 'context/current-moment';
import { useFirebaseUser } from 'hooks/user/useFirebaseUser';
import { DetailMoment } from 'components/detail-moment';
import { Loader } from 'components/create-moment/loader';

import { defaultLocale, dynamicActiveLocale } from 'lib/i18n';

import { BottomSheet } from 'components/bottom-sheet';
import { useWindowSize } from 'hooks/use-window-size';

import 'styles/global-tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { height } = useWindowSize();
	const [currentMoment, setCurrentMoment] = React.useState<Moment | null>(null);
	const [isCreatingMoment, setIsCreatingMoment] = React.useState<boolean>(
		false
	);
	const user = useFirebaseUser();

	const handleCreateMoment = async (
		variables: CreateMomentVariables,
		images: File[] = [],
		videos: File[] = [],
		audios: File[] = []
	) => {
		setIsCreatingMoment(true);
		let correctImages = null;
		let correctVideos = null;
		let correctNoteVoices = null;
		if (images.length) {
			correctImages = await uploadFiles(images);
		}
		if (videos.length) {
			correctVideos = await uploadFiles(videos);
		}
		if (audios.length) {
			correctNoteVoices = await uploadFiles(audios);
		}
		await createMoment({
			token: user?.token || '',
			variables: {
				...variables,
				images: correctImages,
				videos: correctVideos,
				note_voices: correctNoteVoices,
			},
		});
		setIsCreatingMoment(false);
	};

	React.useEffect(() => {
		if (currentMoment) {
			const scrollY = `${window.scrollY}px`;
			document.body.style.position = 'fixed';
			document.body.style.width = '100%';
			document.body.style.top = `-${scrollY}`;
		} else {
			const scrollY = document.body.style.top;
			document.body.style.position = '';
			document.body.style.top = '';
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		}
	}, [currentMoment]);

	React.useEffect(() => {
		dynamicActiveLocale(router.locale || defaultLocale);
		momentjs.locale(router.locale);
	}, [router.locale]);

	return (
		<ThemeProvider attribute="class">
			<I18nProvider i18n={i18n}>
				<UserContext.Provider value={user}>
					<IsCreatingMomentContext.Provider
						value={{ isCreatingMoment, handleCreateMoment }}
					>
						<CurrentMomentContext.Provider
							value={{ currentMoment, setCurrentMoment }}
						>
							<Head>
								<meta
									name="viewport"
									content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
								/>
							</Head>
							<div
								style={{
									minHeight: height ? `${height}px` : '100vh',
									// paddingBottom: !router.pathname.includes('create')
									// 	? '100px'
									// 	: '0',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<Component {...pageProps} />
								<BottomSheet
									shouldOpen={!!currentMoment}
									onCloseCallback={() => setCurrentMoment(null)}
								>
									{({ onClose }) => <DetailMoment closeBottomSheet={onClose} />}
								</BottomSheet>
								{isCreatingMoment && <Loader />}
							</div>
						</CurrentMomentContext.Provider>
					</IsCreatingMomentContext.Provider>
				</UserContext.Provider>
			</I18nProvider>
		</ThemeProvider>
	);
}

export default MyApp;
