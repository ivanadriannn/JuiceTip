import { IRegion } from "../../Services/regionService";

export interface IRegionFilter {
  regions: IRegion[];
  showRegions: boolean;
  handleSearch: (region: string, index: number) => void;
  handleFilterButtonClick: () => void;
  handleNavMyProduct?: () => void;
  clickedIndex: number | null;
//   handleSetIndex: (index: number) => void;
}
