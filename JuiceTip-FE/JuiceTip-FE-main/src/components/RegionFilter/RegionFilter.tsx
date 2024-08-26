import React from "react";
import { IRegionFilter } from "./IRegionFilter";
import { IRegion } from "../../Services/regionService";
import Button from "../Button/Button";

const RegionFilter = (props: IRegionFilter) => {
  const { regions, showRegions, handleSearch, handleFilterButtonClick, handleNavMyProduct, clickedIndex } = props;
  return (
    <div
      className={
        showRegions
          ? "grid gap-5 items-center justify-center my-7 grid-cols-5"
          : "flex gap-5 items-center justify-center my-7"
      }
    >
      {showRegions
        ? regions.map((region: IRegion, index: number) => (
            <Button
              className={`${
                clickedIndex === index
                  ? "border-[3px] border-[#119C6E] bg-10b981 py-1 px-9 text-white text-2xl font-medium rounded-full"
                  : "border-10b981 bg-fafafa py-1 px-9 text-10b981 text-2xl font-medium rounded-full"
              }`}
              key={region.regionId}
              onClick={() => handleSearch(region.region, index)}
            >
              {region.region}
            </Button>
          ))
        : regions.slice(0, handleNavMyProduct ? 5 : 6).map((region: IRegion, index: number) => (
            <Button
              className={`${
                clickedIndex === index
                  ? "border-[3px] border-[#119C6E] bg-10b981 py-1 px-9 text-white text-2xl font-medium rounded-full"
                  : "border-10b981 bg-fafafa py-1 px-9 text-10b981 text-2xl font-medium rounded-full"
              }`}
              key={region.regionId}
              onClick={() => handleSearch(region.region, index)}
            >
              {region.region}
            </Button>
          ))}
      {handleNavMyProduct && <Button
        className="bg-10b981 py-1 px-9 text-2xl font-medium rounded-full text-white"
        onClick={handleNavMyProduct}
      >
        My Products
      </Button>}
      <img
        src={require("../../assets/images/filterButton.png")}
        alt="filterButton"
        className="w-14 cursor-pointer"
        onClick={handleFilterButtonClick}
      />
    </div>
  );
};

export default RegionFilter;
