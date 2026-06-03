import { useEffect, useMemo, useState } from "react";
import type { ClinicalToolMetadata, ToolInput } from "@peds-core/core";
import { translations } from "../i18n/translations";
import type { FormValue, FormValues } from "../utils/formState";
import {
  getFirstInputId,
  getInitialFormState,
  getInputSummary,
  getNextIncompleteInputId,
  hasActiveForm,
  isInputComplete,
  validateForm
} from "../utils/formState";
import type { Language } from "../utils/language";

interface DynamicFormProps {
  language: Language;
  tool: ClinicalToolMetadata;
  onFormComplete?: () => void;
  onStateChange: (values: FormValues) => void;
}

const isSelected = (currentValue: FormValue, optionId: string): boolean =>
  Array.isArray(currentValue)
    ? currentValue.includes(optionId)
    : currentValue === optionId;

export function DynamicForm({
  language,
  tool,
  onFormComplete,
  onStateChange
}: DynamicFormProps) {
  const t = translations[language];
  const initialState = useMemo(() => getInitialFormState(tool), [tool]);
  const [values, setValues] = useState<FormValues>(initialState);
  const [openInputId, setOpenInputId] = useState<string | null>(() =>
    getFirstInputId(tool)
  );
  const validation = validateForm(tool, values);
  const missingRequiredIds = new Set(validation.missingRequiredInputIds);

  useEffect(() => {
    setValues(initialState);
    setOpenInputId(getFirstInputId(tool));
    onStateChange(initialState);
  }, [initialState, onStateChange, tool]);

  const advanceAfterInput = (
    input: ToolInput,
    nextValues: FormValues,
    shouldAdvance: boolean
  ) => {
    if (!shouldAdvance || !isInputComplete(input, nextValues[input.id] ?? null)) {
      return;
    }

    const nextInputId = getNextIncompleteInputId(tool, nextValues, input.id);
    setOpenInputId(nextInputId);

    if (!nextInputId && validateForm(tool, nextValues).isComplete) {
      onFormComplete?.();
    }
  };

  const updateValue = (
    input: ToolInput,
    value: FormValue,
    shouldAdvance = false
  ) => {
    const inputId = input.id;
    const nextValues = { ...values, [inputId]: value };
    setValues(nextValues);
    onStateChange(nextValues);
    advanceAfterInput(input, nextValues, shouldAdvance);
  };

  if (!hasActiveForm(tool)) {
    return (
      <section className="content-panel">
        <h2>{t.form.title}</h2>
        <p className="empty-state">{t.form.noActiveForm}</p>
      </section>
    );
  }

  return (
    <section className="content-panel">
      <h2>{t.form.title}</h2>
      <p className="muted">{t.form.privacyNote}</p>
      <form className="dynamic-form" noValidate>
        {tool.inputs?.map((input, index) => (
          <FormField
            input={input}
            isMissing={missingRequiredIds.has(input.id)}
            isOpen={openInputId === input.id}
            key={input.id}
            language={language}
            stepNumber={index + 1}
            summary={getInputSummary(input, values[input.id] ?? null, language)}
            isComplete={isInputComplete(input, values[input.id] ?? null)}
            value={values[input.id] ?? null}
            onChange={(value, shouldAdvance) =>
              updateValue(input, value, shouldAdvance)
            }
            onContinue={() =>
              advanceAfterInput(
                input,
                values,
                input.type === "number" || input.type === "multi_select"
              )
            }
            onToggle={() =>
              setOpenInputId(openInputId === input.id ? null : input.id)
            }
          />
        ))}
      </form>
    </section>
  );
}

interface FormFieldProps {
  input: ToolInput;
  isComplete: boolean;
  isMissing: boolean;
  isOpen: boolean;
  language: Language;
  stepNumber: number;
  summary: string;
  value: FormValue;
  onChange: (value: FormValue, shouldAdvance?: boolean) => void;
  onContinue: () => void;
  onToggle: () => void;
}

