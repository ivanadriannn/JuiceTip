import React from "react";
import Input from "./Input/Input";
import Label from "./Label/Label";
import { IInputGroup } from "./IInputGroup";

const InputGroup = (props: IInputGroup) => {
  const {
    id,
    children,
    placeholder,
    type = "text",
    onChange,
    name,
    classInput,
    checked,
    value
  } = props;
  if (type === "radio") {
    return (
      <div className="flex items-center gap-2 mt-1 w-full text-xl">
        <Input
          id={id}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          name={name}
          value={value}
          checked={checked}
        />
        <Label htmlFor={id} children={children} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col mt-5 w-full">
        <Label htmlFor={id} children={children} />
        <Input
          id={id}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          className={classInput}
          value={value}
        />
      </div>
    );
  }
};

export default InputGroup;
