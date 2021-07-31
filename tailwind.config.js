module.exports = {
	mode: 'jit',
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./hooks/use-modal.tsx',
	],
	darkMode: false,
	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			serif: ['Source Serif Pro', 'serif'],
		},
		extend: {
			borderRadius: {
				'2.5xl': '1.25rem',
				'1.2lg': '0.625rem',
			},
			colors: {
				offwhite: 'var(--color-offwhite)',
				placeholder: 'var(--color-placeholder)',
				delete: 'var(--color-delete)',
				dark: {
					DEFAULT: 'var(--color-dark-default)',
					50: 'var(--color-dark-50)',
				},
				light: {
					DEFAULT: '#FFFFFF',
				},
				background: {
					DEFAULT: 'var(--color-background)',
					nav: 'var(--color-background-nav)',
					card: 'var(--color-background-card)',
					thanks: 'var(--color-background-thanks-card)',
					rocket: 'var(--color-background-rocket-smoke)',
					input: 'var(--color-background-input)',
				},
				primary: {
					DEFAULT: 'var(--color-primary-default)',
					light: 'var(--color-primary-light)',
					dark: 'var(--color-primary-dark)',
					60: 'var(--color-primary-60)',
					40: 'var(--color-primary-40)',
					20: 'var(--color-primary-20)',
					10: 'var(--color-primary-10)',
				},
				secondary: {
					DEFAULT: 'var(--color-secondary-default)',
					light: 'var(--color-secondary-light)',
					dark: 'var(--color-secondary-dark)',
				},
				content: {
					note: 'var(--color-content-note)',
					thank: 'var(--color-content-thank)',
					image: 'var(--color-content-image)',
					video: 'var(--color-content-video)',
					voice: 'var(--color-content-voice)',
				},
				graph: {
					from: 'rgba(148, 99, 62, 0.4)',
					to: 'rgba(148, 99, 62, 0.05)',
				},
			},
		},
	},
	variants: {
		extend: {
			borderColor: ['hover'],
			textColor: ['group-focus'],
		},
	},
	plugins: [
		// 'tailwindcss-theming'
	],
};
