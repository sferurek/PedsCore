import { atlas } from "../../i18n/atlas";
import type { Language } from "../../utils/language";
import { LearnTemplate } from "./LearnTemplate";
import { Icon } from "./Icon";

export function HomeStories({
  language
}: {
  language: Language;
  navigate: (path: string) => void;
}) {
  const t = atlas[language];
  const stories = [
    { product: "learn" as const, capabilityIndex: 1 },
    { product: "sim" as const, capabilityIndex: 2 },
    { product: "live" as const, capabilityIndex: 3 }
  ];

  return (
    <div className="atlas-stories">
      {stories.map(({ product, capabilityIndex }, index) => (
        <section
          id={product}
          className={`atlas-story atlas-story-${product}`}
          key={product}
        >
          <div className="atlas-story-inner">
            <div className="atlas-story-copy">
              <p className="eyebrow">
                <span>0{index + 1}</span> PEDSCORE{" "}
                {t.productLabels[product].toUpperCase()}
              </p>
              <h2>{t[product][0]}</h2>
              <p>{t[product][1]}</p>
              <ul>
                {t.capabilities[capabilityIndex].map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="atlas-state">{t.soon}</span>
            </div>

            <div className="atlas-story-visual">
              {product === "learn" ? (
                <LearnTemplate language={language} />
              ) : product === "sim" ? (
                <div className="atlas-sim-preview">
                  <p className="atlas-specimen-label">{t.preview}</p>
                  <div className="atlas-sim-orbit">
                    <Icon name="sim" />
                    <span>{t.capabilities[2][0]}</span>
                  </div>
                  <div className="atlas-sim-actions">
                    {t.capabilities[2].slice(1).map((item, i) => (
                      <div key={item}>
                        <small>0{i + 1}</small>
                        {item}
                        <Icon name="arrow" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="atlas-live-preview">
                  <p className="atlas-specimen-label">{t.preview}</p>
                  <div className="atlas-bubble">
                    <Icon name="live" />
                    <span>{t.capabilities[3][0]}</span>
                  </div>
                  <div className="atlas-bubble learner">
                    <span>{t.capabilities[3][1]}</span>
                    <Icon name="arrow" />
                  </div>
                  <div className="atlas-conversation-feedback">
                    {t.capabilities[3][2]}
                    <span aria-hidden="true">•••</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
