import { getGradesForSemester } from "./getGrades";
import { alumni, getAllRulesForSemester } from "./semester";

type Row = Record<string, any>;
type Entry = { name: string; content: any };
export async function getTableForSemester(): Promise<Row[]> {
  const grades = await getGradesForSemester();
  const rules = await getAllRulesForSemester();
  function getRuleById(ruleId: string) {
    return rules.find((r) => r.id === ruleId);
  }
  return alumni.map((alumn) => {
    const gradesForAlumn = grades.filter((g) => g.alumn === alumn);
    const gradeEntries: Entry[] = gradesForAlumn.flatMap((grade) => [
      { name: `${grade.ruleId}_fulfilled`, content: grade.fulfilled },
      { name: `${grade.ruleId}_reason`, content: grade.reason },
      { name: `${grade.ruleId}_reason_url`, content: grade.reasonUrl },
      {
        name: `${grade.ruleId}_score`,
        content: getRuleById(grade.ruleId)?.score,
      },
    ]);
    const totalScore = gradesForAlumn
      .filter((grade) => grade.fulfilled)
      .map((grade) => getRuleById(grade.ruleId)?.score)
      .reduce<number>(
        (accum, score) => (score === undefined ? accum : score + accum),
        0
      );
    const otherEntries: Entry[] = [
      { name: "alumn", content: alumn },
      {
        name: "totalScore",
        content: totalScore?.toString(),
      },
    ];
    return Object.fromEntries(
      [...gradeEntries, ...otherEntries].map(({ name, content }) => [
        name,
        content,
      ])
    );
  });
}
