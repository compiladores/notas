import { getLastRunOfRepo } from "./getRuns";
import { alumni, getRepoName, otherRules, projectsDueDates } from "./semester";

export interface ProjectStatus {
  project: string;
  alumn: string;
  repoName: string;
  repoUrl: string;
  conclusion: string | null;
  url: string | null;
  updatedAt: string | null;
}

async function getProjectStatus({
  alumn,
  project,
}: {
  project: string;
  alumn: string;
}): Promise<ProjectStatus> {
  const repoName = getRepoName({ alumn, project });
  const { conclusion, updatedAt, url } = (await getLastRunOfRepo(repoName)) || {
    conclusion: null,
    url: null,
    updatedAt: null,
  };
  return {
    alumn,
    project,
    conclusion,
    updatedAt,
    url,
    repoName,
    repoUrl: `https://github.com/compiladores/${repoName}`,
  };
}

export async function getAllStatusesForSemester() {
  return Promise.all(
    alumni.flatMap((alumn) =>
      Object.keys(projectsDueDates).flatMap((project) =>
        getProjectStatus({ alumn, project })
      )
    )
  );
}
