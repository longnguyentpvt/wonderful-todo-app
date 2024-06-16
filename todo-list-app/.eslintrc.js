module.exports = {
  extends: [
    "../dev-configs/base.eslintrc.json",
    "next"
  ],
  rules: {
    "react/jsx-indent" : ["error", 2, { "checkAttributes": true }],
    "react/jsx-indent-props" : ["error", 2],
    "react/jsx-closing-bracket-location": [
      "error",
      "after-props"
    ],
    "react/jsx-curly-spacing": [
      "error",
      {
        "when": "always",
        "children": true
      }
    ],
    "react/jsx-tag-spacing": [
      "error",
      {
        "beforeSelfClosing": "always"
      }
    ],
    "react/jsx-filename-extension": [0, { "extensions": [".tsx"] }],
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          "../../*",
          "../apis",
          "../components",
          "../data",
          "../hooks",
          "../models",
          "../template",
          "../pages",
          "../services",
          "../utils",
          "../styles",
          "../types"
        ]
      }
    ],
    "import-helpers/order-imports": [
      "error",
      {
        newlinesBetween: "always",
        groups: [
          "module",
          "/^@app/template/",
          "/^@app/components/",
          "/^@app/hooks/",
          "/^@app/types/",
          "/^@app/data/",
          "/^@app/apis/",
          "/^@app/services/",
          "/^@app/models/",
          "/^@app/utils/",
          "/^@app/styles/"        ],
        alphabetize: { order: "asc", ignoreCase: true }
      }
    ]
  },
  parserOptions: {
    project: "./tsconfig.json"
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json"
      }
    }
  }
}
