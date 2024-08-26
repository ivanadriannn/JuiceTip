import React from "react";
import { Link } from "react-router-dom";
import { IAnchor } from "./IAnchor";

const Anchor = (props: IAnchor) => {
  const { children, variant, href, target } = props;
  return (
    <Link
      to={href}
      className={variant}
      {...(target ? { target: "_blank" } : {})}
    >
      {children}
    </Link>
  );
};

export default Anchor;
