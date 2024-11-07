import axios from "axios";
import { ITransactionDetail } from "../interfaces/TransactionDetail.interfaces";

export const insertTransactionDetail = async (
  transactionDetail: ITransactionDetail,
  callback: any
) => {
  axios
    .post("https://localhost:7234/transaction-detail/insert", transactionDetail)
    .then((response: any) => {
      callback(true, response.data);
    })
    .catch((error) => {
      callback(false, null);
    });
};