module.exports = {
  verbose: true,
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    "@models(.*)$": "<rootDir>/src/db/models/$1",
    "@utils(.*)$": "<rootDir>/src/utils/$1",
    "@middle(.*)$": "<rootDir>/src/middleware/$1",
  },
  coveragePathIgnorePatterns: ["<rootDir>/src/__tests__/setup.js"],
};
