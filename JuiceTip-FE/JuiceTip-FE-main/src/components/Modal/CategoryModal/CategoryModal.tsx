import React, { useState } from "react";
import { ICategoryModal } from "./ICategoryModal";
import ModalIndex from "../ModalIndex/ModalIndex";
import { ICategory } from "../../../interfaces/Category.interfaces";
import Button from "../../Button/Button";

const CategoryModal = (props: ICategoryModal) => {
  const { isVisible, setIsVisible, categories, onSelectCategory } = props;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [id, setId] = useState<string>("");

  const handleModalClick = () => {
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleSelectCategory = (category: ICategory) => {
    setSelectedCategory(category.category);
    setId(category.categoryId);
  };

  const handleChoose = () => {
    if (selectedCategory) {
      onSelectCategory(selectedCategory, id);
      setIsVisible(false);
    }
  };
  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation} className="w-[50rem] h-[50rem] overflow-auto scrollbar-hidden">
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 w-full gap-3">
          <h1 className="text-3xl text-10b981 font-bold w-full text-left">
            <span onClick={handleModalClick} className="cursor-pointer">
              &#x2715;
            </span>{" "}
            Choose Category *
          </h1>
          {categories.map((category: ICategory) => (
            <div
              key={category.categoryId}
              className={`flex items-center justify-between w-full border-b-2 py-3 text-lg`}
              onClick={() => handleSelectCategory(category)}
            >
              <label
                htmlFor={category.category}
                className={`text-5d5d5d ${
                  selectedCategory === category.category ? "text-10b981" : ""
                }`}
              >
                {category.category}
              </label>
              <input
                id={category.categoryId}
                name={category.category}
                type="radio"
                value={category.categoryId}
                checked={selectedCategory === category.category}
                onChange={() => {}}
              />
            </div>
          ))}
          <Button
            className="bg-10b981 text-white w-fit px-14 text-2xl font-medium"
            onClick={handleChoose}
          >
            Choose
          </Button>
        </div>
      </div>
    </ModalIndex>
  );
};

export default CategoryModal;
