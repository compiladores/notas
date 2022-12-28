import { App } from "octokit";
export const app = new App({
  appId: process.env.GITHUB_APP_ID ??"asd",
  privateKey: process.env.GITHUB_TOKEN ?? "asd",
});