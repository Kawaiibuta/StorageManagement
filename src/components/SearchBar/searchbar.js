import React from "react";
import { Input } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchBar = (props) => {
  return (
    <Input
      addonAfter={<AiOutlineSearch />}
      onSearch={onSearch}
      placeholder="input search text"
      allowClear
      style={{ width: 200 }}
      {...props}
    />
  );
};
export default SearchBar;
