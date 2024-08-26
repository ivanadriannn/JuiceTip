import React, { useState } from "react";
import ModalIndex from "../ModalIndex/ModalIndex";
import { ICountryModal } from "./ICountryModal";
import SearchBar from "../../SearchBar/SearchBar";
import { IRegion } from "../../../Services/regionService";
import Button from "../../Button/Button";

const CountryModal = (props: ICountryModal) => {
  const { isVisible, setIsVisible, countries, onSelectCountry } = props;
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [id, setId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleModalClick = () => {
    setIsVisible(false);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSelectCountry = (region: IRegion) => {
    setSelectedRegion(region.region);
    setId(region.regionId);
  };

  const handleChoose = () => {
    if (selectedRegion) {
      onSelectCountry(selectedRegion, id);
      setIsVisible(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCountry = countries.filter((country) =>
    country.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ModalIndex onClick={handleModalClick}>
      <div onClick={handleStopPropagation} className="w-[50rem] h-[50rem] overflow-auto scrollbar-hidden">
        <div className="bg-fafafa rounded-xl flex flex-col items-center justify-center py-14 px-32 w-full gap-3">
          <h1 className="text-3xl text-10b981 font-bold w-full text-left">
            <span onClick={handleModalClick} className="cursor-pointer">
              &#x2715;
            </span>{" "}
            Choose Country *
          </h1>
          <SearchBar
            className="mt-3 w-full border border-black"
            onSearch={handleSearch}
          />
          {filteredCountry.length > 0 ? (
            filteredCountry.map((region: IRegion) => (
              <div
                key={region.regionId}
                className={`flex items-center justify-between w-full border-b-2 py-3 text-lg`}
                onClick={() => handleSelectCountry(region)}
              >
                <label
                  htmlFor={region.region}
                  className={`text-5d5d5d ${
                    selectedRegion === region.region ? "text-10b981" : ""
                  }`}
                >
                  {region.region}
                </label>
                <input
                  id={region.regionId}
                  name={region.region}
                  type="radio"
                  value={region.regionId}
                  checked={selectedRegion === region.region}
                  onChange={() => {}}
                />
              </div>
            ))
          ) : (
            <p className="text-red-600 font-bold text-xl">No country found</p>
          )}
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

export default CountryModal;
