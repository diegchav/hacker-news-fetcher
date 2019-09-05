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
  API_PAGE_PARAM,
  API_HPP,
  SORT_AUTHOR,
  SORT_TITLE,
  SORT_NUM_COMMENTS,
  SORT_POINTS,
  SORT_ASC,
  SORT_DESC,
  PREV_PAGE,
  NEXT_PAGE
} from './constants';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component {
  state = {
    searchTerm: '',
    results: [],
    sortKey: SORT_TITLE,
    sortOrder: {
      [SORT_AUTHOR]: null,
      [SORT_TITLE]: SORT_ASC,
      [SORT_NUM_COMMENTS]: null,
      [SORT_POINTS]: null
    },
    page: 0,
    totalPages: 0
  };

  fetchResults = (searchTerm, page = 0) => {
    const searchUrl = `${API_BASE_URL}${API_QUERY_PARAM}${searchTerm.toLowerCase()}&${API_HPP_PARAM}${API_HPP}&${API_PAGE_PARAM}${page}`;
    axios.get(searchUrl)
    .then(res => {
      this.setState({
        searchTerm,
        results: res.data.hits,
        page,
        totalPages: res.data.nbPages
      });
    });
  };

  onSearch = (searchTerm) => {
    this.fetchResults(searchTerm);
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

  getPageFromDirection = (currentPage, totalPages, direction) => {
    if (direction === PREV_PAGE) {
      if (currentPage <= 0) {
        return currentPage;
      }
      return currentPage - 1;
    } else if (direction === NEXT_PAGE) {
      if (currentPage >= totalPages) {
        return currentPage;
      }
      return currentPage + 1;
    }
  
    // Default to the first page.
    return 0;
  };

  onPageChange = (direction) => {
    const { searchTerm, page, totalPages } = this.state;
    const newPage = this.getPageFromDirection(page, totalPages, direction);
    this.fetchResults(searchTerm, newPage);
  };

  render() {
    const { results, sortKey, sortOrder, page, totalPages } = this.state;

    const sortedResults = sortOrder[sortKey] === SORT_DESC
      ? sortBy(results, sortKey).reverse()
      : sortBy(results, sortKey);
    
    return (
      <StyledApp>
        <Search onSearch={this.onSearch} />
        <SearchResults
          results={sortedResults}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={this.onSort}
          page={page}
          totalPages={totalPages}
          onPageChange={this.onPageChange} />
      </StyledApp>
    );
  }
}

export default App;
