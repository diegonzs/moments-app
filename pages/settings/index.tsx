import * as React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Trans, t } from '@lingui/macro';
import { firebaseClient } from 'lib';
import { Alert } from 'components/alert';
import { Toggle } from 'components/forms';
import { SecondaryCard } from 'components/insightsv3';
import { Layout } from 'components/layout/layout';
import { Subtitle, Title } from 'components/typography';
import { useModal } from 'hooks/use-modal';
import { useUser } from 'hooks/user/useUser';
import { LangSelection } from 'components/lang-selection';
import { Icon } from 'components/icon';

const Settings: React.FC = () => {
	const user = useUser();
	const router = useRouter();
	const { show, hide, isShow, Modal } = useModal();
	const [modalType, setModalType] = React.useState<'lang' | 'logout'>('lang');
	const { theme, setTheme } = useTheme();

	React.useEffect(() => {
		if (!user) {
			router.push('/auth');
		}
	}, [user]);

	return (
		<Layout className="bg-background">
			<div className="flex justify-between mt-8 px-5">
				<Title type="2" className="flex items-center">
					<div className="mr-4" onClick={() => router.push('/')}>
						<Icon src="/images/icons/back-arrow.svg" pointer />
					</div>
					<Trans>Settings</Trans>
				</Title>
				<div onClick={() => router.push('/settings/billing')}>
					<Subtitle type="1" className="text-secondary cursor-pointer">
						<Trans>Upgrade to PRO</Trans>
					</Subtitle>
				</div>
			</div>
			<ul className="grid gap-3 content-start mt-10 px-5">
				<SecondaryCard
					href="/settings/reminders"
					title={t`Reminders`}
					icon="⏰"
				/>
				<SecondaryCard
					href="/settings/billing"
					title={t`Billing. Get PRO`}
					icon="💳️"
				/>

				{/* THEME */}
				<div className="flex items-center justify-between px-6 h-16 bg-background-nav rounded-2.5xl">
					<div className="flex items-center">
						<span className="mr-5 text-2xl">🌙</span>
						<Subtitle type="2" className="text-primary">
							<Trans>Dark Theme</Trans>
						</Subtitle>
					</div>
					<Toggle
						isActive={theme === 'dark'}
						onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
					/>
				</div>

				{/* Multilang */}
				<div
					className="flex items-center justify-between px-6 h-16 bg-background-nav rounded-2.5xl cursor-pointer"
					onClick={() => {
						setModalType('lang');
						show();
					}}
				>
					<div className="flex items-center">
						<span className="mr-5 text-2xl">🗣</span>
						<Subtitle type="2" className="text-primary">
							<Trans>Laguage</Trans>
						</Subtitle>
					</div>
					<Subtitle type="3">
						{router.locale === 'en' ? t`English` : t`Spanish`}
					</Subtitle>
				</div>
				<a href="mailto:diego.ags04@gmail.com">
					<div className="flex items-center px-6 h-16 bg-background-nav rounded-2.5xl">
						<span className="mr-5 text-2xl">💡</span>
						<Subtitle type="2" className="text-primary">
							<Trans>Leave Feedback</Trans>
						</Subtitle>
					</div>
				</a>
				<a href="mailto:diego.ags04@gmail.com">
					<div className="flex items-center px-6 h-16 bg-background-nav rounded-2.5xl">
						<span className="mr-5 text-2xl">💬</span>
						<Subtitle type="2" className="text-primary">
							<Trans>Contact Us</Trans>
						</Subtitle>
					</div>
				</a>
				<div
					className="flex items-center px-6 h-16 bg-background-nav rounded-2.5xl cursor-pointer"
					onClick={() => {
						setModalType('logout');
						show();
					}}
				>
					<span className="mr-5 text-2xl">😴</span>
					<Subtitle type="2" className="text-primary">
						<Trans>Log out</Trans>
					</Subtitle>
				</div>
			</ul>
			<Subtitle type="3" className="text-center mt-4 text-primary-60">
				{user?.email}
			</Subtitle>
			<Modal isShow={isShow}>
				{modalType === 'logout' && (
					<Alert
						title={t`Are you sure?`}
						description={t`You will close your account session for this device.`}
						cancelText={t`Cancel`}
						successText={t`Log out`}
						closeAlert={hide}
						onClickSuccess={() => firebaseClient.auth().signOut()}
					/>
				)}
				{modalType === 'lang' && <LangSelection hideModal={hide} />}
			</Modal>
			{/* <NavBar /> */}
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const isAuth = context.req.cookies?.auth;

	if (!isAuth) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default Settings;
