import React, { useState } from "react";
import { IPaymentConfirmationProductModal } from "./IPaymentConfirmationProduct";
import ModalIndex from "../ModalIndex/ModalIndex";
import Button from "../../Button/Button";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../redux/store";
import { insertTransactionDetail } from "../../../Services/transactionDetailService";
import { stat } from "fs";
import { useNavigate } from "react-router-dom";
import { decreaseBalance } from "../../../Services/userService";
import { LOGIN } from "../../../redux/slices/authSlice";

const PaymentConfirmationProductModal = (
  props: IPaymentConfirmationProductModal
) => {
  const { isVisible, setIsVisible, price, handleUnsufficientCoin, transactionDetail } = props;
  const { user } = useSelector((state: RootState) => state.auth);
  const nav = useNavigate();

  const handleModalClick = () => {
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const checkCoin = () => {
    if (user.juiceCoin < price) {
      handleUnsufficientCoin();
      setIsVisible(false);
    } else {
      insertTransactionDetail(transactionDetail, (status: boolean, res: any) => {
        if (status) {
          decreaseBalance(user.userId, price, (status: boolean, res: any) => {
            if (status) {
              store.dispatch(LOGIN({ isLoggedIn: true, user: res }));
              nav("/");
            }
          })
        }
      })
      setIsVisible(false);
    }
  };
  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation}>
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-5">
          <h1 className="text-3xl text-5d5d5d font-bold">
            Payment Confirmation
          </h1>
          <img
            src={require("../../../assets/images/paymentConfirmationProduct.png")}
            alt="paymentConfirmationProduct"
          />
          <p className="text-5d5d5d text-xl my-5 font-medium">
            Are you sure to make a payment?
          </p>
          <div className="flex items-center justify-center gap-5 text-xl w-full">
            <Button
              className="border border-[#10b981] text-10b981 w-1/2 font-medium"
              onClick={handleModalClick}
            >
              No
            </Button>
            <Button
              className="bg-10b981 text-white w-1/2 font-medium"
              onClick={checkCoin}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </ModalIndex>
  );
};

export default PaymentConfirmationProductModal;
