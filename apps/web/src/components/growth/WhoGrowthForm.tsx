import type { ClinicalToolMetadata, ToolInput } from "@peds-core/core";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { FormValue, FormValues } from "../../utils/formState";
import { getInputSummary, isEmptyFormValue } from "../../utils/formState";
import type { Language } from "../../utils/language";
import {
  getNextWhoGrowthSection,
  getWhoGrowthAgeMode,
  WHO_GROWTH_AGE_FIELDS_BY_MODE,
  WHO_GROWTH_ANTHROPOMETRY_FIELDS
} from "../../utils/whoGrowthFormFlow";
import {
  resolveWhoGrowthAge,
  type WhoGrowthAgeInputMode
} from "../../utils/whoGrowthAge";

interface WhoGrowthFormProps {
  language: Language;
  tool: ClinicalToolMetadata;
  values: FormValues;
  onChange: (values: FormValues) => void;
  onFormComplete?: () => void;
}

type WhoGrowthFormSection = "sex" | "age_mode" | "age" | "anthropometry";

const allAgeFieldIds = [
  "date_of_birth",
  "measurement_date",
  "age_days",
  "age_years_0_5",
  "age_months_0_5",
  "age_extra_days_0_5",
  "age_months"
];

const requiredAnthropometryFields = [
  "weight_kg",
  "stature_cm",
  "measurement_mode"
];

const copy = {
  es: {
    title: "Datos para crecimiento OMS",
    privacy:
      "Los datos se procesan en el navegador. No se almacenan ni se envían a analítica.",
    lockedAfterSex: "Primero selecciona el sexo.",
    lockedAfterMode: "Primero selecciona el modo de entrada de edad.",
    pending: "Pendiente",
    completed: "Completado",
    locked: "Bloqueado",
    continue: "Continuar",
    viewResults: "Ver resultados",
    ageModeSummary: "Selecciona cómo quieres introducir la edad.",
    ageSummary: "Introduce la edad según el modo elegido.",
    anthropometrySummary: "Introduce peso, longitud/talla y modo de medición.",
    required: "obligatorio",
    requiredMessage: "Completa los campos obligatorios de este bloque.",
    fieldInvalid: "Revisa el valor introducido.",
    ageMicrocopy:
      "Para 0-5 años, la opción más precisa es fecha de nacimiento + fecha de medición. Para 5-19 años, usa meses cumplidos.",
    anthropometryMicrocopy:
      "El perímetro cefálico es opcional. Longitud tumbado activa peso para longitud; talla de pie activa peso para talla."
  },
  en: {
    title: "WHO growth data",
    privacy:
      "Data are processed in the browser. They are not stored or sent to analytics.",
    lockedAfterSex: "Select sex first.",
    lockedAfterMode: "Select age input mode first.",
    pending: "Pending",
    completed: "Completed",
    locked: "Locked",
    continue: "Continue",
    viewResults: "View results",
    ageModeSummary: "Select how you want to enter age.",
    ageSummary: "Enter age according to the selected mode.",
    anthropometrySummary: "Enter weight, length/height and measurement mode.",
    required: "required",
    requiredMessage: "Complete the required fields in this block.",
    fieldInvalid: "Review the entered value.",
    ageMicrocopy:
      "For 0-5 years, the most accurate option is date of birth + measurement date. For 5-19 years, use completed months.",
    anthropometryMicrocopy:
      "Head circumference is optional. Recumbent length enables weight-for-length; standing height enables weight-for-height."
  }
} as const;

const isSelected = (currentValue: FormValue, optionId: string): boolean =>
  Array.isArray(currentValue)
    ? currentValue.includes(optionId)
    : currentValue === optionId;

const asNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
};

const isFieldValid = (input: ToolInput, value: FormValue) => {
  if (input.required && isEmptyFormValue(value)) {
    return false;
  }

  if (isEmptyFormValue(value)) {
    return true;
  }

  if (input.type === "number") {
    const numericValue = asNumber(value);

    if (numericValue === undefined) {
      return false;
    }

    if (input.min !== undefined && numericValue < input.min) {
      return false;
    }

    if (input.max !== undefined && numericValue > input.max) {
      return false;
    }
  }

  return true;
};

const getInput = (tool: ClinicalToolMetadata, inputId: string) => {
  const input = tool.inputs?.find((item) => item.id === inputId);

  if (!input) {
    throw new Error(`Missing WHO growth input metadata: ${inputId}`);
  }

  return input;
};

const getSelectedAgeFields = (mode: WhoGrowthAgeInputMode | null) =>
  mode ? WHO_GROWTH_AGE_FIELDS_BY_MODE[mode] : [];

