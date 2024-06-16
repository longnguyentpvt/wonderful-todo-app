module.exports = {
  extends: [
    "../dev-configs/base.eslintrc.json"
  ],
  rules: {
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          "../../*",
          "../controllers",
          "../services",
          "../db",
          "../data",
          "../utils",
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
          "/^@app/controllers/",
          "/^@app/services/",
          "/^@app/db/",
          "/^@app/data/",
          "/^@app/utils/",
          "/^@app/types/"        
        ],
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
