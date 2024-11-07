export interface ITransactionDetail {
  transactionId: string
  justiperId: string
  applicationFee: number
  productId: string
  transactionStatus: string
  // qty: number
  subtotalProduct: number
  subtotalPayment: number
}