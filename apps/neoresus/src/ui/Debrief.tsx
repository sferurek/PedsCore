import type { Debrief as Report } from "../debrief/report";
import { formatTime } from "../debrief/report";
import { sources } from "../sources/registry";
export function Debrief({
  report,
  onRestart,
}: {
  report: Report;
  onRestart: () => void;
}) {
  function download() {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "neoresus-s1-debrief.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <main className="debrief">
      <div className="page-intro">
        <div>
          <p className="eyebrow">DEBRIEFING · S1</p>
          <h1>Cada decisión cuenta.</h1>
          <p>
            Reconstruye el caso, interpreta la respuesta y decide qué practicar
            después.
          </p>
        </div>
        <div className="debrief-actions">
          <button onClick={download}>Exportar registro</button>
          <button className="primary" onClick={onRestart}>
            Nuevo caso →
          </button>
        </div>
      </div>
      <div className="finish-summary panel">
        <span>
          {report.reason === "endpoint"
            ? "Endpoint docente alcanzado"
            : report.reason === "timeout"
              ? "Tiempo máximo alcanzado"
              : "Finalización manual"}
        </span>
        <b>{formatTime(report.duration)}</b>
        <p>
          Sin nota global. La reflexión se organiza por decisiones y dominios.
        </p>
      </div>
      <div className="milestone-grid">
        {report.milestones.map(([name, time]) => (
          <div className="panel milestone" key={name}>
            <small>{name}</small>
            <b>{time === undefined ? "—" : formatTime(time)}</b>
          </div>
        ))}
      </div>
      <div className="debrief-columns">
        <section>
          <h2>Timeline clínica</h2>
          <p className="small-note">
            Ahora se muestran también los hitos internos del modelo.
          </p>
          <ol className="event-list full">
            {report.timeline.map((event, i) => (
              <li key={i}>
                <time>{formatTime(event.at)}</time>
                <div>
                  {event.label}
                  {event.internal ? (
                    <small>Estado interno · supuesto del simulador</small>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="decision-cards">
          <article className="panel decision">
            <p className="eyebrow">PREPARACIÓN</p>
            <h2>La cuna antes del nacimiento</h2>
            <p>
              <strong>Tu actuación:</strong>{" "}
              {report.preparation.items.filter((x) => x.checked).length} de{" "}
              {report.preparation.items.length} elementos revisados en{" "}
              {formatTime(report.preparation.elapsed)}.
            </p>
            <p>
              <strong>Qué ocurrió:</strong>{" "}
              {
                report.preparation.items.filter(
                  (item) => item.fault && !item.corrected,
                ).length
              }{" "}
              incidencias seguían pendientes al nacer. Las reparaciones
              posteriores figuran en la timeline clínica.
            </p>
            <ul>
              {report.preparation.items.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}:</strong>{" "}
                  {item.checked
                    ? `revisado a ${formatTime(item.checkedAt ?? 0)}`
                    : "sin revisar"}
                  {item.fault
                    ? ` · ${item.fault} · ${item.corrected ? "corregido" : "pendiente"}`
                    : ""}
                  {item.correctedAt !== undefined
                    ? ` a ${formatTime(item.correctedAt)}`
                    : ""}
                </li>
              ))}
            </ul>
            <p>
              <strong>Qué recomienda SENeo:</strong> preparar el material y
              acordar un plan en el briefing.
            </p>
            <p>
              <strong>Por qué:</strong> anticipar la disponibilidad de recursos
              durante las intervenciones.
            </p>
            <a href={sources.seneo.url} target="_blank" rel="noreferrer">
              GRN-SENeo 2026 ↗
            </a>
            <p className="small-note">
              {sources.evidence.type} · {sources.evidence.note}
            </p>
          </article>
          {report.cards.map((card) => (
            <article key={card.id} className="panel decision">
              <p className="eyebrow">{card.title}</p>
              <h2>{card.title}</h2>
              <p>
                <strong>Tu actuación:</strong> {card.action}
              </p>
              <p>
                <strong>Qué ocurrió:</strong> {card.consequence}
              </p>
              <p>
                <strong>
                  {card.source.type === "SENEO_RECOMMENDATION"
                    ? "Qué recomienda SENeo"
                    : "Regla docente del simulador"}
                  :
                </strong>{" "}
                {card.recommendation}
              </p>
              <p>
                <strong>Por qué:</strong> {card.why}
              </p>
              <div className="source-tag">{card.source.type}</div>
              {card.source.url ? (
                <a href={card.source.url} target="_blank" rel="noreferrer">
                  {card.source.title} ↗
                </a>
              ) : null}
              <p className="small-note">{card.source.note}</p>
            </article>
          ))}
          <article className="panel decision">
            <h2>Para conversar con tu instructor</h2>
            {report.reflections.length ? (
              <ul>
                {report.reflections.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            ) : (
              <p>
                ¿Qué observación cambió tu decisión? ¿Qué harías igual en el
                próximo caso?
              </p>
            )}
            <p className="small-note">
              Las consecuencias fisiológicas son simuladas. No constituyen
              predicciones sobre pacientes.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
