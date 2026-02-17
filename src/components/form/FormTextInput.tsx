interface FormTextInputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
}

export function FormTextInput({
  id,
  name,
  label,
  placeholder,
  maxLength,
  required = false,
}: FormTextInputProps) {
  return (
    <fieldset className="fieldset space-y-2">
      <label className="fieldset-label text-base font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        className="input input-bordered w-full text-base h-12"
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
      />
    </fieldset>
  );
}
