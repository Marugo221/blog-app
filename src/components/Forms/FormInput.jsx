import cn from "classnames";

export function FormInput({ id, title, error, reg, value = "" }) {
  const fieldType = id.toLowerCase().includes("password") ? "password" : "text";

  return (
    <li className={cn("form__field")}>
      <label className={cn("label")} htmlFor={id}>
        {title}
      </label>
      <input
        type={fieldType}
        id={id}
        defaultValue={value}
        className={cn("control", "control_input", { error: error })}
        placeholder={title}
        {...reg}
      />
      {error && (
        <span className={cn("note_field", "error", "show")}>
          {error?.message}
        </span>
      )}
    </li>
  );
}
