/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				textPrimary: '#FEFEFE',
				textSecondary: '#AFAFB2',
				background: '#0E0E0E',
			},
			fontFamily: {
				'Blitz': ['Blitz'],
				'Blitz-Bold': ['Blitz-Bold'],
			},
			screens: {
				'ssm': '500px',
			},
		},
	},
	plugins: [],
}
