/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',               // Aquí tu carpeta app donde están las páginas
    './src/features/**/*.{ts,tsx,js,jsx}',      // Carpeta donde tienes los features y componentes
    './shared/components/**/*.{ts,tsx,js,jsx}', // También la carpeta shared si tienes componentes ahí
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#F0F5FF',    // Fondo principal azul claro
          bgAlt: '#FFF8F0', // Fondo alternativo beige
          main: '#4B6BFF',  // Azul principal
          accent: '#34D399', // Verde complementario
        },
        secondary: {
          purple: '#8B5CF6', // Violeta suave
          coral: '#FF6B6B',  // Coral
        },
        text: {
          title: '#1F2937',   // Gris oscuro para títulos
          body: '#4B5563',    // Gris medio para texto principal
          light: '#6B7280',   // Gris claro para texto secundario
        },
        feedback: {
          success: '#10B981', // Verde suave
          error: '#EF4444',   // Rojo suave
          warning: '#F59E0B', // Amarillo cálido
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#4B5563',
            h1: {
              color: '#1F2937',
            },
            h2: {
              color: '#4B6BFF',
            },
            h3: {
              color: '#1F2937',
            },
            strong: {
              color: '#4B6BFF',
            },
            ul: {
              li: {
                '&::marker': {
                  color: '#4B6BFF',
                },
              },
            },
            ol: {
              li: {
                '&::marker': {
                  color: '#4B6BFF',
                },
              },
            },
          },
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
