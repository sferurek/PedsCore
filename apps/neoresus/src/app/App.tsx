import { useEffect, useReducer, useRef } from "react";
import type {
  ActionId,
  Category,
  EquipmentId,
  Mode,
  Preflight as Prep,
  State,
} from "../engine/types";
import {
  advance,
  availability,
  createCase,
  finishCase,
  learnerView,
  startAction,
} from "../engine/simulator";
import {
  advancePreflight,
  createPreflight,
  operatePreflight,
} from "../preflight/equipment";
import { s1 } from "../scenarios/s1";
import { buildDebrief, formatTime } from "../debrief/report";
import { Newborn } from "../ui/Newborn";
import { sceneView } from "../ui/scene";
import { Monitor } from "../ui/Monitor";
import { Preflight } from "../ui/Preflight";
import { Debrief } from "../ui/Debrief";
interface Session {
  phase: "briefing" | "preflight" | "case";
  mode: Mode;
  prep: Prep;
  state: State | null;
}
type Command =
  | { type: "tick"; dt: number }
  | { type: "mode"; mode: Mode }
  | { type: "prepare" }
  | { type: "birth" }
  | { type: "equipment"; id: EquipmentId; kind: "check" | "fix" }
  | { type: "action"; id: ActionId }
  | { type: "finish" }
  | { type: "restart"; seed: number };
