import React from "react";
import { ITopUpButton } from "./ITopUpButton";

const TopUpButton = (props: ITopUpButton) => {
  const { children, onClick } = props;
  return (
    <button className="relative bg-e5e5e5 py-8 rounded-2xl text-10b981 font-bold text-3xl flex items-center justify-center w-24" onClick={onClick}>
      {children}
      <img
        src={require("../../assets/images/juiceCoin.png")}
        alt="juiceCoin"
        className="w-8"
      />
    </button>
  );
};

export default TopUpButton;
