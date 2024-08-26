import { IProgressProduct } from "../../../Services/productService";

export interface IRatingModal {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    product: IProgressProduct;
}
