import React from "react";
import { IInput } from "./IInput";

const Input = (props: IInput) => {
  const {
    id,
    placeholder,
    type = "text",
    onChange,
    name,
    className,
    value,
    checked,
    maxLength,
    price,
  } = props;

  return (
    <div className="relative flex items-center justify-center">
      <input
        name={name}
        type={type}
        id={id}
        className={`${className} mt-2 px-5 py-3 focus:outline-none rounded-lg text-gray-600 font-medium text-sm w-full ${price ? "pl-11" : ""}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        checked={checked}
        maxLength={maxLength}
      />
      {price && (<img src={require("../../../assets/images/juiceCoin.png")} alt="juiceCoin" className="absolute left-3 top-4 w-7 h-7"/>)}
    </div>
  );
};

export default Input;
