import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IButtonLogo } from "./IButtonLogo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Button from "../Button/Button";
const ButtonLogo = (props: IButtonLogo) => {
  const { href, src, title, setIsVisible } = props;
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${href}`);
  };

  const handleVisible = () => {
    setIsVisible(true);
  };
  return (
    <Button
      className="flex flex-col items-center mx-10"
      onClick={isLoggedIn ? handleClick : handleVisible}
    >
      <img
        src={require(`../../assets/images/${src}`)}
        alt={`${title}`}
        className="button-logo p-12 mb-2 max-lg:w-64 max-lg:h-64"
      />
      <p className="text-3xl text-10b981 font-medium">{title}</p>
    </Button>
  );
};

export default ButtonLogo;
