/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",   // Azul eléctrico
        secondary: "#10B981", // Verde esmeralda
        accent: "#F87171",    // Rojo coral
        dark: "#0F172A",      // Fondo oscuro
      },
      fontFamily: {
        inter: ["Inter_400Regular"],
        interBold: ["Inter_700Bold"],
        poppins: ["Poppins_400Regular"],
        poppinsBold: ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
};
