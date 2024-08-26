import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Button from "../Button/Button";
import ChangePriceModal from "../Modal/ChangePriceModal/ChangePriceModal";
import { IMessage } from "../../interfaces/Chat.interfaces";
import { v4 as uuid } from "uuid";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../Services/firebase";
import { IChatBubble } from "./ChatBubble.interfaces";
import TakeOrderModal from "../Modal/TakeOrderModal/TakeOrderModal";
import { getProductById, IProduct } from "../../Services/productService";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../Services/userService";
import { ICustomer } from "../../interfaces/Customer.interfaces";
import { stringify } from "querystring";

const ChatBubble = (props: IChatBubble) => {
  const {
    message,
    date,
    id,
    senderId,
    isBargain,
    image,
    productPrice,
    productName,
    bargainPrice,
    interlocutors,
    productId,
    isTakeOrder,
    notes,
  } = props;
  const [orderModal, setOrderModal] = useState(false);
  const [showChangePrice, setShowChangePrice] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [product, setProduct] = useState<IProduct>();
  const [justiper, setJustiper] = useState<ICustomer>({} as ICustomer);
  const isSender = user.userId === senderId;
  const navigate = useNavigate();

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (productId) {
      getProductById(productId, (status: boolean, res: any) => {
        if (status) {
          setProduct(res);
        }
      });
    }
  }, [getProductById, productId]);

  useEffect(() => {
    if (interlocutors) {
      getUserById(interlocutors, (status: boolean, res: any) => {
        if (status) {
          setJustiper(res);
        }
      })
    }
  }, [getUserById, interlocutors]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, date]);

  const formatTime = () => {
    const milliseconds = date.seconds * 1000 + date.nanoseconds / 1000000;
    const currDate = new Date(milliseconds);

    const hours = currDate.getHours().toString().padStart(2, "0");
    const minutes = currDate.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const handleRejectBargain = async () => {
    const combinedId =
      interlocutors > user.userId
        ? interlocutors + user.userId
        : user.userId + interlocutors;

    const newMessage: IMessage = {
      id: uuid(),
      message: "Sorry, I reject your offer for one reason or another",
      date: Timestamp.now(),
      senderId: user.userId,
      isBargain: false,
      productId: null,
      productName: null,
      image: null,
      productPrice: null,
      bargainPrice: null,
      isTakeOrder: false,
      notes: null,
    };

    await updateDoc(doc(db, "chats", combinedId), {
      messages: arrayUnion(newMessage),
    });
  };

  return (
    <>
      {!isBargain ? (
        <div ref={ref} className={`flex ${isSender ? "justify-end" : "justify-start"} px-5 mb-5`}>
          <span className={`rounded-md px-5 py-2 text-[#5D5D5D] ${isSender ? "bg-[#D9FDD3]" : "bg-[#fafafa]"}`}>
            <div className="text-lg pr-14">{message}</div>
            <div className="text-xs flex justify-end opacity-60">
              {formatTime()}
            </div>
          </span>
        </div>
      ) : (
        <div ref={ref} className={`flex ${isSender ? "justify-end" : "justify-start"} px-5 mb-5`}>
          <span className={`rounded-md px-5 py-2 text-[#5D5D5D] ${isSender ? "bg-[#D9FDD3]" : "bg-[#fafafa]"} ${isTakeOrder ? "w-5/12" : ""}`}>
            <div className={`w-full h-max my-2 rounded-md ${isSender ? "bg-[#C6EFBF]" : "bg-[#F4F4F4]"}`}>
              <div className="flex p-5 gap-5">
                <div className="h-36 w-36">
                  <img src={image ? image : require("../../assets/images/logo.png")}
                    alt="logo"
                    className="w-full h-full object-cover product-card-logo"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#10B981]">
                    {productName}
                  </p>
                  <div className="flex mt-5 gap-5">
                    {productPrice && (
                      <div className="flex items-center opacity-50 relative">
                        <div className="w-full h-0.5 bg-black absolute"></div>
                        <p className="text-3xl font-extrabold">
                          {productPrice}
                        </p>
                        <img
                          src={require("../../assets/images/juiceCoin.png")}
                          alt="juiceCoin"
                          className="w-8"
                        />
                      </div>
                    )}
                    <div className="flex items-center">
                      <p className="text-3xl font-extrabold">
                        {bargainPrice}
                      </p>
                      <img
                        src={require("../../assets/images/juiceCoin.png")}
                        alt="juiceCoin"
                        className="w-8"
                      />
                    </div>
                  </div>
                  <p className="mt-5">{notes}</p>
                </div>
              </div>
              {!isSender && (
                <div className="px-5">
                  <hr className="h-0.5 bg-black opacity-50" />
                  {isTakeOrder && (
                    <Button 
                      onClick={() => navigate("/confirmation-payment", 
                      { state: 
                        { 
                          productId: productId, 
                          price: bargainPrice,  
                          productName: productName,
                          justiperId: justiper.userId,
                          image: image,
                          justiperName: `${justiper?.firstName} ${justiper?.lastName}`,
                        } 
                      })} 
                      className='bg-10b981 h-full text-white font-medium text-xl w-full'>
                      Make Payment
                    </Button>
                  )}
                  {!isTakeOrder && productPrice && (
                    <div className="flex gap-2 py-2">
                      <Button onClick={handleRejectBargain} className="bg-10b981 h-full text-white font-medium text-xl w-1/2">
                        No
                      </Button>
                      <Button
                        className="bg-10b981 text-white font-medium text-xl w-1/2"
                        onClick={() => setShowChangePrice(true)}
                      >
                        Yes
                      </Button>
                    </div>
                  )}
                  {!isTakeOrder && productPrice === null && (
                    <Button onClick={() => setOrderModal(!orderModal)} className='bg-10b981 h-full text-white font-medium text-xl w-full'>
                      Take Order
                    </Button>
                  )}
                </div>
              )}
            </div>
            {isTakeOrder ? (
              <div className="text-lg pr-14">{message}</div>
            ) : (

              <div className="text-lg pr-14">{message}</div>
            )}
            <div className="text-xs flex justify-end opacity-60">
              {formatTime()}
            </div>
          </span >
        </div >
      )}
      {
        showChangePrice && (
          <ChangePriceModal
            isVisible={showChangePrice}
            setIsVisible={setShowChangePrice}
            bargainPrice={bargainPrice}
            customerId={user.userId}
            justiperId={interlocutors}
            image={image || ''}
            product={product}
          />
        )
      }
      {
        orderModal && (
          <TakeOrderModal
            isVisible={orderModal}
            setIsVisible={setOrderModal}
            product={product}
            bargainPrice={bargainPrice || 0}
            customerId={user.userId}
            justiperId={interlocutors}
            justiperName={`${user?.firstName} ${user?.lastName}`}
            userProfile={user.profileImage}
          />
        )
      }
    </>
  );
};

export default ChatBubble;