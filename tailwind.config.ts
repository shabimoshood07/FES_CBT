import type { Config } from 'tailwindcss';
// import colors from 'tailwindcss/colors';
import primeui from 'tailwindcss-primeui';

export default <Partial<Config>>{
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFEEEE',
        secondary: '#520000',
        Dark_Text: '#333333',
        Light_Text: '#FFFFFF',
        Neutral_Gray: '#CCCCCC',
        Success: '#4CAF50',
        Error: '#F44336',
        Warning: '#FFC107',
        Primary_Variation: '#FFE0E0',
        Off_White: '#F9F9F9',
        text: {
          100: '#99AD9B',
        },
        warning: {
          50: '#f5e4f2',
          100: '#eb7f7f',
          200: '#ffd4dd',
        },
      },
    },
  },
  plugins: [primeui],
};
