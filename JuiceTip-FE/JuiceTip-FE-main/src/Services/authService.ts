import axios from "axios";
import { store } from "../redux/store";
import { LOGIN } from "../redux/slices/authSlice";

export const login = (email: string, password: string, callback: any) => {
  axios
    .post("https://localhost:7234/user/login", {
      email,
      password,
    })
    .then((response: any) => {
      callback(true, response.data.payload);
    })
    .catch((error) => {
      callback(false, null);
    });
};

export const generateOTP = async (email: string, name: string) => {
  try {
    const response = await axios.post(
      "https://localhost:7234/user/generate-otp",
      {
        email,
        name,
      }
    );
  } catch (error: any) {
    console.log(error);
  }
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  telephone: string,
  profileImage: string,
  juiceCoin: number,
  dob: Date,
  gender: string,
  otp: string,
  callback: any
) => {
  try {
    const response = await axios.post("https://localhost:7234/user/register", {
      email,
      password,
      firstName,
      lastName,
      address,
      telephone,
      gender,
      profileImage,
      juiceCoin,
      dob,
      otp,
    });
    callback(true, response.data.payload);
  } catch (error: any) {
    callback(false, error);
  }
};
