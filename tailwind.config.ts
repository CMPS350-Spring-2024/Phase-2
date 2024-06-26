import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	important: true,
	content: ['./src/**/*.{html,js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				title: '#1F2937',
				secondary: '#6B7280',
				border: '#E5E7EB',
				rating: '#EAB308',
			},
			fontSize: {
				'2xs': '.625rem',
				'xs': '.75rem',
			},
			fontFamily: {
				sans: ['"Source Sans Pro"', 'sans-serif'],
				serif: ['"Source Serif Pro"', 'serif'],
				display: ['"Montserrat"', 'sans-serif'],
			},
			strokeWidth: {
				3: '3px',
				4: '4px',
				5: '5px',
				6: '6px',
			},
			boxShadow: {
				sm: '0px 6px 12px 0px rgba(0, 0, 0, 0.03)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		plugin(({ addVariant }) => {
			addVariant('focus-hover', ['&:focus', '&:hover']);
			addVariant('group-focus-hover', [':merge(.group):focus &', ':merge(.group):hover &']);
		}),
	],
} as Config;