function initial(seed: number): Session {
  return {
    phase: "briefing",
    mode: "simulation",
    prep: createPreflight(
      seed,
      s1.preflight.durationSec,
      s1.preflight.faultCount,
    ),
    state: null,
  };
}
function reducer(s: Session, c: Command): Session {
  switch (c.type) {
    case "restart":
      return initial(c.seed);
    case "mode":
      return { ...s, mode: c.mode };
    case "prepare":
      return { ...s, phase: "preflight" };
    case "birth":
      return { ...s, phase: "case", state: createCase(s1, s.prep, s.mode) };
    case "equipment":
      return { ...s, prep: operatePreflight(s.prep, c.id, c.kind) };
    case "action":
      return s.state ? { ...s, state: startAction(s.state, s1, c.id) } : s;
    case "finish":
      return s.state ? { ...s, state: finishCase(s.state) } : s;
    case "tick": {
      if (s.phase === "preflight") {
        const prep = advancePreflight(s.prep, c.dt);
        if (prep.done) {
          const spill = Math.max(0, c.dt - (s.prep.limit - s.prep.elapsed));
          return {
            ...s,
            prep,
            phase: "case",
            state: advance(createCase(s1, prep, s.mode), s1, spill),
          };
        }
        return { ...s, prep };
      }
      return s.state?.status === "running"
        ? { ...s, state: advance(s.state, s1, c.dt) }
        : s;
    }
  }
}
const groups: Category[] = [
  "Valoración",
  "Ventilación",
  "Monitorización",
  "Oxígeno",
  "Circulación",
];
const modes: { id: Mode; label: string; description: string }[] = [
  {
    id: "learning",
    label: "Aprendizaje",
    description: "Contexto y ayudas opcionales",
  },
  {
    id: "simulation",
    label: "Simulación",
    description: "Decisiones y respuesta fisiológica",
  },
  {
    id: "assessment",
    label: "Evaluación",
    description: "Registro mínimo durante el caso",
  },
];
export function App() {
  const [session, dispatch] = useReducer(reducer, Date.now(), initial);
  const last = useRef(performance.now());
  const main = useRef<HTMLDivElement>(null);
  useEffect(() => {
    last.current = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      dispatch({ type: "tick", dt: (now - last.current) / 1000 });
      last.current = now;
    }, 100);
    return () => clearInterval(id);
  }, []);
  const phase =
    session.state?.status === "finished" ? "debrief" : session.phase;
  const previousPhase = useRef(phase);
  useEffect(() => {
    if (previousPhase.current === phase) return;
    previousPhase.current = phase;
    main.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [phase]);
  const birth = () => {
    last.current = performance.now();
    dispatch({ type: "birth" });
  };
  const state = session.state;
  const view = state ? learnerView(state) : null;
  return (
    <>
      <a className="skip-link" href="#main">
        Ir al contenido
      </a>
      <header className="app-header">
        <a className="brand" href="/neoresus/">
          <span className="brand-mark">N</span>
          <span>
            Neo<span className="brand-light">Resus</span>
            <small>SIMULACIÓN NEONATAL</small>
          </span>
        </a>
        <nav aria-label="Fase del caso">
          <span
            className={
              phase === "briefing" || phase === "preflight" ? "current" : ""
            }
          >
            01 <span>Preparación</span>
          </span>
          <i />
          <span className={phase === "case" ? "current" : ""}>
            02 <span>Simulación</span>
          </span>
          <i />
          <span className={phase === "debrief" ? "current" : ""}>
            03 <span>Debriefing</span>
          </span>
        </nav>
        <span className="version">S1 · ALPHA 0.7</span>
      </header>
      <div id="main" ref={main} tabIndex={-1}>
        {phase === "briefing" ? (
          <main className="briefing">
            <section className="briefing-copy">
              <p className="eyebrow">ENTRENAMIENTO CLÍNICO · ESCENARIO 01</p>
              <h1>
                Los primeros minutos.
                <br />
                <em>Decisiones que importan.</em>
              </h1>
              <p className="lead">
                Acompaña la transición de un recién nacido. Observa, interpreta
                y actúa en un entorno de simulación en tiempo real.
              </p>
              <div className="context-grid">
                <div>
                  <small>EDAD GESTACIONAL</small>
                  <strong>39+2 semanas</strong>
                </div>
                <div>
                  <small>NACIMIENTO</small>
                  <strong>Parto vaginal</strong>
                </div>
                <div>
                  <small>CONTEXTO</small>
                  <strong>Líquido claro</strong>
                </div>
              </div>
              <p className="small-note">
                Sin malformaciones conocidas ni sospecha inicial de hipovolemia.
                Acuerda el plan de manejo del cordón con tu equipo. En S1 se
                simula disponibilidad de soporte junto a la madre.
              </p>
              <fieldset className="mode-select">
                <legend>Elige cómo practicar</legend>
                {modes.map((mode) => (
                  <label
                    key={mode.id}
                    className={session.mode === mode.id ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={mode.id}
                      checked={session.mode === mode.id}
                      onChange={() => dispatch({ type: "mode", mode: mode.id })}
                    />
                    <span>
                      <strong>{mode.label}</strong>
                      <small>{mode.description}</small>
                    </span>
                  </label>
                ))}
              </fieldset>
              <button
                className="primary large"
                onClick={() => {
                  last.current = performance.now();
                  dispatch({ type: "prepare" });
                }}
              >
                Preparar la cuna <span>→</span>
              </button>
              <p className="small-note">
                Preparación: hasta 2 min · Caso: hasta 5 min · Debriefing sin
                puntuación global
              </p>
            </section>
            <aside className="briefing-art">
              <div className="illustration-ring" />
              <Newborn
                scene={{
                  moving: false,
                  spontaneous: false,
                  tone: "disminuido",
                  mask: false,
                  cordClamped: false,
                  color: "#e5b8a8",
                  compressed: false,
                }}
              />
              <div className="art-note">
                <span>01 / OBSERVAR</span>
                <p>
                  El recién nacido
                  <br />
                  en el centro de cada decisión.
                </p>
              </div>
            </aside>
          </main>
        ) : null}
        {phase === "preflight" ? (
          <Preflight
            state={session.prep}
            onAction={(id, kind) => dispatch({ type: "equipment", id, kind })}
            onStart={birth}
          />
        ) : null}
        {phase === "case" && state && view ? (
          <main className="simulation">
            <div className="case-heading">
              <div>
                <p className="eyebrow">
                  S1 · {modes.find((x) => x.id === session.mode)?.label}
                </p>
                <h1>{s1.metadata.title}</h1>
                <p>{s1.metadata.gestation} · parto vaginal · líquido claro</p>
              </div>
              <div className="case-controls">
                <div className="clinical-clock">
                  <span>TIEMPO DE VIDA</span>
                  <b>{formatTime(view.time)}</b>
                </div>
                <button onClick={() => dispatch({ type: "finish" })}>
                  Finalizar caso ↗
                </button>
              </div>
            </div>
            <div className="clinical-grid">
              <section className="panel evolution">
                <div className="panel-heading">
                  <h2>Evolución</h2>
                  <span className="tiny-pill">REGISTRO</span>
                </div>
                {session.mode === "assessment" ? (
                  <p className="small-note">
                    Las acciones quedarán disponibles en el debriefing.
                  </p>
                ) : (
                  <ol className="event-list">
                    {view.events.slice(-8).map((e, i) => (
                      <li key={`${e.at}-${i}`}>
                        <time>{formatTime(e.at)}</time>
                        <span>{e.label}</span>
                      </li>
                    ))}
                  </ol>
                )}
                <div className="context-note">
                  <small>CONTEXTO DEL CASO</small>
                  <p>
                    RN a término.
                    <br />
                    Sin sospecha inicial de hipovolemia.
                  </p>
                </div>
              </section>
              <section className="patient panel" aria-label="Escena clínica">
                <div className="patient-badges">
                  <span>
                    {view.support.cordClamped
                      ? "Cordón pinzado"
                      : "Cordón íntegro"}
                  </span>
                  <span>{view.support.ppv ? "VPPI activa" : "Sin VPPI"}</span>
                  {view.support.airway !== "mask" ? (
                    <span>
                      {view.support.airway === "tube"
                        ? "Tubo colocado"
                        : "Dispositivo supraglótico"}
                    </span>
                  ) : null}
                </div>
                <Newborn scene={sceneView(state)} />
              </section>
              <Monitor view={view} />
            </div>
            <section className="actions panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">INTERVENCIONES</p>
                  <h2>Tu siguiente decisión</h2>
                </div>
                <span className="action-status" role="status">
                  {state.pending
                    ? `${s1.actionDefinitions.find((x) => x.id === state.pending!.id)?.label} · ${Math.ceil(state.pending.remaining)} s`
                    : "Reloj clínico activo"}
                </span>
              </div>
              <div className="action-progress">
                <span
                  style={{
                    width: state.pending
                      ? `${100 * (1 - state.pending.remaining / s1.actionDefinitions.find((x) => x.id === state.pending!.id)!.durationSec)}%`
                      : "0%",
                  }}
                />
              </div>
              <div className="action-groups">
                {groups.map((group, index) => (
                  <section
                    className={`action-group domain-${index}`}
                    key={group}
                  >
                    <h3>
                      <span />
                      {group}
                    </h3>
                    {s1.actionDefinitions
                      .filter((a) => a.category === group)
                      .map((a) => (
                        <button
                          key={a.id}
                          disabled={availability(state, s1, a.id) !== null}
                          title={
                            availability(state, s1, a.id) ??
                            `${a.durationSec} s · duración operativa`
                          }
                          onClick={() => dispatch({ type: "action", id: a.id })}
                        >
                          {a.label}
                          <small>{a.durationSec} s</small>
                        </button>
                      ))}
                  </section>
                ))}
              </div>
            </section>
            {session.mode === "learning" ? (
              <details className="learning-help">
                <summary>Ayuda de aprendizaje</summary>
                <p>
                  Valora al RN y registra lo que encuentras. Comprueba la
                  respuesta a las intervenciones. Las observaciones manuales no
                  se actualizan por sí solas. Tras la recuperación, reevalúa y
                  ajusta el soporte.
                </p>
              </details>
            ) : null}
          </main>
        ) : null}
        {phase === "debrief" && state ? (
          <Debrief
            report={buildDebrief(state, s1)}
            onRestart={() => dispatch({ type: "restart", seed: Date.now() })}
          />
        ) : null}
      </div>
      <footer className="app-footer">
        <span>
          NeoResus <b>·</b> Entrenar. Reflexionar. Mejorar.
        </span>
        <span>
          Modelo docente no validado · No destinado a asistencia clínica
        </span>
        <a
          href="https://doi.org/10.1016/j.anpedi.2026.504143"
          target="_blank"
          rel="noreferrer"
        >
          Referencia GRN-SENeo 2026 ↗
        </a>
      </footer>
    </>
  );
}
