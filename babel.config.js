module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'packagejson',
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.d.ts'],
        root: ['./src'],
        alias: {
          // Common Files
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@features': './src/features',
          '@helpers': './src/helpers',
          '@hoc': './src/hoc',
          '@hooks': './src/hooks',
          '@model': './src/model',
          '@navigators': './src/navigators',
          '@services': './src/services',
          '@store': './src/store',
          '@styles': './src/styles',
          '@theme': './src/theme',
          '@translations': './src/translations',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
