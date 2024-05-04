/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        audit:
          "linear-gradient( 50deg,#0f1f3d 5%, #0f1332 40%, #0f1332 70%, #0f1f3d 85%)",
      },
    },
  },
  plugins: [],
};
