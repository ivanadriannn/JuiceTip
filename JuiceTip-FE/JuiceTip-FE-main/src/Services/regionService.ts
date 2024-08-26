import axios from "axios";

export interface IRegion {
  regionId: string;
  region: string;
  regionImage: string;
}
export const getRegions = (callback: any) => {
  axios
    .post("https://localhost:7234/region", {})
    .then((response: any) => {
      callback(response.data.payload);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getRegionById = async (id: string, callback: any) => {
  try {
    await axios
      .post("https://localhost:7234/region/", { id })
      .then((response: any) => {
        callback(response.data.payload);
      });
  } catch (error) {
    console.log(error);
  }
};
