/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				textPrimary: '#FEFEFE',
				textSecondary: '#AFAFB2',
				background: '#1A1212',
				backgroundDark: '#0D0909',
				backgroundLight: '#261B1B',
				backgroundLighter: '#663D3D',
			},
			fontFamily: {
				'Blitz': ['Blitz'],
				'Blitz-Bold': ['Blitz-Bold'],
			},
			screens: {
				'ssm': '500px',
			},
			dropShadow: {
				'logo': ['20px 20px 100px #ff00ff', '0px 0px 50px #ff00ff'],
				'crown': ['0px 0px 100px #F54910', '0px 0px 50px #F54910', '0px 150px 100px #F54910', '0px 250px 100px #F51081'],
				'filter': ['0px -75px 100px rgba(245, 16, 16, 0.25)'],
			}
		},
	},
	plugins: [],
}
