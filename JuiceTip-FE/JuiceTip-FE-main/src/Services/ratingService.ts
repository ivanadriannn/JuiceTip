import axios from "axios";

export interface IReview{
    customerName: string;
    rating: number;
    comment: string;
    reviewDate: Date;
}

export const insertRating = async (
  customerId: string,
  userId: string,
  comment: string,
  rating: number
) => {
  try {
    const res = await axios.post("https://localhost:7234/rating/insert", {
      customerId,
      userId,
      comment,
      rating,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllRating = async (userId: string, callback: any) => {
    try {
        await axios.post("https://localhost:7234/rating/user", { userId })
        .then((res: any) => {
            callback(res.data.payload);
        })
    } catch (error) {
        console.log(error);
    }
}