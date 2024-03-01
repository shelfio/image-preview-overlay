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
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default config;
