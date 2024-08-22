import { ChangeEvent } from "react";
import theme from "./inputs.theme.module.scss";

type SelectInputProps = {
  placeholder: string;
  id: string;
  error?: string;
  value: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};

function SelectInput({
  placeholder,
  id,
  error,
  value,
  onChange,
  required,
  options,
}: SelectInputProps) {
  return (
    <div className={theme.formGroup}>
      <select
        onChange={onChange}
        name={placeholder.toLowerCase()}
        value={value}
        id={id}
        className={theme.formField}
      >
        <option className={theme.option} value="empty">
          {"Select " + placeholder.toLowerCase()}
        </option>
        {options.map((option, index) => (
          <option className={theme.option} key={index} value={index}>
            {option}
          </option>
        ))}
      </select>
      <label className={theme.formLabel}>
        {placeholder + (required ?? false ? "*" : "")}
      </label>
      {error && <div className={theme.error}>{error}</div>}
    </div>
  );
}

export default SelectInput;
