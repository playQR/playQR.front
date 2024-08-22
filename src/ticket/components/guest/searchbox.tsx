import React from "react";
import search_icon from "../img/search_icon.png";
type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

const SearchBox = (props: Props) => {
  const { value, onChange, onClick } = props;
  return (
    <div className="flex flex-row items-center justify-between w-full mb-5 bg-gray-5 rounded-3xl">
      <input
        className={`w-full bg-gray-5 ${
          value === "" ? "text-gray-3" : "text-gray-1"
        } ml-14px`}
        type="search"
        placeholder="예매자를 검색하세요"
        value={value}
        onChange={onChange}
      ></input>
      <button>
        <img
          src={search_icon}
          onClick={onClick}
          alt="search"
          className="my-1 w-38px h-38px mx-14px"
        ></img>
      </button>
    </div>
  );
};

export default SearchBox;
