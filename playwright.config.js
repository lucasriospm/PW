import { defineConfig } from "@playwright/test";
import { config as dotenvConfig } from "dotenv";
//import * as utils from "./utils.js";
import path from 'path';

dotenvConfig();
console.log("Loading Playwright Config...");

const config = defineConfig({
   testDir: './playwright/tests/',
   use: {
    video: "retain-on-failure",
    screenshot: 'retain-on-failure',
    outputDir: './test-results/',
    headless: true,
    browserName: process.env.BROWSER_TYPE || 'chromium', // Default to Chromium
    actionTimeout: Number(process.env.ACTION_TIMEOUT) || 45000,
    //storageState: './sessions/SessionState.json',
  },
  timeout: 120000,
  retries: 0,
  workers: 4,
  //maxFailures: 2,
  //globalSetup: path.resolve(utils.__dirname, './playwright/global-setup.ts'), 
  //globalTeardown: path.resolve(utils.__dirname, './playwright/global-teardown.ts'),
});

console.log("Loaded Playwright config");

export default config;
