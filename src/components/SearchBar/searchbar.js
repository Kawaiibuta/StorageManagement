import React from "react";
import { Input, Button } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import Search from "antd/es/input/Search";

const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchBar = (props) => {
  return (
    <Input
      addonAfter={
        <Button
          style={{
            display: "inline",
            margin: "0px",
            height: "38px",
            width: "100%",
            border: "none",
            backgroundColor: "#fcfcfc",
          }}
        >
          <AiOutlineSearch />
        </Button>
      }
      onSearch={onSearch}
      placeholder="input search text"
      allowClear
      style={{ width: "250px" }}
      {...props}
    />
  );
};
export default SearchBar;
