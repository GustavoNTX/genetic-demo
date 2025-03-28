/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Garante que Tailwind processe os arquivos
  theme: {
    extend: {}, // Aqui você pode customizar estilos no futuro
  },
  plugins: [],
};
