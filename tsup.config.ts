import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  // 生成 类型文件  .d.ts
  dts: true,
  sourcemap: false,
  clean: true,
  minify: false,
});
