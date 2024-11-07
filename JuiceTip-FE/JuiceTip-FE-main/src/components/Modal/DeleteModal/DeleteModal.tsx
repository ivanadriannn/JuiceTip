import React from "react";
import { IDeleteModal } from "./IDeleteModal";
import ModalIndex from "../ModalIndex/ModalIndex";
import Button from "../../Button/Button";
import { deleteProductById } from "../../../Services/productService";

const DeleteModal = (props: IDeleteModal) => {
  const { isVisible, setIsVisible, product } = props;
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (product) {
      deleteProductById(product.productId, (status: boolean, res: any) => {
        if (status) {
          const currentPath = window.location.pathname;
          const reloadPaths = ["/", "/juice-tip", "/my-products"];
          if (reloadPaths.includes(currentPath)) {
            window.location.reload();
          } else {
            window.location.href = "/"
          }
        }
      });
    }
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation} className="w-[45rem]">
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 gap-7 \">
          <h1 className="text-4xl text-5d5d5d font-bold">Delete Product?</h1>
          <img
            src={require("../../../assets/images/deleteProduct.png")}
            alt="deleteProduct"
          />
          <p className="inline-block text-xl font-medium text-5d5d5d text-left break-words">
            Are you sure want to delete
            <span className="font-bold break-words">
              "{product && product.productName}"?
            </span>
          </p>

          <div className="flex w-full gap-5">
            <Button
              className="border border-[#10b981] w-full text-2xl font-medium py-2 rounded-lg text-10b981"
              onClick={handleModalClick}
            >
              Cancel
            </Button>
            <Button
              className="w-full text-2xl font-medium py-2 rounded-lg text-white bg-[#b91010]"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </ModalIndex>
  );
};

export default DeleteModal;
