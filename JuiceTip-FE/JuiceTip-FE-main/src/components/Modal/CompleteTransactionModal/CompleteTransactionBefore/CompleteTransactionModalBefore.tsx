import React from "react";
import { ICompleteTransactionBefore } from "./ICompleteTransactionBefore";
import ModalIndex from "../../ModalIndex/ModalIndex";
import Button from "../../../Button/Button";

const CompleteTransactionModalBefore = (props: ICompleteTransactionBefore) => {
  const { isVisible, setIsVisible, setShowFinishAfter } = props;
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation} className="w-[45rem]">
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-5">
          <h1 className="text-3xl text-5d5d5d font-bold">
            Complete Transaction
          </h1>
          <img
            src={require("../../../../assets/images/completeTransaction.png")}
            alt="completeTransaction"
          />
          <p className="text-5d5d5d text-xl my-5 font-bold">
            This action will finish the transaction. Are you sure?
          </p>
          <div className="flex items-center justify-center gap-5 w-full">
            <Button
              className="border border-[#10b981] text-10b981 w-1/2"
              onClick={handleModalClick}
            >
              No
            </Button>
            <Button
              className="bg-10b981 text-white w-1/2"
              onClick={() => {
                setIsVisible(false);
                setShowFinishAfter(true);
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </ModalIndex>
  );
};

export default CompleteTransactionModalBefore;
