import React, { Component } from 'react';
import styled from 'styled-components';

class SearchBox extends Component {
  render() {

    const {
      search,
      onSearchTitleChange,
      onSearchTitleEnter,
      onSearchTypeChange,
      onSearchPageChange
    } = this.props;

    let pageOptions = [];
    for(let i = 1; i <= 100; i++) pageOptions.push(pageOption(i));
    
    return (
      <div 
        className="searchBox"
        style={{
          width: '60%',
          margin: '3em auto',
          display: 'flex',
          justifyContent: 'space-between',
          lineHeight: '1em'
        }}
      >
        <span>
          <p>title: </p>
          <SearchInput
            defaultValue={search.title}
            onKeyDown={e => (e.keyCode === 13 || e.keyCode === 32) ? onSearchTitleEnter(e.target) : onSearchTitleChange(e.target)}
          /> 
        </span>
        <span>
          <p>type: </p>
          <select
            value={search.type}
            onChange={({ target }) => onSearchTypeChange(target.value)}
          >
            <option value='all'>all</option>
            <option value='movie'>movie</option>
            <option value='series'>series</option>
            <option value='episode'>episode</option>
          </select>
        </span>
        <span>
          <p>page: </p>
          <select
            value={search.page}
            onChange={({ target }) => onSearchPageChange(target.value)}
          > Page:
            {pageOptions}
          </select>
        </span>
      </div>
    );
  }
}

const SearchInput = styled.input`
border: 1px solid black;
background: lightgray;
`;

const pageOption = page => (
  <option key={page} value={page}>{page}</option>
);

export default SearchBox;
// onChange={({ target }) => onSearchTitleChange(target)}