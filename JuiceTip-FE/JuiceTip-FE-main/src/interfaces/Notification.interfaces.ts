import { IDate } from "./Date.interfaces";

export interface INotification {
  id: string;
  productId: string;
  price: number;
  image: string;
  isRead: boolean;
  userProfile: string;
  justiperName: string;
  justiperId: string;
  productName: string;
  date: IDate;
}