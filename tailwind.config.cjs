const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			primary: '#0fb7a6',
			secondary: '#00e8d7',
			neutral: '#fafafa',
			darkBlue: '#293e72',
			dark: '#0c1c44',
			...colors
		},
		extend: {}
	},
	plugins: []
};
