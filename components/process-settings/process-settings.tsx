import { t } from '@lingui/macro';
import { HeadPage } from 'components/head-page';
import * as React from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { ToggleOption } from 'components/toggle-option';

type ProcessSettingsProps = {
	hideModal: () => void;
};

export const ProcessSettings: React.FC<ProcessSettingsProps> = ({
	hideModal,
}) => {
	const { theme } = useTheme();
	return (
		<div
			className={clsx(
				'absolute top-0 right-0 left-0 overflow-y-auto grid content-start w-full h-full bg-background',
				theme
			)}
		>
			<HeadPage title={t`Process Settings`} href="/" onClick={hideModal} />
			<div className="self-start px-5">
				<ToggleOption
					title={t`Active Rocket`}
					description={t`Is this process relevant to you right now?`}
					isActive={true}
					onToggle={() => null}
				/>
			</div>
		</div>
	);
};
