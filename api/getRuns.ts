import { app } from "./client";

interface RunResult {
  conclusion: string | null;
  runNumber: number;
  url: string;
  updatedAt: string;
}

export async function getRunsOfRepo(repo: string): Promise<RunResult[]> {
  console.log("arranca");
  for await (const { octokit } of app.eachInstallation.iterator()) {
    try {
      const runs = await octokit.rest.actions.listWorkflowRunsForRepo({
        owner: "compiladores",
        repo,
        status: "completed",
      });
      return runs.data.workflow_runs.map((run) => ({
        conclusion: run.conclusion,
        runNumber: run.run_number,
        url: run.html_url,
        updatedAt: run.created_at,
      }));
    } catch (e) {
      console.log("Not found " + repo);
      return [];
    }
  }
  return [];
}
export async function getLastRunOfRepo(repo: string) {
  const runs = await getRunsOfRepo(repo);
  return runs.reduce<RunResult | null>((accum, value) => {
    if (accum === null || accum.updatedAt < value.updatedAt) {
      return value;
    } else {
      return accum;
    }
  }, null);
}
