/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        bgSec: "#e5e7eb",
        mainColor: "#0aad0a",
        hoverColor: " #15803d",
      },
    },
    container: { center: true },
  },
  plugins: [require("flowbite/plugin")],
};
