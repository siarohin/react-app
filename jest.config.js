module.exports = {
  setupFiles: ["raf/polyfill", "<rootDir>/scripts/setupTests.js"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  snapshotResolver: "<rootDir>/scripts/setupSnapshot.js",
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/index.{ts,tsx}",
    "!**/constant*.ts",
    "!**/models/*",
    "!**/*-configuration.{ts, tsx}"
  ],
  coverageDirectory: "<rootDir>/coverage/",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
  },
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./coverage/html-report",
        filename: "test-report.html",
        expand: true
      }
    ]
  ]
};
