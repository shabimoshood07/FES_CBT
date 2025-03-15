// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // ...other rules...
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any', // Allow self-closing on void elements
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
});
