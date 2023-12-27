/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,tsx}"],
	theme: {
		screens: {
			lg: {max: "2000px"},
			md: {max: "767px"},
			sm: {max: "639px"},
		},
		extend: {
			colors: {
				"black-rgba": "rgba(0,0,0,0.5)",
				"white-rgba": "rgba(255,255,255,0.5)",
			},
			keyframes: {
				slideIn: {
					"0%": {transform: "translateX(50%)"},
					"100%": {transform: "none"},
				},
				slideOut: {
					"0%": {transform: "none"},
					"100%": {transform: "translateX(100%)"},
				},
				fadeIn: {
					"0%": {opacity: 0},
					"100%": {opacity: 1},
				},
				bellRing: {
					"0%": {transform: "rotate(-25deg)"},
					"25%": {transform: "rotate(50deg)"},
					"50%": {transform: "rotate(-50deg)"},
					"100%": {transform: "none"},
				},
			},
			animation: {
				slideIn: "slideIn .5s ease-in ",
				slideOut: "slideOut .5s ease-in ",
				fadeIn: "fadeIn .5ss ease-in-out",
				bellRing: "bellRing 2s ease-in",
			},
		},
	},
	plugins: [],
};
