import React from "react";
import { INotInputModal } from "./INotInputModal";
import ModalIndex from "../ModalIndex/ModalIndex";
import Button from "../../Button/Button";

const NotInputModal = (props: INotInputModal) => {
  const { isVisible, setIsVisible } = props;
  const handleModalClick = () => {
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation}>
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-5">
          <h1 className="text-3xl text-5d5d5d font-bold">
            JuiceCoin is not Inputted
          </h1>
          <img
            src={require("../../../assets/images/insufficientCoin.png")}
            alt="insufficientCoin"
          />
          <p className="text-5d5d5d text-xl my-5 font-medium">
            Please choose or input the top-up balance!
          </p>
          <div className="flex items-center justify-center gap-5 text-xl w-full">
            <Button
              className="bg-10b981 text-white w-1/2 font-medium"
              onClick={handleModalClick}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </ModalIndex>
  );
};

export default NotInputModal;
