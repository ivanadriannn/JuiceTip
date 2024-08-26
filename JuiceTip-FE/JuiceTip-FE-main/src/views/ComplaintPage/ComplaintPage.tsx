import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BackButton from "../../components/BackButton/BackButton";
import ComplaintImage from "../../components/ComplaintImage/ComplaintImage";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import SubmitComplaintModal from "../../components/Modal/SubmitComplaintModal/SubmitComplaintModal";

const ComplaintPage = () => {
  const [relative, setRelative] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const handleRelative = () => {
    setRelative(!relative);
  };

  const handleSubmit = () => {
    setSubmitModal(true);
  };

  return (
    <div className="relative z-0">
      <div>
        <Navbar handleRelative={handleRelative} />
        <BackButton />
        <div
          className={`bg-e5e5e5 flex items-center mt-5 flex-col gap-10 min-h-screen py-14 ${
            relative ? "relative -z-10" : ""
          } `}
        >
          <h1 className="text-center text-10b981 font-bold text-5xl">
            COMPLAINT
          </h1>
          <div className="my-7 bg-fafafa p-8 rounded-lg shadow-xl w-2/3 cursor-pointer">
            <h1 className="font-bold text-5d5d5d text-xl mb-5">
              Explain product problem
            </h1>
            <p className="text-[#6d6d6d] font-semibold mb-2">
              Reason <span className="text-red-500">*</span>
            </p>
            <textarea
              className="w-full focus:outline-none resize-none border-[#5d5d5d] border-2 rounded-lg min-h-32 p-3"
              placeholder="Explain your problem as detail as you can"
            />
            <p className="text-[#7d7d7d] mb-10">Min 20 Characters</p>

            <h1 className="font-bold text-5d5d5d text-xl mb-5">
              Image Proof <span className="text-red-500">*</span>
            </h1>
            <p className="text-[#6d6d6d] font-semibold mb-2">
              Upload your photo of the product to be an evidence for the
              complaint. <br />
              Max. 5 Images
            </p>
            <ComplaintImage />
            <div className="flex justify-end items-center mt-10">
              <Button
                className="text-white font-medium bg-10b981 px-9"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {submitModal && (
        <SubmitComplaintModal
          isVisible={submitModal}
          setIsVisible={setSubmitModal}
        />
      )}
    </div>
  );
};

export default ComplaintPage;