const clearInactiveAgeFields = (
  values: FormValues,
  mode: WhoGrowthAgeInputMode
) => {
  const activeAgeFields = new Set(WHO_GROWTH_AGE_FIELDS_BY_MODE[mode]);

  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      allAgeFieldIds.includes(key) && !activeAgeFields.has(key) ? "" : value
    ])
  ) as FormValues;
};

export function WhoGrowthForm({
  language,
  tool,
  values,
  onChange,
  onFormComplete
}: WhoGrowthFormProps) {
  const formCopy = copy[language];
  const [openSection, setOpenSection] = useState<WhoGrowthFormSection>("sex");
  const ageMode = getWhoGrowthAgeMode(values);
  const resolvedAge = useMemo(
    () => resolveWhoGrowthAge(values, language),
    [language, values]
  );
  const ageResolved =
    resolvedAge.ageDays !== undefined || resolvedAge.ageMonths !== undefined;

  const sexInput = getInput(tool, "sex");
  const ageModeInput = getInput(tool, "who_age_input_mode");
  const selectedAgeInputs = getSelectedAgeFields(ageMode).map((inputId) =>
    getInput(tool, inputId)
  );
  const anthropometryInputs = WHO_GROWTH_ANTHROPOMETRY_FIELDS.map((inputId) =>
    getInput(tool, inputId)
  );
  const anthropometryComplete = requiredAnthropometryFields.every((inputId) =>
    isFieldValid(getInput(tool, inputId), values[inputId] ?? null)
  );

  useEffect(() => {
    const nextSection = getNextWhoGrowthSection(values);
    setOpenSection((currentSection) => {
      if (currentSection === "anthropometry" && nextSection === "anthropometry") {
        return currentSection;
      }

      return nextSection as WhoGrowthFormSection;
    });
  }, [values]);

  const updateValue = (inputId: string, value: FormValue) => {
    const nextValues = { ...values, [inputId]: value };

    if (inputId === "who_age_input_mode" && typeof value === "string") {
      onChange(clearInactiveAgeFields(nextValues, value as WhoGrowthAgeInputMode));
      setOpenSection("age");
      return;
    }

    onChange(nextValues);
  };

  const continueFromAge = () => {
    const nextAge = resolveWhoGrowthAge(values, language);
    if (nextAge.ageDays !== undefined || nextAge.ageMonths !== undefined) {
      setOpenSection("anthropometry");
    } else {
      setOpenSection("age");
    }
  };

  const continueFromAnthropometry = () => {
    if (anthropometryComplete) {
      onFormComplete?.();
    }
  };

  const renderControl = (input: ToolInput, compact = false) => {
    const value = values[input.id] ?? "";
    const invalid = !isFieldValid(input, value);

    if (input.type === "select" || input.type === "single_choice") {
      return (
        <div className={compact ? "option-grid compact" : "option-grid"}>
          {input.options?.map((option) => (
            <label
              className={
                isSelected(value, option.id) ? "option-card selected" : "option-card"
              }
              key={option.id}
            >
              <input
                checked={isSelected(value, option.id)}
                name={input.id}
                type="radio"
                value={option.id}
                onChange={() => {
                  updateValue(input.id, option.id);
                  if (input.id === "sex") {
                    setOpenSection("age_mode");
                  }
                }}
              />
              <span>{option.label[language]}</span>
              {option.description ? <small>{option.description[language]}</small> : null}
            </label>
          ))}
        </div>
      );
    }

    if (input.type === "number") {
      return (
        <>
          <label className="number-input">
            <input
              max={input.max}
              min={input.min}
              placeholder={input.placeholder?.[language]}
              step={input.step}
              type="number"
              value={typeof value === "number" || typeof value === "string" ? value : ""}
              onChange={(event) =>
                updateValue(
                  input.id,
                  event.target.value === "" ? "" : Number(event.target.value)
                )
              }
            />
            {input.unit ? <span>{input.unit}</span> : null}
          </label>
          {invalid ? <p className="field-error">{formCopy.fieldInvalid}</p> : null}
        </>
      );
    }

    if (input.type === "text") {
      return (
        <>
          <label className="number-input">
            <input
              placeholder={input.placeholder?.[language]}
              type="text"
              value={typeof value === "string" ? value : ""}
              onChange={(event) => updateValue(input.id, event.target.value)}
            />
          </label>
          {invalid ? <p className="field-error">{formCopy.fieldInvalid}</p> : null}
        </>
      );
    }

    return null;
  };

  const renderSection = ({
    id,
    title,
    summary,
    step,
    isComplete,
    isLocked,
    lockedText,
    children
  }: {
    children: ReactNode;
    id: WhoGrowthFormSection;
    isComplete: boolean;
    isLocked?: boolean;
    lockedText?: string;
    step: number;
    summary: string;
    title: string;
  }) => {
    const isOpen = openSection === id && !isLocked;

    return (
      <section
        className={[
          "form-field",
          "accordion-field",
          "who-growth-form-section",
          isOpen ? "open" : "",
          isComplete ? "completed" : "",
          isLocked ? "locked" : ""
        ].filter(Boolean).join(" ")}
      >
        <button
          aria-expanded={isOpen}
          className="accordion-trigger"
          disabled={isLocked}
          type="button"
          onClick={() => setOpenSection(isOpen ? "sex" : id)}
        >
          <span className="accordion-label">
            <span className="step-badge">{step}</span>
            <span>
              <strong>{title}</strong>
              <small>
                {isLocked
                  ? formCopy.locked
                  : summary || (isComplete ? formCopy.completed : formCopy.pending)}
              </small>
            </span>
          </span>
          <span className="accordion-state">
            {isLocked ? "−" : isComplete ? "✓" : isOpen ? "⌃" : "⌄"}
          </span>
        </button>
        {isLocked ? (
          <p className="who-growth-lock-note">{lockedText}</p>
        ) : null}
        {isOpen ? <div className="accordion-content">{children}</div> : null}
      </section>
    );
  };

  return (
    <section className="content-panel">
      <h2>{formCopy.title}</h2>
      <p className="muted">{formCopy.privacy}</p>
      <form className="dynamic-form who-growth-form" noValidate>
        {renderSection({
          id: "sex",
          isComplete: !isEmptyFormValue(values.sex ?? null),
          step: 1,
          summary: getInputSummary(sexInput, values.sex ?? null, language),
          title: sexInput.label[language],
          children: (
            <>
              <p>{sexInput.description?.[language]}</p>
              {renderControl(sexInput)}
            </>
          )
        })}

        {renderSection({
          id: "age_mode",
          isComplete: Boolean(ageMode),
          isLocked: isEmptyFormValue(values.sex ?? null),
          lockedText: formCopy.lockedAfterSex,
          step: 2,
          summary: ageMode
            ? getInputSummary(ageModeInput, values.who_age_input_mode ?? null, language)
            : formCopy.ageModeSummary,
          title: ageModeInput.label[language],
          children: (
            <>
              <p>{ageModeInput.description?.[language]}</p>
              <p className="who-growth-form-microcopy">{formCopy.ageMicrocopy}</p>
              {renderControl(ageModeInput)}
            </>
          )
        })}

        {renderSection({
          id: "age",
          isComplete: ageResolved,
          isLocked: !ageMode,
          lockedText: formCopy.lockedAfterMode,
          step: 3,
          summary: ageResolved ? resolvedAge.label : formCopy.ageSummary,
          title:
            ageMode && selectedAgeInputs.length
              ? getInputSummary(ageModeInput, values.who_age_input_mode ?? null, language)
              : language === "es"
                ? "Edad"
                : "Age",
          children: (
            <>
              <p className="who-growth-form-microcopy">{formCopy.ageMicrocopy}</p>
              <div className="who-growth-field-grid">
                {selectedAgeInputs.map((input) => (
                  <div className="who-growth-inline-field" key={input.id}>
                    <label>
                      <span>
                        {input.label[language]}
                        {input.required ? ` (${formCopy.required})` : ""}
                      </span>
                    </label>
                    {renderControl(input, true)}
                  </div>
                ))}
              </div>
              {resolvedAge.warning ? (
                <p className="inactive-calculation who-growth-age-warning">
                  {resolvedAge.warning}
                </p>
              ) : null}
              <button
                className="form-continue"
                type="button"
                onClick={continueFromAge}
              >
                {formCopy.continue}
              </button>
            </>
          )
        })}

        {renderSection({
          id: "anthropometry",
          isComplete: anthropometryComplete,
          isLocked: !ageResolved,
          lockedText: formCopy.lockedAfterMode,
          step: 4,
          summary: anthropometryComplete
            ? formCopy.completed
            : formCopy.anthropometrySummary,
          title: language === "es" ? "Antropometría" : "Anthropometry",
          children: (
            <>
              <p className="who-growth-form-microcopy">
                {formCopy.anthropometryMicrocopy}
              </p>
              <div className="who-growth-field-grid">
                {anthropometryInputs.map((input) => (
                  <div className="who-growth-inline-field" key={input.id}>
                    <label>
                      <span>
                        {input.label[language]}
                        {input.required ? ` (${formCopy.required})` : ""}
                      </span>
                    </label>
                    {renderControl(input, input.id !== "measurement_mode")}
                  </div>
                ))}
              </div>
              {!anthropometryComplete ? (
                <p className="field-error">{formCopy.requiredMessage}</p>
              ) : null}
              <button
                className="form-continue"
                type="button"
                onClick={continueFromAnthropometry}
              >
                {anthropometryComplete ? formCopy.viewResults : formCopy.continue}
              </button>
            </>
          )
        })}
      </form>
    </section>
  );
}
