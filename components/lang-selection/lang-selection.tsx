import { t, Trans } from '@lingui/macro';
import { HeadPage } from 'components/head-page';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Subtitle } from 'components/typography';
import { Icon } from 'components/icon';
import Cookies from 'js-cookie';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

type LangSelectionProps = {
	hideModal: () => void;
};

export const LangSelection: React.FC<LangSelectionProps> = ({ hideModal }) => {
	const router = useRouter();
	const onChangeLang = () => {
		const newLocale = router.locale === 'es' ? 'en' : 'es';
		Cookies.set('NEXT_LOCALE', newLocale, {
			expires: 1 * 365,
			sameSite: 'Strict',
		});
		router.push(router.pathname, router.pathname, {
			locale: newLocale,
		});
		hideModal();
	};
	const { theme } = useTheme();
	return (
		<div
			className={clsx(
				'absolute top-0 right-0 left-0 overflow-y-auto grid content-start w-full h-full bg-background',
				theme
			)}
		>
			<HeadPage title={t`Language`} href="/settings" onClick={hideModal} />
			<div className="self-start px-5">
				<div
					className="flex justify-between items-center mb-4 cursor-pointer"
					onClick={onChangeLang}
				>
					<Subtitle type="1">
						🇺🇸 <Trans>English</Trans>
					</Subtitle>
					{router.locale === 'en' && <Icon src="/images/icons/check.svg" />}
				</div>
				<div className="border w-full border-primary-10"></div>
				<div
					className="flex justify-between items-center mb-4 mt-3 cursor-pointer"
					onClick={onChangeLang}
				>
					<Subtitle type="1">
						🇪🇸 <Trans>Spanish</Trans>
					</Subtitle>
					{router.locale === 'es' && <Icon src="/images/icons/check.svg" />}
				</div>
				<div className="border w-full border-primary-10"></div>
			</div>
		</div>
	);
};
