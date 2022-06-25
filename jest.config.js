module.exports = {
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
     "/node_modules/"
  ],
  moduleFileExtensions: [
   "js",
   "ts"
  ],
  roots: [
     "<rootDir>/tests"
  ],
  runner: "jest-runner",
  testEnvironment: "node",
};
