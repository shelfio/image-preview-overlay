import type {Config} from 'jest';

const esmPackages = ['@shelf/hotkeys'];

const config: Config = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  transformIgnorePatterns: [`/node_modules/(?!(${esmPackages.join('|')})/)`],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  resolver: 'ts-jest-resolver',
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 100,
      lines: 100,
      statements: 94.11,
    },
  },
};

export default config;
