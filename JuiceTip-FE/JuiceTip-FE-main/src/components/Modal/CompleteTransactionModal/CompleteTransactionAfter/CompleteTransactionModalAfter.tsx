import React from "react";
import { ICompleteTransactionAfter } from "./ICompleteTransactionModalAfter";
import ModalIndex from "../../ModalIndex/ModalIndex";
import Button from "../../../Button/Button";

const CompleteTransactionModalAfter = (props: ICompleteTransactionAfter) => {
  const { isVisible, setIsVisible, product, setShowRating } = props;
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsVisible(false)
    setShowRating(true)
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation} className="w-[45rem]">
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-5">
          <img
            src={require("../../../../assets/images/completeTransaction-2.png")}
            alt="completeTransaction-2"
          />
          <p className="text-xl my-5 font-semibold inline-block break-words text-center">
            YEAY! You just finished your{" "}
            <span className="font-extrabold break-words">
              “{product.productName}”
            </span>{" "}
            Transaction. Don’t forget to rating your Justiper. Enjoy your
            product :D
          </p>
          <div className="flex items-center justify-center w-full">
            <Button
              className="bg-10b981 text-white w-1/2 text-xl font-semibold"
              onClick={() => {
                setIsVisible(false);
                setShowRating(true);
              }}
            >
              Go Back!
            </Button>
          </div>
        </div>
      </div>
    </ModalIndex>
  );
};

export default CompleteTransactionModalAfter;
