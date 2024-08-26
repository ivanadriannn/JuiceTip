import React, { useEffect, useState } from "react";
import { IPaymentPage } from "./IPaymentPage";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BackButton from "../../components/BackButton/BackButton";
import Button from "../../components/Button/Button";
import PaymentConfirmationProductModal from "../../components/Modal/PaymentConfirmationProductModal/PaymentConfirmationProductModal";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getProductById, IProduct } from "../../Services/productService";
import { ITransactionDetail } from "../../interfaces/TransactionDetail.interfaces";
import { v4 as uuid } from "uuid";
import InsufficientCoinModal from "../../components/Modal/InsufficientCoinModal/InsufficientCoinModal";

const PaymentPage = (props: IPaymentPage) => {
  const {} = props;
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { productId, justiperName, price, productName, image, justiperId } = location.state;
  const [product, setProduct] = useState<IProduct>();
  const [insufficientCoin, setInsufficientCoin] = useState(false);
  const [delivery, setDelivery] = useState(5);
  const [appFee, setAppFee] = useState(1);
  const [relative, setRelative] = useState(false);

  useEffect(() => {
    if (productId) {
      getProductById(productId, (status: boolean, res: any) => {
        if (status) {
          setProduct(res);
        }
      });
    }
  }, [getProductById, productId]);

  // const sumProduct = () => {
  //   return qty * price;
  // }

  const subTotal = () => {
    return price + delivery + appFee;
  }

  const newTransactionDetail: ITransactionDetail = {
    transactionId: uuid(),
    productId: productId,
    applicationFee: appFee,
    justiperId: justiperId,
    // qty: qty,
    subtotalPayment: subTotal(),
    subtotalProduct: price,
    transactionStatus: "On Progress"
  }

  const handleClick = () => {
    setIsVisible(true);
  };

  const handleInsufficientCoin = () => {
    setInsufficientCoin(true);
  }

  const handleRelative = () => {
    setRelative(!relative);
  }

  return (
    <div>
      <Navbar handleRelative={handleRelative}/>
      <BackButton />
      <div className={`bg-e5e5e5 flex items-center mt-5 flex-col gap-20 min-h-screen py-14 ${relative ? "relative -z-10" : ""}`}>
        <h1 className="text-center text-10b981 font-bold text-5xl">PAYMENT</h1>
        <div className="my-7 bg-fafafa py-4 rounded-lg shadow-xl w-2/3 cursor-pointer flex flex-col items-center justify-center">
          <div className="flex w-full gap-3 items-center p-8">
            <img
              src={require("../../assets/images/location.png")}
              alt="location"
            />
            <div className="text-5d5d5d text-xl">
              <h1 className="font-bold">Delivery Address</h1>
              <p>
                {`${user?.firstName} ${user?.lastName}`} | {user.telephone}
              </p>
              <p>{user.address}</p>
            </div>
          </div>
          <img
            src={require("../../assets/images/bar.png")}
            alt="bar"
            className="w-full"
          />
          <div className="flex flex-col w-full p-10">
            <div className="rounded-md w-full p-5 relative">
              <div className="flex items-center gap-5">
                <img
                  src={image}
                  alt="productImage"
                  className="product-card-logo w-56 h-56"
                />
                <div className="flex flex-col">
                  <h1 className="text-10b981 font-bold text-4xl">
                    {productName}
                  </h1>
                  <h2 className="text-8c8c8c font-bold text-xl">
                    {product?.regionName}
                  </h2>
                  <div className="flex py-2 px-4 items-center bg-e5e5e5 gap-3 rounded-md w-fit">
                    <img
                      src={require("../../assets/images/juiceCoin.png")}
                      alt="juiceCoin"
                      className="w-8"
                    />
                    <p className="text-8c8c8c font-bold text-xl">{price}</p>
                  </div>
                  <h2 className="text-8c8c8c font-bold text-xl">Category</h2>
                  <p className="text-8c8c8c text-xl">{product?.categoryName}</p>
                  <h2 className="text-8c8c8c font-bold text-xl">Notes</h2>
                  <p className="text-8c8c8c text-xl">{product?.notes}</p>
                </div>
                {/* <p className="absolute text-8c8c8c text-xl right-3 bottom-5">
                  {qty}x
                </p> */}
              </div>
            </div>
            {/* <div className="pt-6 flex justify-between items-center w-full">
              <p className="text-5d5d5d font-bold text-xl">
                Payment Details
              </p>
              <div className="flex py-2 px-4 items-center bg-e5e5e5 gap-3 rounded-md w-fit">
                <img
                  src={require("../../assets/images/juiceCoin.png")}
                  alt="juiceCoin"
                  className="w-8"
                />
                <p className="text-8c8c8c font-bold text-2xl">{price}</p>
              </div>
            </div> */}
            <div className="text-5d5d5d rounded-md mt-6 p-2 relative w-full">
              <div className="flex items-center gap-3">
                <img
                  src={require("../../assets/images/paymentDetail.png")}
                  alt="paymentDetail"
                />
                <h1 className="font-bold text-2xl">Payment Details</h1>
              </div>
              <div className="flex items-center justify-between w-full border-b-2 border-[#5d5d5d] p-2 text-lg">
                <p className="text-xl font-semibold">Subtotal for Product</p>
                <div className="flex py-2 px-4 items-center gap-3 rounded-md w-fit">
                  <img
                    src={require("../../assets/images/juiceCoin.png")}
                    alt="juiceCoin"
                    className="w-8"
                  />
                  <p className="text-8c8c8c font-bold text-2xl">{price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full border-b-2 border-[#5d5d5d] p-2 text-lg">
                <p className="text-xl font-semibold">Subtotal for Delivery</p>
                <div className="flex py-2 px-4 items-center gap-3 rounded-md w-fit">
                  <img
                    src={require("../../assets/images/juiceCoin.png")}
                    alt="juiceCoin"
                    className="w-8"
                  />
                  <p className="text-8c8c8c font-bold text-2xl">{delivery}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full border-b-2 border-[#5d5d5d] p-2 text-lg">
                <p className="text-xl font-semibold">Application Fee</p>
                <div className="flex py-2 px-4 items-center gap-3 rounded-md w-fit">
                  <img
                    src={require("../../assets/images/juiceCoin.png")}
                    alt="juiceCoin"
                    className="w-8"
                  />
                  <p className="text-8c8c8c font-bold text-2xl">{appFee}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full px-2 pt-2 text-lg">
                <p className="text-xl font-extrabold">Subtotal for Payment</p>
                <div className="flex py-2 px-4 items-center gap-3 rounded-md w-fit">
                  <img
                    src={require("../../assets/images/juiceCoin.png")}
                    alt="juiceCoin"
                    className="w-8"
                  />
                  <p className="text-8c8c8c font-bold text-2xl">{subTotal()}</p>
                </div>
              </div>
            </div>
            <Button
              className="bg-10b981 text-2xl font-medium w-fit mt-7 rounded-lg text-white self-center"
              onClick={handleClick}
            >
              Make Payment
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      {isVisible && (
        <PaymentConfirmationProductModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          price={subTotal()}
          handleUnsufficientCoin={handleInsufficientCoin}
          transactionDetail={newTransactionDetail}
        />
      )}
      {insufficientCoin && (
        <InsufficientCoinModal
          isVisible={insufficientCoin}
          setIsVisible={setInsufficientCoin}
        />
      )}
    </div>
  );
};

export default PaymentPage;
