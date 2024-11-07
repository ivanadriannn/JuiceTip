import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BackButton from "../../components/BackButton/BackButton";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { IProduct } from "../../Services/productService";
import { getUserById } from "../../Services/userService";
import { ICustomer } from "../../interfaces/Customer.interfaces";

const ConfirmationPaymentPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer)
  const { product, justiperId, justiperName, price, productName, image } = location.state

  useEffect(() => {
    if (justiperId) {
      getUserById(justiperId, (status: boolean, res: any) => {
        if (status) {
          setCustomer(res);
        }
      })
    }
  }, [getUserById, justiperId]);

  const handleClick = () => {
    nav("/payment", {state: location.state});
  }
  
  return (
    <div>
      <Navbar />
      <BackButton />
      <div className="bg-e5e5e5 flex items-center mt-5 flex-col gap-20 min-h-screen py-14">
        <h1 className="text-center text-10b981 font-bold text-5xl">
          CONFIRMATION PAYMENT
        </h1>
        <div className="my-7 bg-fafafa py-4 rounded-lg shadow-xl w-2/3 pb-20 cursor-pointer flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 w-2/5 mt-32">
            <img
              src={image}
              alt="productImage"
              className="product-card-logo w-56 h-56 shadow"
            />
            <h2 className="text-10b981 font-bold text-3xl">
              {productName}
            </h2>
            <p className="flex items-center font-extrabold text-3xl text-5d5d5d">
              {price}
              <img
                src={require("../../assets/images/juiceCoin.png")}
                alt="juiceCoin"
                className="w-7"
              />
            </p>
          </div>
          <div className="w-3/5 flex flex-col justify-center gap-12 px-10 pb-10">
            <h1 className="font-bold text-5d5d5d text-4xl text-center">
              Payment
            </h1>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <img
                  src={customer.profileImage}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover object-top"
                />
                <p className="text-5d5d5d text-xl font-semibold">{justiperName}</p>
              </div>
              <p className="text-5d5d5d text-xl font-bold">
                {justiperName} has accept your product offer. Please finished your
                payment to complete the transaction
              </p>
            </div>
            <Button className="flex items-center justify-center bg-10b981 text-white text-xl font-medium" onClick={handleClick}>
              Pay for {price}&nbsp;
              <img
                src={require("../../assets/images/juiceCoin.png")}
                alt="juiceCoin"
                className="w-5"
              />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmationPaymentPage;
