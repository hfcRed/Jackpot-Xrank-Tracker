/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				textPrimary: '#FEFEFE',
				textSecondary: '#AFAFB2',
				background: '#1A1212',
				backgroundDark: '#0D0000',
			},
			fontFamily: {
				'Blitz': ['Blitz'],
				'Blitz-Bold': ['Blitz-Bold'],
			},
			screens: {
				'ssm': '500px',
			},
			dropShadow: {
				'logo': ['-10px -10px 200px #66FAF6', '10px 10px 50px #ff00ff'],
				'crown': ['0px 0px 200px #F54910', '0px 0px 50px #F54910', '0px 150px 200px #F54910'],
			}
		},
	},
	plugins: [],
}
