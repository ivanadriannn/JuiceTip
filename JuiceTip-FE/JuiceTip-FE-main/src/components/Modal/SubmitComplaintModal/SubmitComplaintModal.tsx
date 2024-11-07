import React from "react";
import { ISubmitComplaintModal } from "./ISubmitComplaintModal";
import ModalIndex from "../ModalIndex/ModalIndex";
import Button from "../../Button/Button";

const SubmitComplaintModal = (props: ISubmitComplaintModal) => {
  const { isVisible, setIsVisible } = props;
  const handleModalClick = () => {
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation} className="w-[45rem]">
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-5">
          <h1 className="text-3xl text-5d5d5d font-bold">Submit Complaint</h1>
          <img
            src={require("../../../assets/images/submitComplaint.png")}
            alt="paymentConfirmationProduct"
          />
          <p className="text-5d5d5d text-xl my-5 font-medium">
            Are you sure submit this complaint? After submit this form, we will
            review your complaint form.
          </p>
          <div className="flex items-center justify-center gap-5 text-xl w-full">
            <Button
              className="border border-[#10b981] text-10b981 w-1/2 font-medium"
              onClick={handleModalClick}
            >
              No
            </Button>
            <Button className="bg-10b981 text-white w-1/2 font-medium">
              Yes
            </Button>
          </div>
        </div>
      </div>
    </ModalIndex>
  );
};

export default SubmitComplaintModal;
