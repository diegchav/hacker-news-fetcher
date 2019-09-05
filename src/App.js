import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { sortBy } from 'lodash';

import Search from './components/Search';
import SearchResults from './components/SearchResults';

import {
  API_BASE_URL,
  API_QUERY_PARAM,
  API_HPP_PARAM,
  API_HPP,
  SORT_AUTHOR,
  SORT_TITLE,
  SORT_NUM_COMMENTS,
  SORT_POINTS,
  SORT_ASC,
  SORT_DESC
} from './constants';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component {
  state = {
    results: [],
    sortKey: SORT_TITLE,
    sortOrder: {
      [SORT_AUTHOR]: null,
      [SORT_TITLE]: SORT_ASC,
      [SORT_NUM_COMMENTS]: null,
      [SORT_POINTS]: null
    }
  };

  onSearch = (searchTerm) => {
    const searchUrl = `${API_BASE_URL}${API_QUERY_PARAM}${searchTerm.toLowerCase()}&${API_HPP_PARAM}${API_HPP}`;
    axios.get(searchUrl)
    .then(res => {
      const results = res.data.hits;
      this.setState({ results });
    });
  };

  getSortOrder = (prevState, sortKey) => {
    if (prevState[sortKey]) {
      if (prevState[sortKey] === SORT_ASC) {
        return SORT_DESC;
      }
      return SORT_ASC;
    }

    return SORT_ASC;
  };

  onSort = (sortKey) => {
    this.setState((prevState, props) => {
      const prevSortOrder = {...prevState.sortOrder};
      prevSortOrder[sortKey] = this.getSortOrder(prevSortOrder, sortKey);
      return {
        sortKey,
        sortOrder: prevSortOrder
      }
    });
  };

  render() {
    const { results, sortKey, sortOrder } = this.state;

    const sortedResults = sortOrder[sortKey] === SORT_DESC
      ? sortBy(results, sortKey).reverse()
      : sortBy(results, sortKey);
    
    return (
      <StyledApp>
        <Search onSearch={this.onSearch} />
        <SearchResults results={sortedResults} sortKey={sortKey} sortOrder={sortOrder} onSort={this.onSort} />
      </StyledApp>
    );
  }
}

export default App;
