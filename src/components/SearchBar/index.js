
import SearchIcon from "@mui/icons-material/Search";
import React from 'react';
import { search } from '../../theme'

export const Search = (props) => {
  const { placeholder, titulo } = props;

  return (
    <div className="row Search">
      <h3>{titulo}</h3>
      <div className="input">
        <input
          type="text"
          placeholder={placeholder}
          className="input-text"
        />
        <button className="btn-search" type="button">
          <SearchIcon className="icon-search" />
        </button>
      </div>
    </div>
  );
};
