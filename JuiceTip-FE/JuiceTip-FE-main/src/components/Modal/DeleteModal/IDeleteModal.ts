import { IProduct } from "../../../Services/productService";

export interface IDeleteModal {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    product?: IProduct;
}