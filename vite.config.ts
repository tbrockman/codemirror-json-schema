import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "happy-dom",
    maxConcurrency: 10,
    // configuration to be able to view console.log messages while debugging
    pool: "forks",
    disableConsoleIntercept: Boolean(process.env.CI),
  },
});
