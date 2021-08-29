import { t } from '@lingui/macro';
import { HeadPage } from 'components/head-page';
import * as React from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { ToggleOption } from 'components/toggle-option';
import { toggleActiveProcess } from 'gql/mutations/toggle-active-process';
import { useUser } from 'hooks/user/useUser';

type ProcessSettingsProps = {
	hideModal: () => void;
	processId: string;
	processStatus: boolean;
	onSucess: () => void;
};

export const ProcessSettings: React.FC<ProcessSettingsProps> = ({
	hideModal,
	processId,
	processStatus,
	onSucess,
}) => {
	const { theme } = useTheme();
	const user = useUser();
	const token = user?.token || '';
	const [loading, setLoading] = React.useState(false);

	const handleToggle = async () => {
		setLoading(true);
		await toggleActiveProcess({
			token,
			id: processId,
			activeStatus: !processStatus,
		});
		onSucess();
		setLoading(false);
	};

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
					isActive={processStatus}
					isDisabled={loading}
					onToggle={handleToggle}
				/>
			</div>
		</div>
	);
};
