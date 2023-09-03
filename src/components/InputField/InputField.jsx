import { forwardRef } from "react";

function InputField(
  {
    children,
    id = "inputField",
    type = "text",
    label = "",
    name = "",
    placeholder = "",
    minLength = 0,
    required = false,
    autoFocus = false,
    autoComplete = "on",
    className = "",
    labelClassName = "",
    inputClassName = "",
    accept = "",
    onChange = () => {},
  },
  ref
) {
  const fieldClasses = `text-primary_400 bg-primary_800 px-2 rounded outline-none ${inputClassName}`;

  return (
    <div className={className}>
      {!!label && (
        <label
          htmlFor={id}
          className={`font-semibold cursor-pointer ${labelClassName}`}
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          ref={ref}
          placeholder={placeholder}
          minLength={minLength}
          className={fieldClasses}
          autoComplete={autoComplete}
          required={required}
          autoFocus={autoFocus}
          onChange={onChange}
        />
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          ref={ref}
          placeholder={placeholder}
          minLength={minLength}
          className={fieldClasses}
          autoComplete={autoComplete}
          required={required}
          autoFocus={autoFocus}
          onChange={onChange}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          ref={ref}
          placeholder={placeholder}
          minLength={minLength}
          className={fieldClasses}
          accept={accept}
          autoComplete={autoComplete}
          required={required}
          autoFocus={autoFocus}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default forwardRef(InputField);
