import { ChangeEvent } from "react";
import theme from "./inputs.theme.module.scss";

type NumberInputProps = {
  placeholder: string;
  id: string;
  error?: string;
  value: number;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function NumberInput({
  placeholder,
  id,
  error,
  value,
  onChange,
  required,
}: NumberInputProps) {
  return (
    <div className={theme.formGroup}>
      <input
        type="number"
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

export default NumberInput;
