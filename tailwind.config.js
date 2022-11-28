const disabledCss = {
  'code::before': false,
  'code::after': false,
  'blockquote p:first-of-type::before': false,
  'blockquote p:last-of-type::after': false,
  'pre': false,
  'code': false,
  'pre code': false,
  'code::before': false,
  'code::after': false,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        'DEFAULT': { css: disabledCss },
        'sm': { css: disabledCss },
        'lg': { css: disabledCss },
        'xl': { css: disabledCss },
        '2xl': { css: disabledCss },
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.53, -0.03, 0.43, 0.84)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};
