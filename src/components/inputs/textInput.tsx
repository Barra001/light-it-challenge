import { ChangeEvent } from "react";
import theme from "./inputs.theme.module.scss";

type TextInputProps = {
  placeholder: string;
  id: string;
  error?: string;
  value: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function SimpleTextInput({
  placeholder,
  id,
  error,
  value,
  onChange,
  required,
}: TextInputProps) {
  return (
    <div className={theme.formGroup}>
      <input
        type="input"
        className={theme.formField}
        style={error ? { borderBottom: "2px solid red" } : {}}
        name={placeholder.toLowerCase()}
        id={id}
        value={value}
        onChange={onChange}
      />
      <label className={theme.formLabel}>
        {placeholder + (required ?? false ? "*" : "")}
      </label>
      {error && <div className={theme.error}>{error}</div>}
    </div>
  );
}

export function TextAreaInput({
  placeholder,
  id,
  error,
  value,
  onChange,
  required,
}: TextInputProps) {
  return (
    <div className={theme.formGroup + " " + theme.field}>
      <textarea
        rows={2}
        cols={50}
        className={theme.formField}
        style={error ? { borderBottom: "2px solid red" } : {}}
        name={placeholder.toLowerCase()}
        id={id}
        value={value}
        onChange={onChange}
      />
      <label className={theme.formLabel}>
        {placeholder + (required ?? false ? "*" : "")}
      </label>
      {error && <div className={theme.error}>{error}</div>}
    </div>
  );
}

export default SimpleTextInput;
