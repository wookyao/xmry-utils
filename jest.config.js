/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  // 以 <rootDir>/src 这个目录做为根目录来搜索测试文件（模块）
  roots: ['<rootDir>/src'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
