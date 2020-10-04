module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'responsive'],
      },
    ],
    'declaration-empty-line-before': 'never',
    'order/properties-alphabetical-order': true,
  },
};
