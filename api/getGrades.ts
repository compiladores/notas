import { getAllStatusesForSemester } from "./getProjectStatus";
import { alumni, getAllRulesForSemester } from "./semester";

export interface Grade {
  alumn: string;
  ruleId: string;
  fulfilled: boolean;
  reason: string;
  reasonUrl: string | null;
  repoUrl: string | null;
}

export async function getGradesForSemester(): Promise<Grade[]> {
  const statuses = await getAllStatusesForSemester();
  const rules = getAllRulesForSemester();
  return alumni.flatMap((alumn) =>
    rules.flatMap((rule) => {
      function getStatus(project: string) {
        return statuses.find((s) => s.alumn === alumn && s.project === project);
      }
      const ruleId = rule.id;
      if (rule.type === "project") {
        const status = getStatus(ruleId);
        const successful = status?.conclusion === "success";
        const inTime =
          !!status?.updatedAt &&
          Date.parse(status.updatedAt) < Date.parse(rule.dueDate);
        return {
          alumn,
          ruleId,
          fulfilled: successful && inTime,
          reason:
            status?.conclusion === null
              ? "No se detectó una entrega"
              : (successful ? "Los tests pasaron" : "Los tests fallaron") +
                " y " +
                (inTime
                  ? "la entrega se hizo a tiempo"
                  : "la entrega se hizo tarde, " +
                    status?.updatedAt +
                    " >= " +
                    rule.dueDate),
          reasonUrl: status?.url ?? null,
          repoUrl: status?.repoUrl ?? null,
        };
      } else {
        if (ruleId === "tpoAll") {
          const allTpo = rules.filter(
            (r) => r.id.includes("tpo") && r.id !== "tpoAll"
          );
          const tpoStatuses = allTpo.map((rule) => getStatus(rule.id));
          const failed = tpoStatuses.filter(
            (s) =>
              !(
                s?.conclusion === "success" &&
                s?.updatedAt &&
                Date.parse(s?.updatedAt) < Date.parse(rule.dueDate)
              )
          );
          return {
            alumn,
            ruleId,
            fulfilled: failed.length === 0,
            reason:
              failed.map((s) => s?.project).join(", ") +
              " no fueron entregados a tiempo",
            reasonUrl: null,
            repoUrl: null,
          };
        } else {
          return {
            alumn,
            ruleId,
            fulfilled: false,
            reason: "No sé calcular estar regla",
            reasonUrl: null,
            repoUrl: null,
          };
        }
      }
    })
  );
}
