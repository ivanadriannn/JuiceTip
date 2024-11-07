import React from "react";
import Button from "../Button/Button";

const BackButton = () => {
  const handleBack = () => {
    window.history.back();
  };
  return (
    <Button className="absolute top-44 left-12" onClick={handleBack}>
      <img
        src={require("../../assets/images/backButton.png")}
        alt="backButton"
        className="max-lg:w-18 max-lg:h-12"
      />
    </Button>
  );
};

export default BackButton;
