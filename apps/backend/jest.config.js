/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["**/__tests__/**/*.(spec|test).[jt]s?(x)"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  };
  