function FormField({
  input,
  isComplete,
  isMissing,
  isOpen,
  language,
  stepNumber,
  summary,
  value,
  onChange,
  onContinue,
  onToggle
}: FormFieldProps) {
  const t = translations[language];
  const fieldDescription = input.description?.[language] ?? input.helperText?.[language];

  return (
    <section
      className={[
        "form-field",
        "accordion-field",
        isOpen ? "open" : "",
        isComplete ? "completed" : "",
        isMissing ? "missing" : ""
      ].filter(Boolean).join(" ")}
    >
      <button
        aria-expanded={isOpen}
        className="accordion-trigger"
        type="button"
        onClick={onToggle}
      >
        <span className="accordion-label">
          <span className="step-badge">{stepNumber}</span>
          <span>
            <strong>
              {input.label[language]}
              {input.required ? <span aria-label={t.form.required}> *</span> : null}
            </strong>
            <small>{summary || (isComplete ? t.form.completed : t.form.pending)}</small>
          </span>
        </span>
        <span className="accordion-state">
          {isComplete ? "✓" : isOpen ? "⌃" : "⌄"}
        </span>
      </button>
      {isOpen ? (
        <div className="accordion-content">
          {fieldDescription ? <p>{fieldDescription}</p> : null}
          {input.type === "single_choice" ? (
            <div className="option-grid">
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
                    onChange={() => onChange(option.id, true)}
                  />
                  <span>{option.label[language]}</span>
                  {option.description ? <small>{option.description[language]}</small> : null}
                </label>
              ))}
            </div>
          ) : null}
          {input.type === "boolean" ? (
            <div className="boolean-toggle" role="group">
              <button
                className={value === false ? "selected" : ""}
                type="button"
                onClick={() => onChange(false, true)}
              >
                {language === "es" ? "No" : "No"}
              </button>
              <button
                className={value === true ? "selected" : ""}
                type="button"
                onClick={() => onChange(true, true)}
              >
                {language === "es" ? "Si" : "Yes"}
              </button>
            </div>
          ) : null}
          {input.type === "number" ? (
            <div className="number-accordion-row">
              <label className="number-input">
                <input
                  max={input.max}
                  min={input.min}
                  placeholder={input.placeholder?.[language]}
                  step={input.step}
                  type="number"
                  value={typeof value === "number" || typeof value === "string" ? value : ""}
                  onChange={(event) =>
                    onChange(event.target.value === "" ? "" : Number(event.target.value))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      onContinue();
                    }
                  }}
                />
                {input.unit ? <span>{input.unit}</span> : null}
              </label>
              <button className="form-continue" type="button" onClick={onContinue}>
                {t.form.continue}
              </button>
            </div>
          ) : null}
          {input.type === "select" ? (
            <select
              value={typeof value === "string" ? value : ""}
              onChange={(event) => onChange(event.target.value, true)}
            >
              <option value="">{t.form.selectPlaceholder}</option>
              {input.options?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label[language]}
                </option>
              ))}
            </select>
          ) : null}
          {input.type === "multi_select" ? (
            <div className="option-grid">
              {input.options?.map((option) => {
                const currentValues = Array.isArray(value) ? value : [];
                return (
                  <label className="option-card" key={option.id}>
                    <input
                      checked={currentValues.includes(option.id)}
                      type="checkbox"
                      value={option.id}
                      onChange={(event) => {
                        const nextValues = event.target.checked
                          ? [...currentValues, option.id]
                          : currentValues.filter((item) => item !== option.id);
                        onChange(nextValues, false);
                      }}
                    />
                    <span>{option.label[language]}</span>
                  </label>
                );
              })}
              <button className="form-continue" type="button" onClick={onContinue}>
                {t.form.continue}
              </button>
            </div>
          ) : null}
          {isMissing ? <p className="field-error">{t.form.requiredMessage}</p> : null}
        </div>
      ) : null}
    </section>
  );
}
