import { IRegion } from "../../../Services/regionService";

export interface ICountryModal {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    countries: IRegion[];
    onSelectCountry: (selectedCountry: string, id: string) => void;
}