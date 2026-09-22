import type { LearnerView } from "../engine/simulator";
import { formatTime } from "../debrief/report";
export function Monitor({ view }: { view: LearnerView }) {
  const o = view.observed;
  const hint = (
    value: { at: number; method: string } | null,
    acquiring: boolean,
  ) =>
    value
      ? `${value.method} · ${formatTime(value.at)}`
      : acquiring
        ? "Adquiriendo señal…"
        : "Sin evaluar";
  return (
    <aside className="panel monitor" aria-label="Monitorización">
      <div className="panel-heading">
        <h2>Monitorización</h2>
        <span className="tiny-pill">EN VIVO</span>
      </div>
      <div className="vitals">
        <div className="vital">
          <span>Frecuencia cardíaca</span>
          <div>
            <b data-testid="hr">{o.hr ? Math.round(o.hr.value) : "—"}</b>
            <small>lpm</small>
          </div>
          <p>{hint(o.hr, view.monitors.ecgAt !== null)}</p>
        </div>
        <div className="vital oxygen">
          <span>SpO₂ preductal</span>
          <div>
            <b data-testid="spo2">{o.spo2 ? Math.round(o.spo2.value) : "—"}</b>
            <small>%</small>
          </div>
          <p>{hint(o.spo2, view.monitors.spo2At !== null)}</p>
        </div>
      </div>
      <dl className="observations">
        <div>
          <dt>Respiración</dt>
          <dd>
            {o.breathing
              ? o.breathing.value
                ? "Espontánea"
                : "Ausente"
              : "Sin valorar"}
            <small>
              {o.breathing ? formatTime(o.breathing.at) : "Observación clínica"}
            </small>
          </dd>
        </div>
        <div>
          <dt>Tono</dt>
          <dd>
            {o.tone ? o.tone.value : "Sin valorar"}
            <small>
              {o.tone ? formatTime(o.tone.at) : "Observación clínica"}
            </small>
          </dd>
        </div>
        <div>
          <dt>Expansión torácica</dt>
          <dd data-testid="chest">
            {o.chest ? (o.chest.value ? "Presente" : "Ausente") : "Sin valorar"}
            <small>
              {o.chest ? formatTime(o.chest.at) : "Inspección torácica"}
            </small>
          </dd>
        </div>
        <div>
          <dt>FiO₂ seleccionada</dt>
          <dd>{Math.round(view.support.fio2 * 100)} %</dd>
        </div>
      </dl>
      <p className="small-note">
        Las valoraciones manuales son registros puntuales; comprueba su hora.
      </p>
    </aside>
  );
}
