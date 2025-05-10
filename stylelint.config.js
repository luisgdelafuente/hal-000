module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    // Disallow hex colors to enforce use of CSS variables or Tailwind tokens
    'color-no-hex': true,
    // Disallow !important to keep styles maintainable
    'declaration-no-important': true,
    // Enforce naming convention for CSS custom properties (variables)
    'custom-property-pattern': '^--[a-z-]+$',
    // Order properties for consistency
    'order/properties-order': [
      [
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'display',
        'flex',
        'flex-direction',
        'justify-content',
        'align-items',
        'width',
        'height',
        'padding',
        'margin',
        'background',
        'background-color',
        'color',
        'font-size',
        'font-weight',
        'border',
        'border-radius',
        'box-shadow',
        'z-index',
        'overflow',
        'transition',
      ],
    ],
  },
};
