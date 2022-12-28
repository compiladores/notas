import { app } from "./client";

export async function getRuns(repo:string){
    for await (const { octokit, repository } of app.eachRepository.iterator()) {
        console.log({ octokit, repository })
        const runs = await octokit.rest.actions.listWorkflowRunsForRepo({
            owner:"compiladores",
            repo,
            status:"completed",
        })
        return runs.data.workflow_runs.map(run => ({
            conclusion:run.conclusion,
            runNumber:run.run_number,
            url:run.html_url,
            updatedAt:run.updated_at
        }))
    }
    console.log("fin!")
    return null
    
    
}