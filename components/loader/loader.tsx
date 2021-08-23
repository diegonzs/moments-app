import { useTheme } from 'next-themes';
import * as React from 'react';
import Spinner from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Loader: React.FC = () => {
	const { theme } = useTheme();
	return (
		<div className="flex items-center justify-center w-full h-full flex-grow">
			<Spinner
				type="Rings"
				visible={true}
				color={theme === 'light' ? '#110906' : '#f2f2f2'}
				height={250}
				width={250}
			/>
		</div>
	);
};
