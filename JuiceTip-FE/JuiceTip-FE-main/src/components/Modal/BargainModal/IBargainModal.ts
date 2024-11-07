import { IProduct } from "../../../Services/productService";

export interface IBargainModal {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    product: IProduct;
    handleNavigate: (amount: number) => void;
}