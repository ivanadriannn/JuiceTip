import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import TopUpButton from "../../components/TopUpButton/TopUpButton";
import Button from "../../components/Button/Button";
import PaymentConfirmationCoinModal from "../../components/Modal/PaymentConfirmationCoinModal/PaymentConfirmationCoinModal";
import QRModal from "../../components/Modal/QRModal/QRModal";
import PaymentMethodCard from "../../components/PaymentMethodCard/PaymentMethodCard";
import NotInputModal from "../../components/Modal/NotInputModal/NotInputModal";

const TopUpPage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [totalBill, setTotalBill] = useState(1000);
  const [isVisible, setIsVisible] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showNotInput, setShowNotInput] = useState(false);
  const [userJuiceCoin, setUserJuiceCoin] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleBack = () => {
    window.history.back();
  };
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    setUserJuiceCoin(user.juiceCoin);
  }, [user]);

  useEffect(() => {
    setTotalTransaction(amount * 15000);
  }, [amount]);

  useEffect(() => {
    setTotalBill(totalTransaction + 1000);
  }, [totalTransaction]);

  const handleAdd = (add: number) => {
    setAmount(amount + add);
  };

  const handleQR = () => {
    setShowQRModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(parseFloat(value)) && value !== "-")) {
      setAmount(parseFloat(value) || 0);
    }
  };

  const handlePay = () => {
    if (amount === 0) {
      setShowNotInput(true);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const width = `${(amount.toString().length + 1) * 25}px`;
      inputRef.current.style.width = width;
    }
  }, [amount]);

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="py-8 px-12">
        <p
          onClick={handleBack}
          className="text-5d5d5d font-bold text-lg underline cursor-pointer"
        >
          Back to Previous Page
        </p>
        <div className="flex gap-8 mt-8 max-2xl:flex-col max-2xl:items-center">
          <div className="w-7/12 flex flex-col gap-12 max-2xl:w-full">
            <div className="bg-balance bg-fafafa p-9 rounded-2xl flex flex-col gap-6">
              <p className="text-ababab font-bold text-lg">Your Balance: </p>
              <div className="flex items-center gap-2">
                <p className="text-5d5d5d font-bold text-5xl">
                  {userJuiceCoin}
                </p>
                <img
                  src={require("../../assets/images/juiceCoin.png")}
                  alt="juiceCoin"
                  className="max-lg:w-12 max-md:w-10"
                />
              </div>
            </div>
            <div className="bg-fafafa p-9 rounded-2xl flex flex-col gap-6">
              <p className="text-5d5d5d font-bold text-4xl">Top Up</p>
              <div className="border-2 border-gray-600 p-6 rounded-2xl flex flex-col gap-10">
                <p className="text-232323 font-bold text-2xl">Amount</p>
                <div className="flex items-center justify-center gap-36">
                  <button
                    className="text-10b981 text-3xl font-extrabold bg-e5e5e5 p-4 rounded-3xl w-16"
                    onClick={() => setAmount(amount - 1)}
                    disabled={amount === 0}
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2">
                    <input
                      className="text-5d5d5d font-bold text-5xl focus:outline-none bg-transparent"
                      value={amount.toString()}
                      onChange={handleChange}
                      type="number"
                      ref={inputRef}
                    />
                    <img
                      src={require("../../assets/images/juiceCoin.png")}
                      alt="juiceCoin"
                      className="max-lg:w-12 max-md:w-10"
                    />
                  </div>
                  <button
                    className="text-10b981 text-3xl font-extrabold bg-e5e5e5 p-4 rounded-3xl w-16"
                    onClick={() => setAmount(amount + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center justify-center gap-10 pb-10">
                  <TopUpButton onClick={() => handleAdd(5)}>5</TopUpButton>
                  <TopUpButton onClick={() => handleAdd(10)}>10</TopUpButton>
                  <TopUpButton onClick={() => handleAdd(25)}>25</TopUpButton>
                  <TopUpButton onClick={() => handleAdd(50)}>50</TopUpButton>
                  <TopUpButton onClick={() => handleAdd(100)}>100</TopUpButton>
                  <TopUpButton onClick={() => handleAdd(200)}>200</TopUpButton>
                </div>
              </div>
              <div className="border-2 border-gray-600 p-6 rounded-2xl flex flex-col gap-5">
                <p className="text-232323 font-bold text-2xl mb-5">
                  Payment Method
                </p>
                <PaymentMethodCard
                  name="QRIS"
                  image={require("../../assets/images/qris.png")}
                  price="1000"
                />
                <PaymentMethodCard
                  name="GoPay"
                  image={require("../../assets/images/gopay.png")}
                  price="2000"
                />
                <PaymentMethodCard
                  name="ShoopePay"
                  image={require("../../assets/images/shoppePay.png")}
                  price="3000"
                />
              </div>
            </div>
          </div>
          <div className="w-5/12 flex flex-col gap-8 max-2xl:w-full">
            <div className="bg-fafafa p-9 rounded-2xl flex flex-col">
              <p className="text-5d5d5d font-bold text-4xl mb-8">Details</p>
              <div className="text-5d5d5d font-semibold text-xl flex justify-between items-center mb-4">
                <p>Total Transactions</p>
                <p>Rp {totalTransaction.toLocaleString()}</p>
              </div>
              <div className="text-5d5d5d font-semibold text-xl flex justify-between items-center mb-4">
                <p>Tax</p>
                <p>Rp 1,000</p>
              </div>
              <hr className="border-2 border-gray-600" />
              <div className="text-5d5d5d font-semibold text-3xl flex my-7 justify-between items-center mb-4">
                <p>Total Bill</p>
                <p>Rp {totalBill.toLocaleString()}</p>
              </div>
              <Button
                className="bg-10b981 text-white font-semibold text-2xl py-4"
                onClick={handlePay}
              >
                Pay
              </Button>
            </div>
            <div className="bg-fafafa p-9 rounded-2xl flex flex-col">
              <p className="text-5d5d5d font-bold text-4xl mb-8">
                Transaction History
              </p>
            </div>
          </div>
        </div>
        <div className="circle"></div>
      </div>
      {showNotInput && (
        <NotInputModal
          isVisible={showNotInput}
          setIsVisible={setShowNotInput}
        />
      )}
      {isVisible && (
        <PaymentConfirmationCoinModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          handleqr={handleQR}
          amount={amount}
        />
      )}
      {showQRModal && (
        <QRModal
          isVisible={showQRModal}
          setIsVisible={setShowQRModal}
          setAmount={setAmount}
          amount={amount}
          userId={user.userId}
        />
      )}
    </div>
  );
};

export default TopUpPage;
