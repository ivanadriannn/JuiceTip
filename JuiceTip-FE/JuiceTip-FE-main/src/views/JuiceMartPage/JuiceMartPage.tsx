import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BackButton from "../../components/BackButton/BackButton";
import ChatButton from "../../components/ChatButton/ChatButton";

const JuiceMartPage = () => {
  return (
    <div>
      <Navbar />
      <BackButton/>
      <div className="bg-e5e5e5 min-h-screen py-14">
        <div className="flex items-center justify-center gap-5">
          <img
            src={require("../../assets/images/juiceMart.png")}
            alt="juiceMart"
          />
          <h1 className="text-10b981 font-bold text-5xl">JuiceMart</h1>
        </div>
      </div>
      <ChatButton setIsVisible={() => {}}/>
      <Footer />
    </div>
  );
};

export default JuiceMartPage;
