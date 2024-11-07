import React from "react";
import { IRatingCard } from "./IRatingCard";
import { format_last_updated } from "../../utils/FormatDate";

const RatingCard = (props: IRatingCard) => {
  const { rating } = props;
  return (
    <div className="border-[#10b981] border-2 rounded-xl p-5 mb-8 flex flex-col gap-2 w-[455px]">
      <div className="flex items-center justify-between">
        <p className="text-5d5d5d font-semibold text-xl">{rating.customerName}</p>
        <p className="text-[#9e9e9e] font-semibold text-xl">{format_last_updated(rating.reviewDate).replace("th", "")}</p>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 cursor-pointer ${
              rating.rating >= star ? "text-[#10b981]" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845 1.416 8.283L12 18.897l-7.416 4.654L6 15.268 0 9.423l8.332-1.268L12 .587z" />
          </svg>
        ))}
      </div>
      <p className="text-5d5d5d font-semibold text-lg">
        {rating.comment}
      </p>
    </div>
  );
};

export default RatingCard;
