import React from "react";

const ChatCardSkeleton = () => {
  return (
    <div className="w-full mb-5 overflow-auto">
      {Array(6)
        .fill(undefined)
        .map((_, index) => (
          <div
            className="h-32 w-full border-b-4 border-b-[#e5e5e5] flex justify-between px-8"
            key={index}
          >
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 max-md:w-16 max-md:h-16 skeleton rounded-full">
                <img src="" alt="" className="max-w-full max-h-full" />
              </div>
              <div className="flex flex-col gap-2 skeleton h-5 rounded">
                <div className="h-5 w-28 skeleton rounded"></div>
              </div>
            </div>
            <div className="mt-5 w-20 h-5 skeleton rounded"></div>
          </div>
        ))}
    </div>
  );
};

export default ChatCardSkeleton;
