import React from "react";
import Anchor from "../Anchor/Anchor";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between bg-fafafa py-28 px-32">
      <div className="flex flex-col gap-7">
        <img src={require("../../assets/images/logo.png")} alt="logo" className="max-xl:w-64" />
        <p className="text-10b981 text-2xl">
          &#169; 2024 JuiceTip | All Rights Reserved
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-7">
        <h1 className="text-10b981 text-3xl font-medium">Connect With Us</h1>
        <div className="flex gap-10 max-sm:gap-6">
          <Anchor href="https://facebook.com" variant="flex" target>
            <img
              src={require("../../assets/images/facebook.png")}
              alt="facebook"
            />
          </Anchor>
          <Anchor href="https://twitter.com" variant="flex" target>
            <img
              src={require("../../assets/images/twitter.png")}
              alt="twitter"
            />
          </Anchor>
          <Anchor href="https://youtube.com" variant="flex" target>
            <img
              src={require("../../assets/images/youtube.png")}
              alt="youtube"
            />
          </Anchor>
          <Anchor href="https://instagram.com" variant="flex" target>
            <img
              src={require("../../assets/images/instagram.png")}
              alt="instagram"
            />
          </Anchor>
          <Anchor href="https://linkedin.com" variant="flex" target>
            <img
              src={require("../../assets/images/linkedin.png")}
              alt="linkedin"
            />
          </Anchor>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
