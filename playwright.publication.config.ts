import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/publication",
  workers: 2,
  retries: 0,
  reporter: [["list"], ["html", { outputFolder: "playwright-report-publication", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3016",
    ...devices["Desktop Chrome"],
    ...(process.env.PLAYWRIGHT_CHANNEL === "chrome" ? { channel: "chrome" } : {}),
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run preview:publication",
    env: { PUBLICATION_PORT: "3016" },
    url: "http://127.0.0.1:3016",
    reuseExistingServer: false,
  },
});
