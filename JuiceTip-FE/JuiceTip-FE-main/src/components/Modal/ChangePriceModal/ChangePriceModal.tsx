import React from "react";
import ModalIndex from "../ModalIndex/ModalIndex";
import { IChangePriceModal } from "./IChangePriceModal";
import Button from "../../Button/Button";
import { IMessage } from "../../../interfaces/Chat.interfaces";
import { v4 as uuid } from "uuid";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../Services/firebase";

const ChangePriceModal = (props: IChangePriceModal) => {
  const { isVisible, setIsVisible, bargainPrice, customerId, justiperId, image, product } = props;
  const handleModalClick = () => {
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

    const handleApproveBargain = async () => {
    const combinedId =
      justiperId > customerId
        ? justiperId + customerId
        : customerId + justiperId;

    const newMessage: IMessage = {
      id: uuid(),
      message: `Hi, I accept your offer the price will change to ${bargainPrice} Juice Coin`,
      date: Timestamp.now(),
      senderId: customerId,
      isBargain: true,
      productId: product?.productId || '',
      productName: product?.productName || '',
      image: image,
      productPrice: null,
      bargainPrice: bargainPrice,
      isTakeOrder: false,
      notes: product?.notes || null,
    };

    await updateDoc(doc(db, "chats", combinedId), {
      messages: arrayUnion(newMessage),
    });
  };

  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation}>
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-5">
          <h1 className="text-4xl text-5d5d5d font-bold">Changing Price</h1>
          <img
            src={require("../../../assets/images/changingPrice.png")}
            alt="changingPrice"
          />
          <div className="text-2xl font-medium flex break-words text-center items-center">
            Are you sure want to change the price from &nbsp;
            <div className="flex items-center opacity-50 relative">
              <div className="w-full h-0.5 bg-black absolute"></div>
              <span className="font-bold text-3xl">{product?.productPrice}</span>
              <img
                src={require("../../../assets/images/juiceCoin.png")}
                alt="juiceCoin"
                className="w-8 h-8"
              />
            </div>
            &nbsp;to&nbsp;
            <div className="flex items-center">
              <span className="font-bold text-3xl">{bargainPrice}</span>
              <img
                src={require("../../../assets/images/juiceCoin.png")}
                alt="juiceCoin"
                className="w-8 h-8"
              />
            </div>
            ?
          </div>
          <div className="flex w-full gap-7">
            <Button
              className="border border-[#10b981] text-10b981 w-1/2 text-xl"
              onClick={handleModalClick}
            >
              No
            </Button>
            <Button
              className="bg-10b981 text-white w-1/2 text-xl"
              onClick={() => {
                setIsVisible(false); 
                handleApproveBargain();
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

export default ChangePriceModal;
