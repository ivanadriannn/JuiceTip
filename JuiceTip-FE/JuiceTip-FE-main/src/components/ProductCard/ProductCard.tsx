import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { IProduct } from "../../Services/productService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Services/firebase";
import { IMessage } from "../../interfaces/Chat.interfaces";
import { v4 as uuid } from "uuid";
import BargainModal from "../Modal/BargainModal/BargainModal";
import TakeOrderModal from "../Modal/TakeOrderModal/TakeOrderModal";
import { format_d_mm_yy, format_last_updated } from "../../utils/FormatDate";
import DeleteModal from "../Modal/DeleteModal/DeleteModal";
import { getUserById } from "../../Services/userService";
import TakeOrderModalBeforeLogin from "../Modal/TakeOrderModalBeforeLogin/TakeOrderModalBeforeLogin";
import { ICustomer } from "../../interfaces/Customer.interfaces";
const ProductCard = (props: IProduct) => {
  const {
    productId,
    productName,
    productPrice,
    productDescription,
    productImage,
    productImageList,
    categoryId,
    categoryName,
    regionId,
    regionName,
    customerId,
    customerName,
    notes,
    createdAt,
    lastUpdatedAt,
  } = props;
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [bargainModal, setBargainModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [ohSnap, setOhSnap] = useState(false);
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer)
  const nav = useNavigate();
  const isUserProduct = user.userId === customerId;

  useEffect(() => {
    if (customerId) {
      getUserById(customerId, (status: boolean, res: any) => {
        if (status) {
          setCustomer(res);
        }
      })
    }
  }, [getUserById, customerId]);

  const handleBargainClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setOhSnap(true);
    } else {
      setBargainModal(true);
    }
  };

  const handleOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setOhSnap(true);
    } else {
      setOrderModal(true);
    }
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    nav(`/edit-product/${productId}`);
    nav(0);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDeleteModal(true);
  };

  const handleNavigate = async (amount: number) => {
    const combinedId =
      customerId > user.userId
        ? customerId + user.userId
        : user.userId + customerId;
    const chatDoc = doc(db, "chats", combinedId);
    const chatSnap = await getDoc(chatDoc);

    const message: IMessage = {
      id: uuid(),
      message: `Hello, i want to bargain the price of ${productName}`,
      date: Timestamp.now(),
      senderId: user.userId,
      isBargain: true,
      productId: productId,
      productName: productName,
      image: productImageList[0],
      productPrice: productPrice,
      bargainPrice: amount,
      isTakeOrder: false,
      notes: notes || null,
    };

    if (!chatSnap.exists()) {
      await setDoc(chatDoc, { messages: [message] });
    } else {
      await updateDoc(doc(db, "chats", combinedId), {
        messages: arrayUnion(message),
      });
    }

    nav(`/chat/${customerId}`);
  };

  const handleDetailNavigate = () => {
    nav(`/detail-product/${productId}`);
  };

  return (
    <div
      onClick={handleDetailNavigate}
      className="flex my-7 bg-fafafa p-8 rounded-lg shadow-xl w-2/3 gap-6 cursor-pointer"
    >
      <div className="w-60 h-60 relative">
        <div className="w-60 h-60 relative">
          <img
            src={productImageList[0] && productImageList[0]}
            alt="productCardLogo"
            className="absolute product-card-logo inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between relative">
          <h1 className="text-10b981 font-bold text-4xl">{productName}</h1>
          <p className="text-b5b8b9 font-bold text-md absolute right-0 bottom-0">
            Uploded at <span>{format_d_mm_yy(createdAt)}</span>
          </p>
        </div>
        <hr className="h-0.5 mt-3 bg-gray-200 border-0 bg-bcbec0 rounded-sm" />
        <div className="flex flex-col">
          <div className="flex items-center justify-between my-2">
            <h1 className="text-8c8c8c font-bold text-2xl">{regionName}</h1>
            <div className="flex py-2 px-4 items-center bg-e5e5e5 gap-3 rounded-md">
              <img
                src={require("../../assets/images/juiceCoin.png")}
                alt="juiceCoin"
                className="w-8"
              />
              <p className="text-8c8c8c font-bold text-xl">{productPrice}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt mb-2">
            <img
              src={customer.profileImage}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover object-top"
            />
            <div className="flex flex-col">
              <h1 className="text-8c8c8c font-bold text-xl">{customerName}</h1>
              <p className="text-8c8c8c font-bold text-md">
                Last Updated <span>{format_last_updated(lastUpdatedAt)}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            {!isUserProduct ? (
              <>
                <Button
                  className="bg-10b981 text-white font-medium text-xl w-1/2"
                  onClick={handleOrderClick}
                >
                  Take Order
                </Button>
                <Button
                  onClick={handleBargainClick}
                  className="bg-10b981 text-white font-medium text-xl w-1/2"
                >
                  Bargain
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="bg-[#B91010] text-white font-medium text-xl w-1/2"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
                <Button
                  onClick={handleEditClick}
                  className="bg-10b981 text-white font-medium text-xl w-1/2"
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {bargainModal && (
        <BargainModal
          isVisible={bargainModal}
          setIsVisible={setBargainModal}
          product={props}
          handleNavigate={handleNavigate}
        />
      )}
      {orderModal && (
        <TakeOrderModal
          isVisible={orderModal}
          setIsVisible={setOrderModal}
          product={props}
          customerId={customerId}
          justiperId={user.userId}
          justiperName={`${user.firstName} ${user.lastName}`}
          userProfile={user.profileImage}
        />
      )}
      {deleteModal && (
        <DeleteModal
          isVisible={deleteModal}
          setIsVisible={setDeleteModal}
          product={props}
        />
      )}
      {ohSnap && (
        <TakeOrderModalBeforeLogin
          isVisible={ohSnap}
          setIsVisible={setOhSnap}
        />
      )}
    </div>
  );
};

export default ProductCard;
