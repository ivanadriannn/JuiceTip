import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BackButton from "../../components/BackButton/BackButton";
import ChatButton from "../../components/ChatButton/ChatButton";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, IProduct } from "../../Services/productService";
import { format_d_mm_yy, format_last_updated } from "../../utils/FormatDate";
import Button from "../../components/Button/Button";
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
import BargainModal from "../../components/Modal/BargainModal/BargainModal";
import DetailFooterSection from "../../components/DetailFooterSection/DetailFooterSection";
import Slider from "react-slick";
import TakeOrderModal from "../../components/Modal/TakeOrderModal/TakeOrderModal";
import DeleteModal from "../../components/Modal/DeleteModal/DeleteModal";
import TakeOrderModalBeforeLogin from "../../components/Modal/TakeOrderModalBeforeLogin/TakeOrderModalBeforeLogin";
import { ICustomer } from "../../interfaces/Customer.interfaces";
import { getUserById } from "../../Services/userService";

const DetailProductPage = () => {
  const { productId } = useParams();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [product, setProduct] = useState<IProduct>();
  const [bargainModal, setBargainModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [relative, setRelative] = useState(false);
  const [ohSnap, setOhSnap] = useState(false);
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer)
  const nav = useNavigate();
  const isUserProduct = user.userId === product?.customerId;

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
    if (product?.customerId) {
      getUserById(product?.customerId, (status: boolean, res: any) => {
        if (status) {
          setCustomer(res);
        }
      })
    }
  }, [getUserById, product?.customerId]);

  const handleBargainClick = () => {
    if (!isLoggedIn) {
      setOhSnap(true);
    } else {
      setBargainModal(true);
    }
  };

  const handleOrderClick = () => {
    if (!isLoggedIn) {
      setOhSnap(true);
    } else {
      setOrderModal(true);
    }
  };

  const handleEditClick = () => {
    nav(`/edit-product/${productId}`);
    nav(0);
  };

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleRelative = () => {
    setRelative(!relative);
  };

  const handleNavigate = async (amount: number) => {
    if (product) {
      const combinedId =
        product.customerId > user.userId
          ? product.customerId + user.userId
          : user.userId + product.customerId;
      const chatDoc = doc(db, "chats", combinedId);
      const chatSnap = await getDoc(chatDoc);

      const message: IMessage = {
        id: uuid(),
        message: `Hello, i want to bargain the price of ${product.productName}`,
        date: Timestamp.now(),
        senderId: user.userId,
        isBargain: true,
        productId: product.productId,
        productName: product.productName,
        image: product.productImageList[0],
        productPrice: product.productPrice,
        bargainPrice: amount,
        isTakeOrder: false,
        notes: product.notes || null,
      };

      if (!chatSnap.exists()) {
        await setDoc(chatDoc, { messages: [message] });
      } else {
        await updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion(message),
        });
      }

      nav(`/chat/${product.customerId}`);
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative z-0">
      {product && (
        <div>
          <Navbar handleRelative={handleRelative} />
          <BackButton />
          <div
            className={`bg-e5e5e5 flex items-center mt-5 flex-col gap-20 min-h-screen py-14 ${
              relative ? "relative -z-10" : ""
            } `}
          >
            <h1 className="text-center text-10b981 font-bold text-5xl">
              PRODUCT DETAIL
            </h1>
            <div className="my-7 bg-fafafa p-8 rounded-lg shadow-xl w-2/3 cursor-pointer">
              <div className="flex gap-6">
                <div className="w-60 h-60 relative">
                  {product.productImageList.length > 1 ? (
                    <Slider {...settings}>
                      {product.productImageList.map((imageUrl, index) => (
                        <div className="w-60 h-60 relative" key={index}>
                          <img
                            src={imageUrl}
                            alt="productCardLogo"
                            className="absolute product-card-logo inset-0 w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div className="w-60 h-60 relative">
                      <img
                        src={product.productImageList[0]}
                        alt="productCardLogo"
                        className="absolute product-card-logo inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between relative">
                    <h1 className="text-10b981 font-bold text-4xl">
                      {product.productName}
                    </h1>
                    <p className="text-b5b8b9 font-bold text-md absolute right-0 bottom-0">
                      Uploded at{" "}
                      <span>{format_d_mm_yy(product.createdAt)}</span>
                    </p>
                  </div>
                  <hr className="h-0.5 mt-3 bg-gray-200 border-0 bg-bcbec0 rounded-sm" />
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between my-2">
                      <h1 className="text-8c8c8c font-bold text-2xl">
                        {product.regionName}
                      </h1>
                      <div className="flex py-2 px-4 items-center bg-e5e5e5 gap-3 rounded-md">
                        <img
                          src={require("../../assets/images/juiceCoin.png")}
                          alt="juiceCoin"
                          className="w-8"
                        />
                        <p className="text-8c8c8c font-bold text-xl">
                          {product.productPrice}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt mb-2">
                      <img
                        src={customer.profileImage}
                        alt="profile"
                        className="w-12 h-12 rounded-full object-cover object-top"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-8c8c8c font-bold text-xl">
                          {product.customerName}
                        </h1>
                        <p className="text-8c8c8c font-bold text-md">
                          Last Updated{" "}
                          <span>
                            {format_last_updated(product.lastUpdatedAt)}
                          </span>
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
                            className="bg-10b981 text-white font-medium text-xl w-1/2"
                            onClick={handleEditClick}
                          >
                            Edit
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <DetailFooterSection
                  title="Product Description"
                  body={product.productDescription}
                />
                <DetailFooterSection
                  title="Category"
                  body={product.categoryName}
                />
                <DetailFooterSection title="Note" body={product.notes || ""} />
              </div>
              {bargainModal && (
                <BargainModal
                  isVisible={bargainModal}
                  setIsVisible={setBargainModal}
                  product={product}
                  handleNavigate={handleNavigate}
                />
              )}
              {orderModal && (
                <TakeOrderModal
                  isVisible={orderModal}
                  setIsVisible={setOrderModal}
                  product={product}
                  customerId={product.customerId}
                  justiperId={user.userId}
                  justiperName={`${user.firstName} ${user.lastName}`}
                  userProfile={user.profileImage}
                />
              )}
              {deleteModal && (
                <DeleteModal
                  isVisible={deleteModal}
                  setIsVisible={setDeleteModal}
                  product={product}
                />
              )}
              {ohSnap && (
                <TakeOrderModalBeforeLogin
                  isVisible={ohSnap}
                  setIsVisible={setOhSnap}
                />
              )}
            </div>
          </div>
          <ChatButton setIsVisible={setIsVisible} />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default DetailProductPage;
