module.exports = {
    input: [
      'src/**/*.{js,jsx,ts,tsx}',
      // Add other file extensions if needed
    ],
    output: './src/locales',
    options: {
      debug: true,
      removeUnusedKeys: true,
      func: {
        list: ['i18next.t', 'i18n.t', 't'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      lngs: ['en', 'ko'], // Languages to support
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