import axios from "axios";

export const getUserById = (userId: string, callback: any) => {
  axios
    .post("https://localhost:7234/user/customer", {
      userId
    })
    .then((response: any) => {
      callback(true, response.data.payload);
    })
    .catch((error) => {
      callback(false, null);
    });
};

export const topUp = (userId: string, juiceCoin: number, callback: any) => {
  axios
    .post("https://localhost:7234/user/topup", {
      userId,
      juiceCoin
    })
    .then((response: any) => {
      callback(true, response.data.payload);
    })
    .catch((error) => {
      callback(false, null);
    });
};

export const decreaseBalance = (userId: string, juiceCoin: number, callback: any) => {
  axios
    .post("https://localhost:7234/user/decrease-balance", {
      userId,
      juiceCoin
    })
    .then((response: any) => {
      callback(true, response.data.payload);
    })
    .catch((error) => {
      callback(false, null);
    });
};