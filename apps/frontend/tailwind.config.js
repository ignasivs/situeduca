/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',               // Aquí tu carpeta app donde están las páginas
    './src/features/**/*.{ts,tsx,js,jsx}',      // Carpeta donde tienes los features y componentes
    './shared/components/**/*.{ts,tsx,js,jsx}', // También la carpeta shared si tienes componentes ahí
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
