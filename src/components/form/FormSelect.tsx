interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  options: FormSelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function FormSelect({
  id,
  name,
  label,
  options,
  placeholder = "Sélectionnez une option",
  required = false,
  disabled = false,
  value,
  defaultValue,
  onChange,
}: FormSelectProps) {
  return (
    <fieldset className="fieldset space-y-2">
      <label className="fieldset-label text-base font-semibold" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="select select-bordered w-full text-base h-12"
        required={required}
        disabled={disabled ? true : undefined}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
