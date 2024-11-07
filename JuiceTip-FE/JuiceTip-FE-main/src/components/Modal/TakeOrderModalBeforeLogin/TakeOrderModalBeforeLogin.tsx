import React from "react";
import ModalIndex from "../ModalIndex/ModalIndex";
import { ITakeOrderModalBeforeLogin } from "./ITakeOrderModalBeforeLogin";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";

const TakeOrderModalBeforeLogin = (props: ITakeOrderModalBeforeLogin) => {
  const { isVisible, setIsVisible } = props;
  const navigate = useNavigate();
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleLogin = () => {
    navigate("/login");
  }
  
  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation}>
        <div className="bg-fafafa rounded-lg flex flex-col items-center justify-center py-8 px-32">
          <img
            src={require("../../../assets/images/ohsnap_modal.png")}
            alt="ohsnap_modal"
          />
          <h1 className="text-3xl text-5d5d5d font-bold">Oh snap!</h1>
          <p className="text-5d5d5d text-xl my-5">
            You need to login to use this feature
          </p>
          <Button className="bg-10b981 text-white text-xl px-9" onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </ModalIndex>
  );
};

export default TakeOrderModalBeforeLogin;
