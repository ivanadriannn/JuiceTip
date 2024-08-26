import React from "react";

const ChatBubbleSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
        <div className="h-[4.5rem] w-1/3 ml-5 mb-5 bg-[#fafafa] skeletonChat rounded"></div>
        <div className="h-[4.5rem] w-1/3 mr-5 mb-5 bg-[#fafafa] skeletonChat rounded self-end"></div>
        <div className="h-[4.5rem] w-1/3 ml-5 mb-5 bg-[#fafafa] skeletonChat rounded"></div>
        <div className="h-[4.5rem] w-1/3 ml-5 mb-5 bg-[#fafafa] skeletonChat rounded"></div>
        <div className="h-[4.5rem] w-1/3 mr-5 mb-5 bg-[#fafafa] skeletonChat rounded self-end"></div>
    </div>
  );
};

export default ChatBubbleSkeleton;
