import axios from "axios";

export interface IProduct {
  productId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImageList: string[];
  productImage: string;
  categoryId: string;
  categoryName: string;
  regionId: string;
  regionName: string;
  customerId: string;
  customerName: string;
  notes?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export interface IProgressProduct {
  productId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImageList: string[];
  productImage: string;
  categoryId: string;
  categoryName: string;
  regionId: string;
  regionName: string;
  notes?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  justiperName: string;
  status: string;
  justiperId: string;
}

export interface IProductRequest {
  productId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  categoryId: string;
  regionId: string;
  customerId: string;
  notes?: string;
}

export const getProducts = async (callback: any) => {
  try {
    await axios.get("https://localhost:7234/product").then((res: any) => {
      const products = res.data.payload.map((product: any) => {
        const updatedProduct = {
          ...product,
          productImageList: product.productImageList.map((imageUrl: string) =>
            imageUrl.replace(/^"(.*)"$/, "$1")
          ),
        };
        return updatedProduct;
      });
      callback(products);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProgressProducts = async (userId: string, callback: any) => {
  try {
    await axios.post("https://localhost:7234/product/progress", { userId }).then((res: any) => {
      const products = res.data.payload.map((product: any) => {
        const updatedProduct = {
          ...product,
          productImageList: product.productImageList.map((imageUrl: string) =>
            imageUrl.replace(/^"(.*)"$/, "$1")
          ),
        };
        return updatedProduct;
      });
      callback(true, products);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (productId: string, callback: any) => {
  try {
    const response = await axios.post("https://localhost:7234/product/id", { productId })
    const updateProduct = {
      ...response.data.payload,
      productImageList: response.data.payload.productImageList.map((imageUrl: string) =>
        imageUrl.replace(/^"(.*)"$/, "$1")
      ),
    }
    callback(true, updateProduct);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (productId: string, callback: any) => {
  try {
    const response = await axios.post("https://localhost:7234/product/delete", { productId })
    callback(true, response);
  } catch (error) {
    console.log(error);
  }
};

export const insertProduct = async (
  product: IProductRequest,
  callback: any
) => {
  console.log(product);
  axios
    .post("https://localhost:7234/product/upsert", product)
    .then((response: any) => {
      callback(true, response.data.payload);
    })
    .catch((error) => {
      callback(false, null);
    });
};
