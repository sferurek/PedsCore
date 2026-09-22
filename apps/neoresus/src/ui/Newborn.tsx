import { sceneView } from "./scene";
import { memo } from "react";
export const Newborn = memo(function Newborn({
  scene,
}: {
  scene: ReturnType<typeof sceneView>;
}) {
  return (
    <div className="newborn-scene">
      <div className="cot-label">
        CUNA DE REANIMACIÓN <span>01</span>
      </div>
      <div className="cot">
        <svg
          viewBox="0 0 420 400"
          role="img"
          aria-label="Recién nacido en la cuna. Utiliza las acciones de valoración para registrar observaciones."
        >
          <defs>
            <radialGradient id="skin">
              <stop stopColor="#f1cfc0" />
              <stop offset="1" stopColor={scene.color} />
            </radialGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity=".09" />
            </filter>
          </defs>
          <ellipse
            cx="210"
            cy="232"
            rx="142"
            ry="142"
            fill="#e7eeeb"
            opacity=".65"
          />
          <g
            filter="url(#shadow)"
            fill="url(#skin)"
            stroke="#c29991"
            strokeWidth="1.2"
          >
            <path
              d={
                scene.tone === "en mejoría"
                  ? "M166 197Q117 180 128 152Q133 141 141 154L155 171L181 176"
                  : "M170 185Q143 191 129 226Q117 250 128 255Q141 260 153 233L180 212"
              }
            />
            <path
              d={
                scene.tone === "en mejoría"
                  ? "M249 188Q284 162 281 148Q271 134 263 152L247 165L236 177"
                  : "M251 185Q278 200 285 237Q289 253 278 255Q269 256 264 234L240 211"
              }
            />
            <path d="M177 266Q148 287 157 318L151 336Q148 348 161 349L182 342Q190 337 184 321L198 284" />
            <path d="M235 266Q265 286 259 315L272 334Q280 346 267 350L245 341Q237 337 240 322L219 284" />
            <ellipse cx="210" cy="220" rx="53" ry="76" />
            <ellipse cx="210" cy="117" rx="55" ry="61" />
            <ellipse cx="155" cy="121" rx="7" ry="12" />
            <ellipse cx="265" cy="121" rx="7" ry="12" />
          </g>
          <path
            d="M171 92Q196 62 237 85"
            stroke="#96766c"
            strokeWidth="2"
            fill="none"
            opacity=".5"
          />
          <g stroke="#826c68" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M182 116q9 5 17 0M222 116q9 5 17 0" />
            <path d="M207 127q-5 7 3 7" />
            <path d="M200 147q10 -4 20 0" />
          </g>
          <ellipse
            className={scene.moving ? "chest moving" : "chest"}
            style={{ animationDuration: scene.spontaneous ? "1.7s" : "1.3s" }}
            cx="210"
            cy="206"
            rx="37"
            ry="28"
            fill="#f5d5c5"
            opacity=".65"
          />
          <path
            d="M172 262Q210 276 250 262L244 289Q210 302 180 287Z"
            fill="#f9fbf7"
            stroke="#d9e1dc"
          />
          <circle cx="210" cy="249" r="4" fill="#b39688" />
          <path
            d={
              scene.cordClamped
                ? "M211 248Q224 252 226 268"
                : "M211 248Q252 238 287 276T352 279"
            }
            fill="none"
            stroke="#bba69a"
            strokeWidth="6"
          />
          {scene.cordClamped ? (
            <rect
              x="216"
              y="257"
              width="20"
              height="7"
              rx="2"
              fill="#d3e4e9"
              stroke="#7f9fac"
            />
          ) : null}
          {scene.mask ? (
            <g>
              <path
                d="M193 127Q210 117 227 127L236 151Q209 165 184 150Z"
                fill="#c4dfe1"
                fillOpacity=".7"
                stroke="#6d9ba5"
                strokeWidth="2"
              />
              <path
                d="M210 149L210 175Q302 192 356 139"
                fill="none"
                stroke="#97bbc3"
                strokeWidth="12"
              />
              <path
                d="M210 149L210 175Q302 192 356 139"
                fill="none"
                stroke="#d4e5e6"
                strokeWidth="7"
              />
            </g>
          ) : null}
          {scene.compressed ? (
            <g fill="#e4d9c7" stroke="#b8ac9d">
              <ellipse cx="198" cy="213" rx="9" ry="15" />
              <ellipse cx="219" cy="213" rx="9" ry="15" />
            </g>
          ) : null}
        </svg>
      </div>
      <div className="scene-caption">
        <span className="dot" />
        Observación directa del recién nacido
      </div>
    </div>
  );
});
