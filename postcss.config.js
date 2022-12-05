const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: ['postcss-import', 'tailwindcss', 'autoprefixer', ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])],
};
