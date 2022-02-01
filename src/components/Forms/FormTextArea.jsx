import cn from "classnames";
import { fieldErrorTip } from "../../tools/tools";

export function FormTextArea({ id, title, error, reg, value = "" }) {
  if (value === null) value = "";

  return (
    <li className={cn("form__field")}>
      <label className={cn("label")} htmlFor={id}>
        {title}
      </label>
      <textarea
        id={id}
        defaultValue={value}
        className={cn("control", "control_textarea", { error: error })}
        cols={30}
        rows={5}
        placeholder={title}
        {...reg}
      />
      {fieldErrorTip(error)}
    </li>
  );
}
