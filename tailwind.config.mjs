/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				textPrimary: '#FEFEFE',
				textSecondary: '#AFAFB2',
				background: '#1C1E2B',
				backgroundDark: '#161821',
				backgroundDarker: '#11121A',
				backgroundLight: '#252433',
				backgroundLighter: '#46394C',
				border: '#393C4C',
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
			},
			borderWidth: {
				'1': '1px',
			},
			backgroundImage: {
				shine: 'radial-gradient(500px 100px at 50% 0%, rgba(55, 55, 75, 0.25) 0%, rgba(20, 30, 50, 0) 100%)'
			}
		},
	},
	plugins: [],
}
