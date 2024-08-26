import React from "react";
import { Link } from "react-router-dom";
import { IButton } from "./IButton";

const Button = (props: IButton) => {
  const { href, children, className, onClick } = props;
  if (href) {
    return (
      <Link to={href}>
        <button
          className={`font-bold rounded my-2 py-2 px-4 ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`font-bold rounded my-2 py-2 px-4 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
