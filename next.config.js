const path = require('path');
const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development',
	},
	i18n: {
		locales: ['en', 'es'],
		defaultLocale: 'en',
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.po/,
			use: [
				options.defaultLoaders.babel,
				{
					loader: '@lingui/loader',
				},
			],
		});
		return config;
	},
});
