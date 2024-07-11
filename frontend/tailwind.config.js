/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./.storybook/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			fontSize: {
				custom: "1.5rem",
			},
			animation: {
				bounce: "bounce 1s infinite",
			},
		},
	},
	plugins: [],
};
