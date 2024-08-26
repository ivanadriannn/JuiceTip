import React from "react";
import { IComplaintImage } from "./IComplaintImage";

const ComplaintImage = (props: IComplaintImage) => {
  return (
    <div className="relative cursor-pointer w-full h-full border-[#5d5d5d] border-2 rounded-lg flex items-center justify-center p-5">
      <div className="flex items-center gap-3">
        <img
          src={require("../../assets/images/upload.png")}
          alt=""
          className="w-12 h-12"
        />
        <p className="text-10b981 font-bold text-xl">Upload Image</p>
      </div>
      <input
        type="file"
        className="absolute z-10 inset-0 opacity-0 w-full h-full cursor-pointer"
      />
    </div>
  );
};

export default ComplaintImage;
