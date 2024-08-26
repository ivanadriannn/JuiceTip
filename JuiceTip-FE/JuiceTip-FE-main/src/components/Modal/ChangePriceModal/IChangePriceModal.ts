import { IProduct } from "../../../Services/productService"

export interface IChangePriceModal{
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
    bargainPrice: number | null
    customerId: string
    justiperId: string
    image: string
    product?: IProduct
}