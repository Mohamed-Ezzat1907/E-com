/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "bg-main": " #f0f3f2",
        "text-main": "#0aad0a",
      },
      container: {
        center: true,
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
