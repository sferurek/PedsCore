import type { Scenario, State } from "../engine/types";
import { sources } from "../sources/registry";
export const formatTime = (t: number) =>
  `${Math.floor(t / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(t % 60)
    .toString()
    .padStart(2, "0")}`;
export function buildDebrief(s: State, scenario: Scenario) {
  const timeline = [...s.events].sort((a, b) => a.at - b.at);
  const first = (action: string) => timeline.find((e) => e.action === action);
  const effective = timeline.find(
    (e) => e.label === "Primera ventilación eficaz en el modelo",
  );
  const reflections: string[] = [];
  if (!first("ppv")) reflections.push("No se inició VPPI durante el caso.");
  if (first("ppv") && first("ppv")!.at > 60)
    reflections.push(
      "Revisa en la cronología qué demoró el inicio de ventilación más allá del primer minuto.",
    );
  if (
    first("correct") &&
    (!first("chest") || first("correct")!.at < first("chest")!.at)
  )
    reflections.push(
      "Se corrigió ventilación sin registrar antes una comprobación torácica.",
    );
  if (
    first("clamp") &&
    (!first("initial") || first("clamp")!.at < first("initial")!.at)
  )
    reflections.push(
      "El pinzamiento precedió a completar las medidas iniciales de S1.",
    );
  if (
    timeline.some(
      (e) =>
        e.action === "compress" &&
        ((e.snapshot?.hr ?? 0) >= 60 || !effective || e.at < effective.at + 30),
    )
  )
    reflections.push(
      "Se iniciaron compresiones antes de constatar bradicardia persistente tras ventilación eficaz. Revisa la secuencia con el instructor.",
    );
  if (timeline.some((e) => e.action === "stopPpv" && !e.snapshot?.breathing))
    reflections.push(
      "Hubo retirada de VPPI cuando todavía no había respiración espontánea.",
    );
  if (
    timeline.some(
      (e) => e.action === "oxygenUp" && (!effective || e.at < effective.at),
    )
  )
    reflections.push(
      "Se aumentó oxígeno antes de conseguir ventilación eficaz.",
    );
  if (s.reassessedAt === null)
    reflections.push(
      "No consta una reevaluación completa posterior a la recuperación (FC, respiración y tono).",
    );
  if (s.support.ppv)
    reflections.push("La VPPI continuaba activa al finalizar.");
  if (s.support.compressed)
    reflections.push("Las compresiones continuaban activas al finalizar.");
  const heat = s.preflight.items.find((x) => x.id === "heat");
  if (heat?.fault && !heat.corrected)
    reflections.push(
      "El calentador quedó sin activar. El riesgo térmico se registra, pero la temperatura no está modelada en S1.",
    );
  return {
    reason: s.reason,
    duration: s.time,
    timeline,
    reflections,
    milestones: [
      ["Inicio VPPI", first("ppv")?.at],
      ["VPPI eficaz", effective?.at],
      [
        "FC >100",
        timeline.find((e) => e.label === "FC interna supera 100 lpm")?.at,
      ],
      ["Respiración espontánea", s.recoveryAt ?? undefined],
    ] as const,
    preparation: s.preflight,
    cards: scenario.debriefRules.map((rule) => {
      const events = timeline.filter(
        (e) => e.action && rule.actions.includes(e.action),
      );
      return {
        ...rule,
        source: sources[rule.sourceId],
        action: events.length
          ? events.map((e) => `${formatTime(e.at)} · ${e.label}`).join(" / ")
          : "Sin acciones registradas en este dominio.",
        consequence:
          rule.id === "recovery"
            ? s.reason === "endpoint"
              ? "Se alcanzó el endpoint docente."
              : "El caso terminó antes del endpoint docente."
            : rule.id === "ventilation"
              ? effective
                ? `El modelo registra ventilación eficaz a ${formatTime(effective.at)}.`
                : "No se registró ventilación eficaz."
              : events.length
                ? events
                    .map(
                      (e) =>
                        `${formatTime(e.at)}: FC interna ${Math.round(e.snapshot!.hr)} lpm; SpO₂ interna ${Math.round(e.snapshot!.spo2)}%; FiO₂ ${Math.round((e.fio2 ?? 0.21) * 100)}%.`,
                    )
                    .join(" ")
                : "Sin intervención registrada; la fisiología continuó evolucionando.",
      };
    }),
  };
}
export type Debrief = ReturnType<typeof buildDebrief>;
