module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}',
  ],
  output: './src/locales',
  options: {
    debug: true,
    removeUnusedKeys: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    lngs: ['en', 'ko'],
    defaultLng: 'en',
    defaultNs: 'translation',
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
    },
    keySeparator: false,
    nsSeparator: false,
  },
};