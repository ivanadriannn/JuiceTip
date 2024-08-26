import React from "react";
import { IModalIndex } from "./IModalIndex";

const ModalIndex = (props: IModalIndex) => {
  const { children, onClick } = props;
  return (
    <div
      className="bg-d9d9d9 bg-modal z-10 fixed top-0 left-0 w-screen h-screen flex justify-center items-center"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ModalIndex;
