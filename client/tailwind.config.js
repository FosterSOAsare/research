/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/*.tsx", "./src/**/*.tsx", "./src/**/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				clash: ["'Clash Display' , sans-serif"],
				axiforma: ["'Axiforma Regular' , sans-serif"],
			},
		},
	},
	plugins: [],
};
