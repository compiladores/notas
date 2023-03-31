export interface ScoreRule {
  score: number;
  dueDate: string;
  type: "other" | "project";
  id: string;
  description: string;
}

export const alumni = [
  "anichucai",
  "FranFiuba",
  "jisbruzzi",
  "jm-velazquez",
  "josinger",
  "kevin-untrojb",
  "paulocesarcuneo",
  "TaielC",
  "francupp9-12",
];
export const projectsDueDates: Record<string, string> = {
  tpo1: "2023-04-11T23:59:00.000-03:00",
  tpo3: "2023-04-11T23:59:00.000-03:00",
  tpo4: "2023-05-02T23:59:00.000-03:00",
  tpo5: "2023-05-09T23:59:00.000-03:00",
  tpo7: "2023-06-06T23:59:00.000-03:00",

  tpx3: "2023-04-11T23:59:00.000-03:00",
  tpx1: "2023-05-02T23:59:00.000-03:00",

  lab1: "2023-03-15T21:05:00.000-03:00",
  lab2: "2023-03-22T21:05:00.000-03:00",
  lab3: "2023-03-29T21:05:00.000-03:00",
  lab5: "2023-04-19T21:05:00.000-03:00",
  lab6: "2023-05-03T21:05:00.000-03:00",
};

export const projectsScores: Record<string, number> = {
  lab1: 0.5,
  tpo1: 0.5,
  tpx1: 1.5,
  lab2: 0.5,
  lab3: 0.25,
  tpo3: 0.5,
  tpx3: 0.25,
  tpo4: 0.5,
  lab5: 1,
  tpo5: 0.5,
  lab6: 0.5,
  tpo7: 1,
};

export const otherRules: ScoreRule[] = [
  {
    description:
      "El alumno completó todos los tpo antes del final del cuatrimestre",
    dueDate: "2023-06-28T21:05:00.000-03:00",
    id: "tpoAll",
    score: 4,
    type: "other",
  },
];

export function getRepoName({
  alumn,
  project,
}: {
  project: string;
  alumn: string;
}) {
  return `${project}_1c23-${alumn}`;
}

export function getAllRulesForSemester(): ScoreRule[] {
  const projectRules = Object.keys(projectsDueDates).map(
    (project: string): ScoreRule => ({
      description: `El ${project} debe entregarse antes de ${projectsDueDates[project]}.`,
      dueDate: projectsDueDates[project],
      id: project,
      score: projectsScores[project],
      type: "project",
    })
  );
  return [...otherRules, ...projectRules];
}
