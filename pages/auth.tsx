import * as React from 'react';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';
import { firebaseClient } from 'lib';
import { BodyText, Caption, Title } from 'components/typography';
import { Button } from 'components/button';
import { useTheme } from 'next-themes';
import { useUser } from 'hooks/user/useUser';
import { t, Trans } from '@lingui/macro';

const Auth: React.FC = () => {
	const user = useUser();
	const router = useRouter();
	const { theme } = useTheme();
	// const [isLoading, setIsLoading] = React.useState(false);

	const handleSigninProvider = () => {
		// setIsLoading(true);
		const firebaseProvider = new firebaseClient.auth.GoogleAuthProvider();
		firebaseClient
			.auth()
			.signInWithPopup(firebaseProvider)
			.then(async () => {
				// setIsLoading(false);
				router.push('/');
			})
			.catch(function (error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log({ errorCode, errorMessage });
				// setIsLoading(false);
				return;
			});
	};

	React.useEffect(() => {
		if (user?.token) {
			router.push('/');
		}
	}, [user]);

	return (
		<div className="flex flex-grow flex-col items-center justify-between pb-8 px-8 w-full h-full bg-background">
			<div className="absolute right-0 top-0">
				<SVG
					src={
						theme === 'dark'
							? '/images/svgs/dark/auth-ilustration-dark.svg'
							: '/images/svgs/auth-ilustration.svg'
					}
					width="225"
					height="227"
				/>
			</div>
			<div className="z-10">
				<Title type="1" className="mb-6 pt-36 text-primary">
					<Trans>
						Welcome <br />
						to Moments
					</Trans>
				</Title>
				<BodyText type="3" className="text-primary-60">
					{t`Life is full of moments, some will be great, others don't, and some would be ok.`}
					<br />
					<br />
					<Trans>
						The best ones are full of details, we want you to start appreciating
						the beauty of each moment through your day and that you can remember
						the best.
					</Trans>
				</BodyText>
			</div>
			<div>
				<Button
					icon="/images/svgs/google-icon.svg"
					onClick={handleSigninProvider}
				>
					<Trans>Continue with Google</Trans>
				</Button>
				<div style={{ maxWidth: '289px', margin: '0 auto' }}>
					<Caption type="1" className="mt-4 text-center text-primary-60">
						<Trans>
							By continuing you are agree with our Terms and Conditions, and our
							Privacy Policies.
						</Trans>
					</Caption>
				</div>
			</div>
		</div>
	);
};

export default Auth;
