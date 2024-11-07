import { ITransactionDetail } from "../../../interfaces/TransactionDetail.interfaces";

export interface IPaymentConfirmationProductModal {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    price: number
    handleUnsufficientCoin: () => void
    transactionDetail: ITransactionDetail
}