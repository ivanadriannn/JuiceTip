import React from "react";
import { IPaymentMethodCard } from "./IPaymentMethodCard";

const PaymentMethodCard = (props: IPaymentMethodCard) => {
  const { name, image, price } = props;
  return (
    <div className="bg-e5e5e5 rounded-lg flex justify-between items-center p-5">
      <div className="flex items-center gap-10">
        <img src={`${image}`} alt="paymentMethod" />
        <p className="text-2xl font-bold">{name}</p>
      </div>
      <p className="text-5d5d5d font-bold text-2xl">
        Rp {price}
      </p>
    </div>
  );
};

export default PaymentMethodCard;
