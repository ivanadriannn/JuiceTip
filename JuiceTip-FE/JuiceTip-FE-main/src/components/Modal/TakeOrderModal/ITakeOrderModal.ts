import { IProduct } from "../../../Services/productService";

export interface ITakeOrderModal {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  product?: IProduct;
  bargainPrice?: number;
  customerId: string;
  justiperId: string;
  justiperName: string;
  userProfile: string;
}
