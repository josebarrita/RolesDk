import { useState, useEffect } from "react";
import { Cloud, ArrowRight, ArrowLeft, Network, Table2, Workflow, ChevronRight, Compass, GitBranch, CheckCircle2 } from "lucide-react";
import {
  ROLE_ORDER, ROLES, LEVELS, DIMS, VALUE_FLOW, PROJECT_TYPES,
  LATERAL, AGILE, RACI, RACI_COLS, RACI_COLORS
} from "./data/modelo";

// Clave con la que se recuerda en el navegador que ya se vio la bienvenida.
const WELCOME_KEY = "rolesdk_welcome_seen";


/* ----------------------------- HELPERS ----------------------------- */
function edge(a: {x: number, y: number}, b: {x: number, y: number}, r = 86) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  return { x1: a.x + (dx / len) * r, y1: a.y + (dy / len) * r, x2: b.x - (dx / len) * r, y2: b.y - (dy / len) * r,
    mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
}

/* ----------------------------- COMPONENTS ----------------------------- */
function GraphView({ onSelect }: { onSelect: (key: string) => void }) {
  const [mode, setMode] = useState("value");
  const [hover, setHover] = useState<string | null>(null);
  const [project, setProject] = useState("all");

  const proj = PROJECT_TYPES.find((p) => p.key === project) ?? PROJECT_TYPES[0];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">Grafo de roles y flujo</h2>
          <p className="text-xs sm:text-sm text-slate-500">Toca un rol para ver sus 5 niveles y su carrera. Cada rol es un "recurso de nube".</p>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-1 ring-1 ring-slate-200">
          <button onClick={() => setMode("value")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium transition ${mode === "value" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            Flujo de valor
          </button>
          <button onClick={() => setMode("lateral")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium transition ${mode === "lateral" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            Movimientos laterales
          </button>
        </div>
      </div>

      {/* selector de tipo de proyecto */}
      {mode === "value" && (
        <div className="mb-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Tipo de proyecto</div>
          <div className="flex flex-wrap gap-1.5">
            {PROJECT_TYPES.map((p) => {
              const on = project === p.key;
              return (
                <button key={p.key} onClick={() => setProject(p.key)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
                  style={{
                    background: on ? "linear-gradient(135deg,#0a6fb8,#1aa3c4)" : "#ffffff",
                    color: on ? "#fff" : "#64748b",
                    border: `1px solid ${on ? "transparent" : "#e2e8f0"}`,
                    boxShadow: on ? "0 3px 10px -3px rgba(10,111,184,0.4)" : "none",
                  }}>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative rounded-2xl bg-gradient-to-b from-slate-50 to-white ring-1 ring-slate-200 overflow-hidden">
        <svg viewBox="0 0 1000 620" className="w-full" style={{ display: "block" }}>
          <defs>
            <marker id="arrowV" markerWidth="12" markerHeight="12" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#0a6fb8" />
            </marker>
            <marker id="arrowL" markerWidth="12" markerHeight="12" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#64748b" />
            </marker>
          </defs>
          <rect x="0" y="0" width="1000" height="620" fill="transparent" />

          {mode === "value" && VALUE_FLOW.map((f, i) => {
            const e = edge(ROLES[f.a].pos, ROLES[f.b].pos);
            const isActive = proj.active.includes(f.id);
            const isOpt = proj.opt?.includes(f.id) ?? false;
            const on = isActive || isOpt;
            const hovered = hover === f.a || hover === f.b;
            // atenuado si: no aplica al proyecto, o hay hover en otro rol
            const dimmed = !on || (hover && !hovered);
            const strokeColor = dimmed ? "#cbd5e1" : ROLES[f.a].color;
            const labelText = isOpt ? `${f.label} (opcional)` : f.label;
            const labelW = isOpt ? 112 : 88;
            return (
              <g key={i} opacity={dimmed ? 0.2 : 1}>
                <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                  stroke={strokeColor} strokeWidth={hovered && on ? 3.5 : 2.5}
                  strokeDasharray={isOpt ? "7 5" : undefined}
                  markerEnd="url(#arrowV)" />
                <g transform={`translate(${e.mx}, ${e.my})`}>
                  <rect x={-labelW / 2} y="-11" width={labelW} height="22" rx="11"
                    fill="white" stroke={dimmed ? "#e2e8f0" : ROLES[f.a].color} strokeWidth="1.5" />
                  <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="600"
                    fill={dimmed ? "#94a3b8" : ROLES[f.a].color}>{labelText}</text>
                </g>
              </g>
            );
          })}

          {mode === "lateral" && LATERAL.map((l, i) => {
            const e = edge(ROLES[l.a].pos, ROLES[l.b].pos);
            const active = hover === l.a || hover === l.b;
            return <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke={active ? ROLES[l.a].color : "#94a3b8"} strokeWidth={active ? 3 : 2}
              strokeDasharray="7 6" markerEnd="url(#arrowL)" markerStart="url(#arrowL)"
              opacity={hover && !active ? 0.2 : 0.85} />;
          })}

          {ROLE_ORDER.map((k) => {
            const r = ROLES[k];
            const Icon = r.icon;
            const x = r.pos.x - 98, y = r.pos.y - 64;
            const hl = hover === k;
            return (
              <foreignObject key={k} x={x} y={y} width="196" height="128" style={{ overflow: "visible" }}>
                <div
                  onClick={() => onSelect(k)}
                  onMouseEnter={() => setHover(k)}
                  onMouseLeave={() => setHover(null)}
                  className="h-full w-full rounded-2xl p-3 cursor-pointer select-none transition-all duration-200 flex flex-col justify-between bg-white"
                  style={{
                    border: `2px solid ${hl ? r.color : "#e2e8f0"}`,
                    boxShadow: hl ? `0 0 0 4px ${r.soft}, 0 12px 28px -10px ${r.color}55` : "0 4px 14px -6px rgba(15,23,42,0.12)",
                    transform: hl ? "translateY(-3px)" : "none",
                  }}>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: r.soft }}>
                      <Icon size={18} style={{ color: r.color }} />
                    </span>
                    <span className="text-[13px] font-bold leading-tight text-slate-800">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Cloud size={12} className="text-slate-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 leading-tight">{r.cloudShort}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: r.soft, color: r.color }}>5 niveles</span>
                    <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: r.color }}>
                      Ver <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </foreignObject>
            );
          })}
        </svg>

        <div className="border-t border-slate-100 px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-500">
          {mode === "value" ? (
            <>
              <span className="flex items-center gap-1.5">
                <svg width="24" height="8"><line x1="0" y1="4" x2="24" y2="4" stroke="#0a6fb8" strokeWidth="2.5" markerEnd="url(#arrowV)"/></svg>
                Flujo activo
              </span>
              {proj.opt && proj.opt.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <svg width="24" height="8"><line x1="0" y1="4" x2="24" y2="4" stroke="#0a6fb8" strokeWidth="2.5" strokeDasharray="5 3"/></svg>
                  Flujo opcional
                </span>
              )}
              <span className="text-slate-400">
                {project === "all"
                  ? "Mostrando todos los flujos posibles. Elige un tipo de proyecto para resaltar solo los que aplican."
                  : `Flujos activos para "${proj.label}". Los demás se atenúan.`}
              </span>
            </>
          ) : (
            <span className="flex items-center gap-1.5">
              <svg width="24" height="8"><line x1="0" y1="4" x2="24" y2="4" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3"/></svg>
              Movimiento lateral entre roles (nivelación de 3-6 meses)
            </span>
          )}
        </div>
      </div>

      {mode === "lateral" && (
        <div className="mt-3 grid sm:grid-cols-2 gap-2">
          {LATERAL.map((l, i) => (
            <div key={i} className="rounded-xl bg-white ring-1 ring-slate-200 p-3 text-xs shadow-sm">
              <div className="flex items-center gap-2 mb-1 font-semibold text-slate-700">
                <span style={{ color: ROLES[l.a].color }}>{ROLES[l.a].short}</span>
                <ArrowRight size={13} className="text-slate-400" />
                <span style={{ color: ROLES[l.b].color }}>{ROLES[l.b].short}</span>
              </div>
              <p className="text-slate-500 leading-snug">{l.note}</p>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-[11px] text-slate-400">Ruta alternativa para perfiles técnicos (IC): Senior → Staff → Principal, sin gestión de personas.</p>
    </div>
  );
}

function RoleDetail({ roleKey, onBack }: { roleKey: string; onBack: () => void }) {
  const r = ROLES[roleKey];
  const Icon = r.icon;
  const [level, setLevel] = useState("Junior");
  const lvlIndex = LEVELS.indexOf(level);
  const data = r.levels[level as keyof typeof r.levels];
  const prog = lvlIndex < 4 ? r.progression[lvlIndex] : null;

  return (
    <div className="w-full">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-3 transition">
        <ArrowLeft size={15} /> Volver al grafo
      </button>

      <div className="rounded-2xl p-4 sm:p-5 mb-4" style={{ background: r.soft, border: `1px solid ${r.color}33` }}>
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center rounded-xl shrink-0 bg-white" style={{ width: 46, height: 46, boxShadow: `0 2px 8px -2px ${r.color}44` }}>
            <Icon size={24} style={{ color: r.color }} />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{r.name}</h2>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <Cloud size={13} /> {r.cloud}
            </p>
            <p className="text-sm text-slate-600 mt-2 leading-snug">{r.mission}</p>
          </div>
        </div>
      </div>

      <div className="flex items-stretch gap-1.5 mb-4 overflow-x-auto pb-1">
        {LEVELS.map((lv, i) => {
          const sel = lv === level;
          return (
            <button key={lv} onClick={() => setLevel(lv)}
              className="flex-1 min-w-[88px] rounded-xl px-2 py-2.5 text-center transition-all bg-white"
              style={{
                background: sel ? r.soft : "#ffffff",
                border: `1.5px solid ${sel ? r.color : "#e2e8f0"}`,
              }}>
              <div className="text-[10px] font-semibold tracking-wide" style={{ color: sel ? r.color : "#94a3b8" }}>TIER {i + 1}</div>
              <div className={`text-xs font-bold leading-tight mt-0.5 ${sel ? "text-slate-800" : "text-slate-500"}`}>{lv}</div>
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {DIMS.map((d) => {
          const DIcon = d.icon;
          return (
            <div key={d.key} className="rounded-xl bg-white ring-1 ring-slate-200 p-3.5 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <DIcon size={15} style={{ color: r.color }} />
                <span className="text-sm font-semibold text-slate-700">{d.label}</span>
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed">{data[d.key as keyof typeof data]}</p>
            </div>
          );
        })}
      </div>

      {prog && (
        <div className="mt-4 rounded-xl p-4 bg-white" style={{ border: `1px dashed ${r.color}66` }}>
          <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
            <Workflow size={15} style={{ color: r.color }} />
            Progresión: {level} <ArrowRight size={14} style={{ color: r.color }} /> {prog.to}
            <span className="ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: r.soft, color: r.color }}>{prog.time}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1 font-semibold">Criterios de promoción</div>
              <p className="text-[13px] text-slate-500 leading-relaxed">{prog.criteria}</p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1 font-semibold">Cambio fundamental</div>
              <p className="text-[13px] text-slate-600 leading-relaxed italic">{prog.change}</p>
            </div>
          </div>
        </div>
      )}
      {!prog && (
        <div className="mt-4 rounded-xl p-3.5 text-center text-[13px] text-slate-500 bg-white" style={{ border: `1px solid ${r.color}44` }}>
          Nivel cúspide de la ruta. Define la estrategia a 2-3 años y conecta con el nivel ejecutivo.
        </div>
      )}
    </div>
  );
}

function AgileView() {
  const [sel, setSel] = useState("de");
  const r = ROLES[sel];
  const a = AGILE[sel];
  const blocks = [
    { t: "Qué le facilita el AM", v: a.facilitates, c: "#0d9488" },
    { t: "Qué espera el AM del rol", v: a.expects, c: "#0a6fb8" },
    { t: "Cadencia de interacción", v: a.cadence, c: "#1aa3c4" },
    { t: "Fricción típica y cómo se gestiona", v: a.friction, c: "#f59e0b" },
  ];
  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-slate-800">El Agile Manager como orquestador</h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-4">No es un rol técnico: es el "control plane" del equipo. Selecciona un rol para ver su interacción.</p>

      <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-white ring-1 ring-slate-200 p-4 mb-4">
        <div className="text-center text-[11px] text-slate-400 mb-2">↑ Liderazgo ejecutivo · Product Owner / Negocio ↑</div>
        <div className="mx-auto max-w-md rounded-xl py-2.5 text-center font-bold text-white mb-3"
          style={{ background: "linear-gradient(135deg,#0a6fb8,#1aa3c4)", boxShadow: "0 6px 18px -8px rgba(10,111,184,0.5)" }}>
          AGILE MANAGER
          <div className="text-[10px] font-normal text-sky-100">orquestador / control plane</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {ROLE_ORDER.map((k) => {
            const rr = ROLES[k]; const RIcon = rr.icon; const on = sel === k;
            return (
              <button key={k} onClick={() => setSel(k)}
                className="rounded-lg p-2 text-center transition-all bg-white"
                style={{ background: on ? rr.soft : "#ffffff", border: `1.5px solid ${on ? rr.color : "#e2e8f0"}` }}>
                <RIcon size={16} className="mx-auto" style={{ color: rr.color }} />
                <div className={`text-[10px] font-semibold mt-1 leading-tight ${on ? "text-slate-800" : "text-slate-500"}`}>{rr.short}</div>
              </button>
            );
          })}
        </div>
        <div className="text-center text-[11px] text-slate-400 mt-3">↓ Infraestructura · Seguridad/Compliance · Otros equipos ↓</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {blocks.map((b) => (
          <div key={b.t} className="rounded-xl bg-white ring-1 ring-slate-200 p-3.5 shadow-sm">
            <div className="text-sm font-semibold mb-1.5" style={{ color: b.c }}>{b.t}</div>
            <p className="text-[13px] text-slate-500 leading-relaxed">{b.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RaciView() {
  const [hl, setHl] = useState<number | null>(null);
  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-slate-800">Matriz RACI de actividades clave</h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-3">Pasa el cursor sobre una columna para resaltarla. A = Accountable · R = Responsible · C = Consulted · I = Informed.</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {Object.entries(RACI_COLORS).map(([k, c]) => (
          <span key={k} className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="inline-block w-3 h-3 rounded" style={{ background: c }} />
            <b className="text-slate-700">{k}</b>
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl ring-1 ring-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="sticky left-0 z-10 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-600 min-w-[200px]">Actividad</th>
              {RACI_COLS.map((c, i) => (
                <th key={c} onMouseEnter={() => setHl(i)} onMouseLeave={() => setHl(null)}
                  className="px-2 py-2.5 text-[11px] font-semibold text-center cursor-default transition"
                  style={{ background: hl === i ? "#e0f2fe" : undefined, color: hl === i ? "#0a6fb8" : "#475569" }}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RACI.map((row, ri) => (
              <tr key={ri} className={ri % 2 ? "bg-slate-50/50" : "bg-white"}>
                <td className="sticky left-0 z-10 px-3 py-2 text-[12px] text-slate-600 font-medium" style={{ background: ri % 2 ? "#f8fafc" : "#ffffff" }}>{row.act}</td>
                {row.v.map((val, ci) => (
                  <td key={ci} onMouseEnter={() => setHl(ci)} onMouseLeave={() => setHl(null)}
                    className="px-2 py-2 text-center transition"
                    style={{ background: hl === ci ? "#f0f9ff" : undefined }}>
                    <span className="inline-flex items-center justify-center rounded-md text-[11px] font-bold px-1.5 py-0.5"
                      style={{
                        color: RACI_COLORS[val] ?? "#94a3b8",
                        background: `${RACI_COLORS[val] ?? "#94a3b8"}1f`,
                        border: `1px solid ${RACI_COLORS[val] ?? "#94a3b8"}55`,
                        opacity: hl !== null && hl !== ci ? 0.35 : 1,
                      }}>{val}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">Solo un <b>A</b> (Accountable) por fila. "A/R" indica que el mismo rol ejecuta y es responsable final.</p>
    </div>
  );
}

/* ----------------------------- ROOT ----------------------------- */
/* ----------------------------- WELCOME ----------------------------- */
function Welcome({ onEnter }: { onEnter: (dontShowAgain: boolean) => void }) {
  const [dontShow, setDontShow] = useState(false);

  const points = [
    { icon: Compass, color: "#0a6fb8",
      title: "Tu rol y tus niveles",
      text: "Las responsabilidades, habilidades y KPIs de cada nivel, desde Junior hasta Líder." },
    { icon: GitBranch, color: "#1aa3c4",
      title: "Cómo fluye el trabajo",
      text: "Cómo se conectan los roles según el tipo de proyecto." },
    { icon: CheckCircle2, color: "#0d9488",
      title: "Tu camino de crecimiento",
      text: "Qué necesitas para llegar al siguiente nivel." },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-700 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-lg overflow-hidden">
          {/* franja superior con degradado corporativo */}
          <div className="px-6 sm:px-10 pt-9 pb-8 text-center" style={{ background: "linear-gradient(135deg,#0a6fb8,#1aa3c4)" }}>
            <span className="inline-flex items-center justify-center rounded-2xl bg-white/15 mb-4" style={{ width: 56, height: 56 }}>
              <Cloud size={30} className="text-white" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Modelo de Roles de Datos e IA</h1>
            <p className="text-sm sm:text-base text-sky-50/90 mt-2 max-w-md mx-auto">
              Conoce tu rol, entiende cómo crecer y descubre qué te toca en cada proyecto.
            </p>
          </div>

          {/* qué encontrarás */}
          <div className="px-6 sm:px-10 py-7">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-3">Qué encontrarás aquí</div>
            <div className="space-y-3">
              {points.map((p) => {
                const PIcon = p.icon;
                return (
                  <div key={p.title} className="flex items-start gap-3">
                    <span className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 40, height: 40, background: `${p.color}15` }}>
                      <PIcon size={20} style={{ color: p.color }} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{p.title}</div>
                      <div className="text-[13px] text-slate-500 leading-relaxed">{p.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* botón y opción */}
            <button onClick={() => onEnter(dontShow)}
              className="w-full mt-7 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg,#0a6fb8,#1aa3c4)", boxShadow: "0 6px 18px -6px rgba(10,111,184,0.5)" }}>
              Explorar el modelo <ArrowRight size={17} />
            </button>

            <label className="flex items-center justify-center gap-2 mt-4 text-[13px] text-slate-500 cursor-pointer select-none">
              <input type="checkbox" checked={dontShow} onChange={(e) => setDontShow(e.target.checked)}
                className="rounded border-slate-300" style={{ accentColor: "#0a6fb8" }} />
              No volver a mostrar esta pantalla
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- ROOT ----------------------------- */
export default function App() {
  const [tab, setTab] = useState("graph");
  const [role, setRole] = useState<string | null>(null);
  // showWelcome: null = aún no sabemos (evita parpadeo), true/false = decisión tomada
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);

  // Al cargar, revisamos si la persona ya vio la bienvenida en este navegador.
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(WELCOME_KEY) === "true";
    } catch {
      // Si el navegador bloquea el almacenamiento, simplemente mostramos la bienvenida.
      seen = false;
    }
    setShowWelcome(!seen);
  }, []);

  // Cuando la persona entra desde la bienvenida.
  const handleEnter = (dontShowAgain: boolean) => {
    if (dontShowAgain) {
      try { localStorage.setItem(WELCOME_KEY, "true"); } catch { /* sin memoria, no pasa nada */ }
    }
    setShowWelcome(false);
  };

  // Mientras decidimos, no pintamos nada (evita un parpadeo de la bienvenida).
  if (showWelcome === null) return null;
  if (showWelcome) return <Welcome onEnter={handleEnter} />;

  const tabs = [
    { k: "graph", label: "Roles y flujo", icon: Network },
    { k: "agile", label: "Agile Manager", icon: Workflow },
    { k: "raci", label: "Matriz RACI", icon: Table2 },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-700">
      <div className="mx-auto max-w-5xl px-3 sm:px-5 py-5">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="flex items-center justify-center rounded-xl" style={{ width: 38, height: 38, background: "linear-gradient(135deg,#0a6fb8,#1aa3c4)" }}>
            <Cloud size={20} className="text-white" />
          </span>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">Modelo de Roles de Datos e IA</h1>
            <p className="text-[11px] sm:text-xs text-slate-500">Roles como recursos de nube · niveles · carrera · interacciones</p>
          </div>
        </div>

        <div className="flex gap-1.5 my-4 overflow-x-auto pb-1">
          {tabs.map((t) => {
            const TIcon = t.icon;
            const active = tab === t.k;
            return (
              <button key={t.k} onClick={() => { setTab(t.k); setRole(null); }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: active ? "linear-gradient(135deg,#0a6fb8,#1aa3c4)" : "#ffffff",
                  color: active ? "#fff" : "#64748b",
                  border: `1px solid ${active ? "transparent" : "#e2e8f0"}`,
                  boxShadow: active ? "0 4px 12px -4px rgba(10,111,184,0.4)" : "none",
                }}>
                <TIcon size={15} /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4 sm:p-5 shadow-sm">
          {tab === "graph" && (role ? <RoleDetail roleKey={role} onBack={() => setRole(null)} /> : <GraphView onSelect={setRole} />)}
          {tab === "agile" && <AgileView />}
          {tab === "raci" && <RaciView />}
        </div>

        <div className="text-center mt-4 space-y-1">
          <p className="text-[10px] text-slate-400">Basado en el informe "Modelo de Roles del Equipo de Datos e IA" · revisión sugerida cada 12 meses.</p>
          <button onClick={() => setShowWelcome(true)} className="text-[10px] text-slate-400 hover:text-slate-600 underline transition">
            Ver pantalla de bienvenida
          </button>
        </div>
      </div>
    </div>
  );
}
