import React, { useState } from 'react'
import { IStarRating } from './IStarRating'

const StarRating = (props: IStarRating) => {
    const { onRatingChange } = props;
    const [rating, setRating] = useState<number>(0);
  
    const handleClick = (ratingValue: number) => {
      setRating(ratingValue);
      if (onRatingChange) {
        onRatingChange(ratingValue);
      }
    };
    return (
      <div className="flex gap-2">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
          <svg
            key={star}
            className={`w-10 h-10 cursor-pointer ${
              (rating) >= star ? 'text-[#10b981]' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleClick(star)}
          >
            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845 1.416 8.283L12 18.897l-7.416 4.654L6 15.268 0 9.423l8.332-1.268L12 .587z" />
          </svg>
        ))}
      </div>
    );
  };
  
  export default StarRating;