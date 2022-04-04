module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: [
          "tsconfig.*?.json",
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:import/recommended",
        "plugin:@angular-eslint/recommended",
        "airbnb-typescript/base",
        "plugin:prettier/recommended"
      ],
      rules: {
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "lines-between-class-members": "off",
        "@typescript-eslint/unbound-method": [
          "error",
          {
            ignoreStatic: true,
          }
        ]
      }
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140 }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    },
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: './src/tsconfig.spec.json',
      },
      extends: ['plugin:jasmine/recommended'],
      plugins: ['jasmine'],
      env: { jasmine: true },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    }
  ]
}
