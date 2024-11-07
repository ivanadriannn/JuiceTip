import React, { useState, useRef, useEffect } from "react";
import ModalIndex from "../ModalIndex/ModalIndex";
import { IBargainModal } from "./IBargainModal";
import Button from "../../Button/Button";

const BargainModal = (props: IBargainModal) => {
  const { isVisible, setIsVisible, product, handleNavigate } = props;
  const [amount, setAmount] = useState<number>(product.productPrice);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const width = `${(amount.toString().length + 1) * 15}px`;
      inputRef.current.style.width = width;
    }
  }, [amount]);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseFloat(value)) && value !== '-')) {
      setAmount(parseFloat(value) || 0);
    }
  }

  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation}>
        <div className="bg-fafafa rounded-xl flex items-center justify-center py-14 px-20 w-full gap-10">
          <img
            src={product.productImageList[0]}
            alt="productImage"
            className="product-card-logo w-56 h-56"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl text-10b981 font-bold w-full text-left">
              {product.productName}
            </h1>
            <p className="text-xl font-bold text-5d5d5d">
              Input the price you want
            </p>
            <div className="flex gap-3 items-center">
              <div className="flex items-center border-2 rounded-md border-[#10b981] w-fit gap-5">
                <button
                  className="text-10b981 text-2xl font-extrabold p-2 w-12 border-r-4"
                  onClick={() => setAmount(amount > 0 ? amount - 1 : 0)}
                  disabled={amount === 0}
                >
                  -
                </button>
                <input
                  ref={inputRef}
                  className="text-5d5d5d font-bold text-2xl focus:outline-none text-center  "
                  type="number"
                  value={amount.toString()}
                  onChange={handleChange}
                />
                <button
                  className="text-10b981 text-2xl font-extrabold p-2 w-12 border-l-4"
                  onClick={() => setAmount(amount + 1)}
                >
                  +
                </button>
              </div>
              <img
                src={require("../../../assets/images/juiceCoin.png")}
                alt="juiceCoin"
                className="max-lg:w-[35px] max-lg:h-[35px] max-sm:w-[25px] max-sm:h-[25px]"
              />
            </div>
            <Button
              className="bg-10b981 text-white font-normal text-xl"
              onClick={() => handleNavigate(amount)}
            >
              Bargain
            </Button>
          </div>
        </div>
      </div>
    </ModalIndex>
  );
};

export default BargainModal;
