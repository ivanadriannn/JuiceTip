import React from "react";
import { IProfileInfoGroup } from "./IProfileInfoGroup";
const ProfileInfoGroup = (props: IProfileInfoGroup) => {
  const { title, text } = props;
  return (
    <div className="mb-2 flex border-b-4 border-gray-300 pb-2 relative">
      <p className="text-bcbec0 font-bold">{title}</p>
      <p className="text-5d5d5d font-bold absolute ml-96 max-2xl:ml-60 max-lg:ml-72">{text}</p>
    </div>
  );
};

export default ProfileInfoGroup;
