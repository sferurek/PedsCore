import type { EquipmentId, Preflight as PreflightState } from "../engine/types";
import { formatTime } from "../debrief/report";
export function Preflight({
  state,
  onAction,
  onStart,
}: {
  state: PreflightState;
  onAction: (id: EquipmentId, kind: "check" | "fix") => void;
  onStart: () => void;
}) {
  return (
    <main className="preflight">
      <div className="page-intro">
        <div>
          <p className="eyebrow">ANTES DEL NACIMIENTO</p>
          <h1>
            Un puesto preparado.
            <br />
            Un equipo listo.
          </h1>
          <p>
            Revisa el material de la cuna. Las incidencias pendientes pueden
            afectar al caso.
          </p>
        </div>
        <div className="preflight-clock">
          <small>Tiempo de preparación</small>
          <b>{formatTime(Math.max(0, state.limit - state.elapsed))}</b>
          <span>límite operativo del simulador</span>
        </div>
      </div>
      <div className="section-line">
        <h2>Revisión de material</h2>
        <span>
          {state.items.filter((x) => x.checked).length} / {state.items.length}{" "}
          revisados
        </span>
      </div>
      <div className="equipment-grid">
        {state.items.map((item, i) => (
          <article className="equipment panel" key={item.id}>
            <div className="equipment-top">
              <span className="item-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="tiny-pill">
                {item.checked ? "REVISADO" : "PENDIENTE"}
              </span>
            </div>
            <h3>{item.name}</h3>
            <p>
              {item.checked
                ? item.fault && !item.corrected
                  ? item.fault
                  : "Material operativo"
                : item.detail}
            </p>
            <button
              disabled={
                !!state.pending ||
                (item.checked && (!item.fault || item.corrected))
              }
              onClick={() => onAction(item.id, item.checked ? "fix" : "check")}
            >
              {state.pending?.id === item.id
                ? `En curso · ${Math.ceil(state.pending.remaining)} s`
                : item.checked
                  ? item.fault && !item.corrected
                    ? "Corregir incidencia"
                    : "Comprobado"
                  : "Revisar"}
            </button>
          </article>
        ))}
      </div>
      <div className="preflight-footer">
        <p>
          120 s es un tiempo de entrenamiento, no una recomendación clínica.
        </p>
        <button className="primary" onClick={onStart}>
          Comenzar nacimiento <span>→</span>
        </button>
      </div>
    </main>
  );
}
