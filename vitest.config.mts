import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.tsx'],
    server: {
      deps: {
        // https://github.com/vercel/next.js/issues/77200
        inline: ['next-intl'],
      },
    },
    coverage: {
      // include: [...configDefaults.include],
      exclude: [
        ...configDefaults.exclude,
        'commitlint.config.js',
        'lint-staged.config.js',
        'next.config.ts',
        'postcss.config.mjs',
        '.next',
        'next-env.d.ts',
        'middleware.ts',
        'LocaleSwitcher.tsx',
        'LocaleSwitcherSelect.tsx',
        'request.ts',
      ],
    },
  },
});
