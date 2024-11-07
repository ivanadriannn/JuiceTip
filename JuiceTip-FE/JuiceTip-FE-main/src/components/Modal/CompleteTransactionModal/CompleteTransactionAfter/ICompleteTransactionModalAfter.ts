import { IProgressProduct } from "../../../../Services/productService"

export interface ICompleteTransactionAfter {
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
    product: IProgressProduct
    setShowRating: (showRating: boolean) => void
}