import React, { useState } from "react";
import ModalIndex from "../ModalIndex/ModalIndex";
import { IPaymentConfirmationCoinModal } from "./IPaymentConfirmationCoinModal";
import { store } from "../../../redux/store";
import Button from "../../Button/Button";
import QRModal from "../QRModal/QRModal";

const PaymentConfirmationCoinModal = (props: IPaymentConfirmationCoinModal) => {
  const { isVisible, setIsVisible, amount, handleqr } = props;
  const { user } = store.getState().auth;
  const handleModalClick = () => {
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <>
      <ModalIndex onClick={handleModalClick}>
        <div onClick={handleStopPropagation}>
          <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-5">
            <h1 className="text-3xl text-5d5d5d font-bold">
              Payment Confirmation
            </h1>
            <img
              src={require("../../../assets/images/paymentConfirmationCoin.png")}
              alt="paymentConfirmationCoin"
            />
            <p className="text-5d5d5d text-xl my-5 font-medium">
              Make sure the product quantity and payment method are correct
            </p>
            <div className="bg-e5e5e5 flex flex-col rounded-2xl w-full p-5 font-semibold text-lg text-5d5d5d">
              <div className="w-full flex">
                <div className="w-1/2">Name</div>
                <span className="w-1/2">: {user.firstName}</span>
              </div>
              <div className="w-full flex">
                <div className="w-1/2">Item</div>
                <span className="w-1/2">: {amount} JuiceCoin</span>
              </div>
              <div className="w-full flex">
                <div className="w-1/2">Payment</div>
                <span className="w-1/2">: {"QRIS"}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 w-full">
              <Button
                className="border border-[#10b981] text-10b981 w-1/2"
                onClick={handleModalClick}
              >
                Cancel
              </Button>
              <Button className="bg-10b981 text-white w-1/2" onClick={() => {handleqr(); setIsVisible(false)}}>Pay Now!</Button>
            </div>
          </div>
        </div>
      </ModalIndex>
    </>
  );
};

export default PaymentConfirmationCoinModal;
