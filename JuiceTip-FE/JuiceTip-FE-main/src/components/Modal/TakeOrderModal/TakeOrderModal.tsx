import React from "react";
import ModalIndex from "../ModalIndex/ModalIndex";
import { ITakeOrderModal } from "./ITakeOrderModal";
import Button from "../../Button/Button";
import { v4 as uuid } from "uuid";
import { IMessage } from "../../../interfaces/Chat.interfaces";
import { arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../Services/firebase";
import { INotification } from "../../../interfaces/Notification.interfaces";

const TakeOrderModal = (props: ITakeOrderModal) => {
  const { isVisible, setIsVisible, product, bargainPrice, customerId, justiperId, justiperName, userProfile } = props;
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleTakeOrder = async (e: any) => {
    e.stopPropagation();
    const combinedId =
      justiperId > customerId
        ? justiperId + customerId
        : customerId + justiperId;

    const newMessage: IMessage = {
      id: uuid(),
      message: `Your product has been taken order and processed! Check your notification to make payment or directly click the payment button!`,
      date: Timestamp.now(),
      senderId: customerId,
      isBargain: true,
      productId: product?.productId || '',
      productName: product?.productName || '',
      image: product?.productImageList[0] || '',
      productPrice: product?.productPrice || 0,
      bargainPrice: bargainPrice || 0,
      isTakeOrder: true,
      notes: product?.notes || null,
    };

    const newNotification: INotification = {
      id: uuid(),
      productId: product?.productId || '',
      image: product?.productImageList[0] || '',
      price: bargainPrice || 0,
      isRead: false,
      userProfile: userProfile,
      justiperName: justiperName,
      justiperId: customerId,
      productName: product?.productName || '',
      date: Timestamp.now(),
    }
    
    setIsVisible(false);

    const notificationDoc = doc(db, "notifications", justiperId);
    const notificationSnap = await getDoc(notificationDoc);

    if (!notificationSnap.exists()) {
      await setDoc(notificationDoc, { notification: [newNotification] });
    } else {
      await updateDoc(notificationDoc, { notification: arrayUnion(newNotification) });
    }

    await updateDoc(doc(db, "chats", combinedId), {
      messages: arrayUnion(newMessage),
    });
  }

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation}>
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-7">
          <h1 className="text-4xl text-5d5d5d font-bold">
            Take Order Confirmation
          </h1>
          <img
            src={product && product.productImageList[0]}
            alt="productImage"
            className="product-card-logo w-56 h-56"
          />
          <div className="flex flex-col text-xl font-medium text-5d5d5d text-center gap-2">
            <div className="flex">
              You taking order
              <p className="font-bold">&nbsp;{product && product.productName}&nbsp;</p>for
            </div>
            <div>
              <p className="text-black font-bold">
                &nbsp;{product && product.customerName}&nbsp;
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full px-5 py-6 bg-e5e5e5 rounded-lg">
            <p className="text-5d5d5d font-semibold text-xl">Product Price :</p>
            <div className="font-extrabold text-3xl flex items-center">
              {bargainPrice ? bargainPrice : product && product.productPrice}
              <img
                src={require("../../../assets/images/juiceCoin.png")}
                alt="juiceCoin"
                className="w-8 h-8"
              />
            </div>
          </div>
          <div className="w-full">
            <Button
              className="bg-10b981 w-full text-2xl font-medium py-2 rounded-lg text-white"
              onClick={handleTakeOrder}
            >
              Confirm
            </Button>
            <Button
              className="w-full text-2xl font-medium py-2 rounded-lg text-10b981"
              onClick={handleModalClick}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </ModalIndex>
  );
};

export default TakeOrderModal;
