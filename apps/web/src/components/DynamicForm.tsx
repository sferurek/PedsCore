import { useEffect, useMemo, useState } from "react";
import type { ClinicalToolMetadata, ToolInput } from "@peds-core/core";
import { translations } from "../i18n/translations";
import type { FormValue, FormValues } from "../utils/formState";
import {
  getInitialFormState,
  hasActiveForm,
  validateForm
} from "../utils/formState";
import type { Language } from "../utils/language";

interface DynamicFormProps {
  language: Language;
  tool: ClinicalToolMetadata;
  onStateChange: (values: FormValues) => void;
}

const isSelected = (currentValue: FormValue, optionId: string): boolean =>
  Array.isArray(currentValue)
    ? currentValue.includes(optionId)
    : currentValue === optionId;

export function DynamicForm({
  language,
  tool,
  onStateChange
}: DynamicFormProps) {
  const t = translations[language];
  const initialState = useMemo(() => getInitialFormState(tool), [tool]);
  const [values, setValues] = useState<FormValues>(initialState);
  const validation = validateForm(tool, values);
  const missingRequiredIds = new Set(validation.missingRequiredInputIds);

  useEffect(() => {
    setValues(initialState);
    onStateChange(initialState);
  }, [initialState, onStateChange]);

  const updateValue = (inputId: string, value: FormValue) => {
    const nextValues = { ...values, [inputId]: value };
    setValues(nextValues);
    onStateChange(nextValues);
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
        {tool.inputs?.map((input) => (
          <FormField
            input={input}
            isMissing={missingRequiredIds.has(input.id)}
            key={input.id}
            language={language}
            value={values[input.id] ?? null}
            onChange={(value) => updateValue(input.id, value)}
          />
        ))}
      </form>
    </section>
  );
}

interface FormFieldProps {
  input: ToolInput;
  isMissing: boolean;
  language: Language;
  value: FormValue;
  onChange: (value: FormValue) => void;
}

function FormField({
  input,
  isMissing,
  language,
  value,
  onChange
}: FormFieldProps) {
  const t = translations[language];
  const fieldDescription = input.description?.[language] ?? input.helperText?.[language];

  return (
    <fieldset className={isMissing ? "form-field missing" : "form-field"}>
      <legend>
        {input.label[language]}
        {input.required ? <span aria-label={t.form.required}> *</span> : null}
      </legend>
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
                onChange={() => onChange(option.id)}
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
            onClick={() => onChange(false)}
          >
            {language === "es" ? "No" : "No"}
          </button>
          <button
            className={value === true ? "selected" : ""}
            type="button"
            onClick={() => onChange(true)}
          >
            {language === "es" ? "Si" : "Yes"}
          </button>
        </div>
      ) : null}
      {input.type === "number" ? (
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
          />
          {input.unit ? <span>{input.unit}</span> : null}
        </label>
      ) : null}
      {input.type === "select" ? (
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
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
                    onChange(nextValues);
                  }}
                />
                <span>{option.label[language]}</span>
              </label>
            );
          })}
        </div>
      ) : null}
      {isMissing ? <p className="field-error">{t.form.requiredMessage}</p> : null}
    </fieldset>
  );
}

