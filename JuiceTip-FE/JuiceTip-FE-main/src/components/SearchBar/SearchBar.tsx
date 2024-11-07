import React, { useState } from "react";
import { ISearchBar } from "./ISearchBar";

const SearchBar = (props: ISearchBar) => {
  const { className, onSearch, placeholder, isChat } = props;
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value, -1);
  };
  return (
    <div
      className={`${isChat ? 'mt-0' : 'mt-20'} flex justify-center items-center w-full rounded-lg ${className}`}
    >
      <div className={`${isChat ? 'bg-e5e5e5 flex flex-row-reverse' : 'flex'} items-center bg-white w-full h-12 rounded-lg px-4 justify-between`}>
        <input
          type="text"
          placeholder={placeholder ? placeholder : "Search ..."}
          className={`${isChat ? 'bg-e5e5e5' : ''} font-semibold outline-none w-full`}
          value={query}
          onChange={handleChange}
        />
        <img
          src={require("../../assets/images/searchIcon.png")}
          alt="searchIcon"
          className="max-md:w-10"
        />
      </div>
    </div>
  );
};

export default SearchBar;
