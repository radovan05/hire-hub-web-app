import React from "react";
import "./Search.css";
import { useState, useEffect } from "react";

const Search = ({ data, setData, searchBy, notFilteredData }) => {
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  let searchedData = [];
  const [value, setValue] = useState("");
  useEffect(() => {
    notFilteredData.map((el) => {
      if (el[searchBy].toLowerCase().includes(value.toLowerCase())) {
        searchedData.push(el);
      }
    });
    if (searchedData.length !== 0) {
      setData(searchedData);
    }
  }, [value]);

  return (
    <div className="search-div">
      <input
        type="text"
        className="search-input"
        onChange={debounce((e) => {
          setValue(e.target.value);
        })}
      />
      <i className="fa fa-search"></i>
    </div>
  );
};

export default Search;
