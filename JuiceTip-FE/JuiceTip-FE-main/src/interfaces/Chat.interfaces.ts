import { IDate } from "./Date.interfaces";

export interface IUserInfo {
  combinedId: string;
  date: IDate;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  userId: string;
}

export interface IMessage {
  id: string;
  message: string;
  date: IDate;
  senderId: string;
  productId: string | null;
  productName: string | null;
  isBargain: boolean;
  image: string | null;
  productPrice: number | null;
  bargainPrice: number | null;
  isTakeOrder: boolean;
  notes: string | null;
}