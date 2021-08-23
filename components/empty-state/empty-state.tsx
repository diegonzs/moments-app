import { BodyText } from 'components/typography';
import { useTheme } from 'next-themes';
import * as React from 'react';
import SVG from 'react-inlinesvg';

interface EmptyStateProps {
	ilustration: string;
	darkIlustration?: string;
	ilustrationSize?: string;
	description: string | React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
	ilustration,
	darkIlustration,
	ilustrationSize = '269',
	description,
}) => {
	const { theme } = useTheme();

	const currentIlustration = React.useMemo(() => {
		if (theme === 'dark' && !!darkIlustration) {
			return darkIlustration;
		}
		return ilustration;
	}, [ilustration, darkIlustration, theme]);

	return (
		<div className="flex items-center justify-center w-full h-full flex-grow">
			<div
				className="flex flex-col items-center px-5"
				style={{ maxWidth: 366 }}
			>
				<SVG src={currentIlustration} width={ilustrationSize} />
				<BodyText className="mt-6 text-center text-primary-60">
					{description}
				</BodyText>
			</div>
		</div>
	);
};
