import React, { useEffect, useState } from "react";
import { IQRModal } from "./IQRModal";
import ModalIndex from "../ModalIndex/ModalIndex";
import Button from "../../Button/Button";
import { store } from "../../../redux/store";
import { LOGIN, TOPUP } from "../../../redux/slices/authSlice";
import { topUp } from "../../../Services/userService";

const QRModal = (props: IQRModal) => {
  const { isVisible, setIsVisible, setAmount, amount, userId } = props;
  const [status, setStatus] = useState("Unpaid");

  const handleModalClick = () => {
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("Success");
      topUp(userId, amount, (status: boolean, res: any) => {
        if (status) {
          store.dispatch(LOGIN({ isLoggedIn: true, user: res }));
        }
      })
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation} className="w-[45rem]">
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-5">
          <h1 className="text-3xl text-5d5d5d font-bold">Payment Settlement</h1>
          <img src={require("../../../assets/images/qr.png")} alt="QR" />
          <div className="bg-e5e5e5 flex flex-col rounded-2xl w-full p-5 font-semibold text-lg text-5d5d5d">
            <div className="w-full flex">
              <div className="w-1/2">Order Expiration</div>
              <span className="w-1/2">: Temporary</span>
            </div>
            <div className="w-full flex">
              <div className="w-1/2">Payment Status</div>
              <span className="w-1/2">: {status}</span>
            </div>
          </div>
          <Button
            className="bg-10b981 text-white w-full font-medium text-xl"
            onClick={() => {
              handleModalClick();
              setAmount(0);
            }}
          >
            Back
          </Button>
        </div>
      </div>
    </ModalIndex>
  );
};

export default QRModal;
