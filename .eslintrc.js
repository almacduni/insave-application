module.exports = {
    root: true,
    extends: [
        "airbnb-typescript/base",
        "prettier",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:styled-components-a11y/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"], // could be tsconfig.json too
    },
    plugins: ["react", "react-native", "react-hooks", "@typescript-eslint", "import"],
    rules: {
        "quotes": [
            "error",
            "double",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ], // http://eslint.org/docs/rules/quotes
        // "prettier/prettier": ["error"],
        "import/prefer-default-export": "off",
        "import/newline-after-import": ["error", { "count": 1 }],
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "strict": [
            "error",
            "function"
        ],
        "no-trailing-spaces": "error",
        "eol-last": "error", // http://eslint.org/docs/rules/eol-last
        "@typescript-eslint/indent": [
            "error",
            "tab",
            {
                "SwitchCase": 0
            }
        ],
        "new-cap": [
            "error",
            {
                // http://eslint.org/docs/rules/new-cap
                "newIsCap": true,
                "capIsNew": false
            }
        ],
        "styled-components-a11y/no-autofocus": "off",
        "no-empty-function": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["off"],
        "arrow-body-style": ["error", "as-needed"],
        "arrow-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "brace-style": [
            "error", // http://eslint.org/docs/rules/brace-style
            "1tbs",
            {
                "allowSingleLine": true
            }
        ],
        "camelcase": ["error", {
            "properties": "never"
        }],
        "comma-spacing": [
            "error",
            {
                // http://eslint.org/docs/rules/comma-spacing
                "before": false,
                "after": true
            }
        ],
        "comma-style": [
            "error",
            "last"
        ], // http://eslint.org/docs/rules/comma-style
        "key-spacing": ["error", {
            "beforeColon": false,
            "afterColon": true
        }], // http://eslint.org/docs/rules/key-spacing
        "newline-after-var": ["error", "always"],
        "newline-before-return": "error",
        "no-multiple-empty-lines": ["error", {
            "max": 1
        }],
        "no-mixed-spaces-and-tabs": "error", // http://eslint.org/docs/rules/no-mixed-spaces-and-tabs
        "no-multi-spaces": "error",
        "no-nested-ternary": "error", // http://eslint.org/docs/rules/no-nested-ternary
        "no-new-object": "error", // http://eslint.org/docs/rules/no-new-object
        "no-spaced-func": "error", // http://eslint.org/docs/rules/no-spaced-func
        "no-extra-parens": "off", // http://eslint.org/docs/rules/no-extra-parens
        "no-useless-escape": "off", //http://eslint.org/docs/rules/no-useless-escape
        "object-curly-spacing": ["error", "always"],
        "one-var": [
            "error",
            "never"
        ], // http://eslint.org/docs/rules/one-var
        "semi": [
            "error",
            "always"
        ], // http://eslint.org/docs/rules/semi
        "semi-spacing": [
            "error",
            {
                // http://eslint.org/docs/rules/semi-spacing
                "before": false,
                "after": true
            }
        ],
        "keyword-spacing": "error", // http://eslint.org/docs/2.0.0/rules/keyword-spacing
        "space-before-blocks": "error", // http://eslint.org/docs/rules/space-before-blocks
        "space-before-function-paren": [
            "error",
            {
                // http://eslint.org/docs/rules/space-before-function-paren
                "anonymous": "always",
                "named": "always"
            }
        ],
        "space-infix-ops": "error", // http://eslint.org/docs/rules/space-infix-ops,
        "space-in-parens": ["error", "never"],
        "no-underscore-dangle": "off", // http://eslint.org/docs/rules/no-underscore-dangle
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/naming-convention": ["error"],
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                // http://eslint.org/docs/rules/space-before-function-paren
                "anonymous": "always",
                "named": "always"
            }
        ],
        "react-hooks/exhaustive-deps": ["off", {
		    "additionalHooks": "useDispatch|useOtherHookWhichWillDefinitelyNotChange"
		}],
        "react/jsx-curly-spacing": ["error", {
            "when": "always"
        }],
        "react/jsx-indent": [1, "tab"],
        "react/jsx-indent-props": [1, "tab"],
        "react/jsx-no-bind": "off",
        "react/jsx-props-no-spreading": "off",
        "react/require-default-props": "off",
        "import/order": ["error", {
            "groups": [
                'external',
                ['parent', 'sibling']
            ],
            "pathGroups": [{
                "pattern": "**/*.scss",
                "group": "index",
                "position": "after"
            }],
            "newlines-between": "always"
        }],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": ["./src/redux/redux-store.ts"]}],
        "jsx-a11y/label-has-associated-control": "off",
    },
    env: {
        // es2021: true,
        node: true,
    },
    parserOptions: {
        "project": "tsconfig.json",
    },
    ignorePatterns: [
        ".eslintrc.js",
        "metro.config.js",
        "babel.config.js",
        "metro.config.js",
        "jest.config.js",
        "index.js"
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/', 'App.tsx'],
            },
        },
        'import/ignore': ['react-native'],
        "react": {
            "version": "detect",
        },
    }
};
