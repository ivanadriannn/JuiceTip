import React from "react";
import { ILabel } from "./ILabel";

const Label = (props: ILabel) => {
  const { htmlFor, children } = props;
  return (
    <div>
      <label htmlFor={htmlFor} className="text-5d5d5d font-bold text-sm">
        {children}
      </label>
    </div>
  );
};

export default Label;
