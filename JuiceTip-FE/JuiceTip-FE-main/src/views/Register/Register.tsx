import React, { useState } from "react";
import InputGroup from "../../components/InputGroup/InputGroup";
import Anchor from "../../components/Anchor/Anchor";
import Button from "../../components/Button/Button";
import OTPModal from "../../components/Modal/OTPModal/OTPModal";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { generateOTP } from "../../Services/authService";

const Register = () => {
  const [registerFailed, setRegisterFailed] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState("page-1");

  const [value, setValue] = useState({
    emailValue: "",
    firstname: "",
    lastname: "",
    address: "",
    phoneNumber: "",
    dob: new Date(),
    male: "",
    female: "",
    undefined: "",
    gender: "",
    date: "",
    password: "",
    confirmPassword: "",
    checkbox: false,
  });
  const [day, setDay] = useState<Dayjs | null>();
  const [month, setMonth] = useState<Dayjs | null>();
  const [year, setYear] = useState<Dayjs | null>();
  const handleInput = (e: any) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setValue((prevData) => ({
        ...prevData,
        [id]: checked,
      }));
    } else if (type === "radio") {
      setValue((prevData) => ({
        ...prevData,
        male: id === "male" ? checked : false,
        female: id === "female" ? checked : false,
        undefined: id === "undefined" ? checked : false,
      }));
    } else {
      setValue((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleValidation = (e: any) => {
    e.preventDefault();
    if (value.checkbox === false) {
      setRegisterFailed("You must agree to the Terms and Conditions ");
    }
    if (value.password !== value.confirmPassword) {
      setRegisterFailed("Password and Confirm Password does not match");
    }
    if (value.password === "") {
      setRegisterFailed("Password is required");
    }
    if (value.phoneNumber === "") {
      setRegisterFailed("Phone Number is required");
    }
    if (value.address === "") {
      setRegisterFailed("Address is required");
    }
    if (value.female === "" && value.male === "" && value.undefined === "") {
      setRegisterFailed("Gender is required");
    }
    if (value.dob.toLocaleDateString() === new Date().toLocaleDateString()) {
      setRegisterFailed("Date of Birth is required");
    }
    if (value.lastname === "") {
      setRegisterFailed("Last Name is required");
    }
    if (value.firstname === "") {
      setRegisterFailed("First Name is required");
    }
    if (value.emailValue === "") {
      setRegisterFailed("Email is required");
    }
    if (
      value.emailValue &&
      value.password &&
      value.confirmPassword &&
      value.checkbox &&
      value.address &&
      value.lastname &&
      value.firstname &&
      value.phoneNumber &&
      value.dob &&
      (value.female || value.male || value.undefined)
    ) {
      setRegisterFailed("");
      setIsVisible(true);
      generateOTP(value.emailValue, value.firstname);
    }
  };

  const handleNext = () => {
    setCurrentPage(`page-${parseInt(currentPage.split("-")[1]) + 1}`);
  };

  const handleBack = () => {
    setCurrentPage(`page-${parseInt(currentPage.split("-")[1]) - 1}`);
  };

  const handleDate = (
    newMonth: Dayjs | null,
    newDay: Dayjs | null,
    newYear: Dayjs | null
  ) => {
    if (newMonth && newDay && newYear) {
      const dob = new Date(
        parseInt(newYear!.format("YYYY")),
        parseInt(newMonth!.format("MM")) - 1,
        parseInt(newDay!.format("DD")) + 1
      );
      setValue((prevData) => ({
        ...prevData,
        dob: dob,
      }));
    }
  };

  const handleGender = (gender: string) => {
    setValue((prevData) => ({
      ...prevData,
      gender: gender,
    }));
  };
  return (
    <div className="section mx-auto min-h-screen flex">
      <div className="bg-e5e5e5 min-h-screen w-1/2 flex flex-col items-center text-start justify-center max-lg:w-full">
        <form className="w-4/6 mb-10" onSubmit={handleValidation}>
          <div className="flex flex-col items-center">
            {currentPage === "page-1" && (
              <div id="page-1" className="w-full">
                <div className="flex justify-between items-center pt-20 mb-3">
                  <h1 className="text-5d5d5d text-3xl font-bold">
                    Register JuiceTip
                  </h1>
                  <Anchor
                    children="Back to Homepage"
                    variant="hidden text-5d5d5d text-right font-semibold underline max-lg:flex"
                    href="/"
                  />
                </div>
                <div className="flex">
                  <p className="text-5d5d5d font-bold">
                    Already have an account?&nbsp;
                  </p>
                  <Anchor
                    children="Let's sign in!"
                    variant="text-10b981 font-bold"
                    href="/login"
                  />
                </div>
                <hr className="h-1 mt-3 bg-gray-200 border-0 bg-bcbec0 rounded-sm" />
                <InputGroup
                  id="emailValue"
                  children="Email"
                  placeholder="Insert Email ..."
                  onChange={handleInput}
                  value={value.emailValue}
                />
                <InputGroup
                  id="firstname"
                  children="First Name"
                  placeholder="Insert First Name ..."
                  onChange={handleInput}
                  value={value.firstname}
                />
                <InputGroup
                  id="lastname"
                  children="Last Name"
                  placeholder="Insert Last Name ..."
                  onChange={handleInput}
                  value={value.lastname}
                />
                <div className="w-full flex justify-end">
                  <Button
                    children="Next"
                    className="mt-5 w-36 rounded-full text-2xl bg-10b981 text-white"
                    onClick={handleNext}
                  />
                </div>
              </div>
            )}
            {currentPage === "page-2" && (
              <div id="page-2">
                <div className="flex justify-between items-center pt-20 mb-3">
                  <h1 className="text-5d5d5d text-3xl font-bold">
                    Register JuiceTip
                  </h1>
                  <Anchor
                    children="Back to Homepage"
                    variant="hidden text-5d5d5d text-right font-semibold underline max-lg:flex"
                    href="/"
                  />
                </div>
                <div className="flex">
                  <p className="text-5d5d5d font-bold">Basic Information</p>
                </div>
                <hr className="h-1 mt-3 bg-gray-200 border-0 bg-bcbec0 rounded-sm" />
                <div className="flex flex-col mt-5">
                  <label className="text-5d5d5d font-bold text-sm mb-2 mt-10">
                    Enter Your Date of Birth and Gender
                  </label>
                  <div className="flex gap-2">
                    <DatePicker
                      label={'"Month"'}
                      views={["month"]}
                      value={month ? month : null}
                      onChange={(newMonth) => {
                        setMonth(newMonth);
                        if (newMonth && day && year) {
                          handleDate(newMonth, day, year);
                        }
                      }}
                    />
                    <DatePicker
                      label={'"Day"'}
                      views={["day"]}
                      value={day ? day : null}
                      onChange={(newDay) => {
                        setDay(newDay);
                        if (month && newDay && year) {
                          handleDate(month, newDay, year);
                        }
                      }}
                    />
                    <DatePicker
                      label={'"Year"'}
                      views={["year"]}
                      value={year ? year : null}
                      onChange={(newYear) => {
                        setYear(newYear);
                        if (month && day && newYear) {
                          handleDate(month, day, newYear);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-start mt-5">
                  <label className="text-5d5d5d font-bold text-sm">
                    Gender
                  </label>
                  <InputGroup
                    id="male"
                    children="Male"
                    onChange={(e: any) => {
                      handleInput(e);
                      handleGender("male");
                    }}
                    type="radio"
                    name="gender"
                    value={value.male}
                    checked={value.male ? true : false}
                  />
                  <InputGroup
                    id="female"
                    children="Female"
                    onChange={(e: any) => {
                      handleInput(e);
                      handleGender("female");
                    }}
                    type="radio"
                    name="gender"
                    value={value.female}
                    checked={value.female ? true : false}
                  />
                  <InputGroup
                    id="undefined"
                    children="Prefer not to say"
                    onChange={(e: any) => {
                      handleInput(e);
                      handleGender("undefined");
                    }}
                    type="radio"
                    name="gender"
                    value={value.undefined}
                    checked={value.undefined ? true : false}
                  />
                </div>
                <div className="w-full flex justify-end gap-5">
                  <Button
                    children="Back"
                    className="mt-5 w-36 rounded-full text-2xl bg-10b981 text-white"
                    onClick={handleBack}
                  />
                  <Button
                    children="Next"
                    className="mt-5 w-36 rounded-full text-2xl bg-10b981 text-white"
                    onClick={handleNext}
                  />
                </div>
              </div>
            )}
            {currentPage === "page-3" && (
              <div id="page-3" className="w-full">
                <div className="flex justify-between items-center pt-20 mb-3">
                  <h1 className="text-5d5d5d text-3xl font-bold">
                    Register JuiceTip
                  </h1>
                  <Anchor
                    children="Back to Homepage"
                    variant="hidden text-5d5d5d text-right font-semibold underline max-lg:flex"
                    href="/"
                  />
                </div>
                <div className="flex">
                  <p className="text-5d5d5d font-bold">Basic Information</p>
                </div>
                <hr className="h-1 mt-3 bg-gray-200 border-0 bg-bcbec0 rounded-sm" />
                <InputGroup
                  id="address"
                  children="Address"
                  placeholder="Insert Address ..."
                  onChange={handleInput}
                  value={value.address}
                />
                <InputGroup
                  id="phoneNumber"
                  children="Phone Number"
                  placeholder="Insert Phone Number ..."
                  onChange={handleInput}
                  value={value.phoneNumber}
                />
                <InputGroup
                  id="password"
                  children="Password"
                  placeholder="Insert Password ..."
                  type="password"
                  onChange={handleInput}
                  value={value.password}
                />
                <InputGroup
                  id="confirmPassword"
                  children="Confirm Password"
                  placeholder="Insert Confirm Password ..."
                  type="password"
                  onChange={handleInput}
                  value={value.confirmPassword}
                />
                <div className="flex gap-4 mt-5">
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="checkbox"
                    onChange={handleInput}
                    checked={value.checkbox}
                  />
                  <label
                    htmlFor="checkbox"
                    className="text-5d5d5d font-semibold text-md"
                  >
                    I agree to the terms and conditions as set out by the user
                    agreement
                  </label>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <Button
                    children="Back"
                    className="mt-5 w-44 rounded-full text-2xl bg-10b981 text-white"
                    onClick={handleBack}
                  />
                  <Button
                    children="Register"
                    className="mt-5 w-64 rounded-full text-2xl bg-10b981 text-white"
                  />
                </div>
              </div>
            )}
            {registerFailed && (
              <p className="text-red-500 font-bold text-xl text-center">
                {registerFailed}
              </p>
            )}
          </div>
        </form>
      </div>
      <div className="w-1/2 flex flex-col items-center text-start justify-center max-lg:hidden">
        <Anchor
          children="Back to Homepage"
          variant="text-fafafa w-full text-right mr-24 font-semibold underline"
          href="/"
        />
        <img
          src={require("../../assets/images/register_right.png")}
          alt="register_right"
          className="w-10/12"
        />
      </div>
      {isVisible ? (
        <OTPModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          value={value}
        />
      ) : null}
    </div>
  );
};

export default Register;
