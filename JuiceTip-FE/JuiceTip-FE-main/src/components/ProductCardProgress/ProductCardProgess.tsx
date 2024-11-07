import React, { useState } from "react";
import { IProgressProduct } from "../../Services/productService";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { format_d_mm_yy } from "../../utils/FormatDate";
import CompleteTransactionModalAfter from "../Modal/CompleteTransactionModal/CompleteTransactionAfter/CompleteTransactionModalAfter";
import CompleteTransactionModalBefore from "../Modal/CompleteTransactionModal/CompleteTransactionBefore/CompleteTransactionModalBefore";
import RatingModal from "../Modal/RatingModal/RatingModal";

const ProductCardProgess = (props: IProgressProduct) => {
  const {
    productId,
    productName,
    productPrice,
    productDescription,
    productImageList,
    productImage,
    categoryId,
    categoryName,
    regionId,
    regionName,
    notes,
    createdAt,
    lastUpdatedAt,
    justiperName,
    status,
    justiperId,
  } = props;
  const nav = useNavigate();
  const [showFinishBefore, setShowFinishBefore] = useState(false);
  const [showFinishAfter, setShowFinishAfter] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const handleDetailNavigate = () => {
    nav(`/detail-product/${productId}`);
  };

  const handleComplaint = (e: React.MouseEvent<HTMLButtonElement>) => {
    // blm dikasi id productnya
    e.stopPropagation();
    nav("/complaint");
  };

  const handleFinish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowFinishBefore(true);
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
          <div className="flex gap-1 mt mb-2 flex-col">
            <p className="text-8c8c8c font-bold text-2xl">
              Jastiper&nbsp;:{" "}
              <span className="text-5d5d5d font-bold text-2xl">
                {justiperName}
              </span>
            </p>
            <p className="text-8c8c8c font-bold text-2xl">
              Status&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
              <span className="text-[#ffbb33] font-bold text-2xl">
                {status}
              </span>
            </p>
          </div>
          <div className="flex gap-5">
            <Button
              className="bg-[#B91010] text-white font-medium text-xl w-1/2"
              onClick={handleComplaint}
            >
              Complaint
            </Button>
            <Button
              onClick={handleFinish}
              className="bg-10b981 text-white font-medium text-xl w-1/2"
            >
              Finish
            </Button>
          </div>
        </div>
      </div>
      {showFinishBefore && (
        <CompleteTransactionModalBefore
          isVisible={showFinishBefore}
          setIsVisible={setShowFinishBefore}
          setShowFinishAfter={setShowFinishAfter}
        />
      )}
      {showFinishAfter && (
        <CompleteTransactionModalAfter
          isVisible={showFinishAfter}
          setIsVisible={setShowFinishAfter}
          product={props}
          setShowRating={setShowRating}
        />
      )}
      {showRating && (
        <RatingModal isVisible={showFinishAfter} setIsVisible={setShowRating} product={props}/>
      )}
    </div>
  );
};

export default ProductCardProgess;
