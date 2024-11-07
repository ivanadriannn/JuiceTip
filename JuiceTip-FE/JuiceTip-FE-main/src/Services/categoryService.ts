import axios from "axios";

export const getCategories = (callback: any) => {
  axios
    .post("https://localhost:7234/category", {})
    .then((response: any) => {
      callback(response.data.payload);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCategoryById = async (id: string, callback: any) => {
  try {
    await axios
      .post("https://localhost:7234/category/", { id })
      .then((response: any) => {
        callback(response.data.payload);
      });
  } catch (error) {
    console.log(error);
  }
};
