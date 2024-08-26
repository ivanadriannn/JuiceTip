import { ICategory } from "../../../interfaces/Category.interfaces";

export interface ICategoryModal {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    categories: ICategory[];
    onSelectCategory: (selectedCategory: string, id: string) => void;
}