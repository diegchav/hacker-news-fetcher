import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { sortBy } from 'lodash';

import Search from './components/Search';
import SearchResults from './components/SearchResults';

import WithSpinner from './hoc/WithSpinner';

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
  NEXT_PAGE,
  LOCAL_STORAGE_KEY
} from './constants';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchResultsWithSpinner = WithSpinner(SearchResults);

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
    totalPages: 0,
    loading: false
  };

  componentDidMount() {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      const lsState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      this.setState({
        ...this.state,
        ...lsState
      });
    }
  }

  fetchResults = (searchTerm, page = 0) => {
    const searchUrl = `${API_BASE_URL}${API_QUERY_PARAM}${searchTerm.toLowerCase()}&${API_HPP_PARAM}${API_HPP}&${API_PAGE_PARAM}${page}`;
    axios.get(searchUrl)
    .then(res => {
      this.setState({
        searchTerm,
        results: res.data.hits,
        page,
        totalPages: res.data.nbPages,
        loading: false
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state));
    });
  };

  handleSearch = (searchTerm) => {
    this.fetchResults(searchTerm);
    this.setState({ loading: true });
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

  handleSort = (sortKey) => {
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

  handlePageChange = (direction) => {
    const { searchTerm, page, totalPages } = this.state;
    const newPage = this.getPageFromDirection(page, totalPages, direction);
    this.fetchResults(searchTerm, newPage);
  };

  render() {
    const { loading, results, sortKey, sortOrder, page, totalPages } = this.state;

    const sortedResults = sortOrder[sortKey] === SORT_DESC
      ? sortBy(results, sortKey).reverse()
      : sortBy(results, sortKey);
    
    return (
      <StyledApp>
        <Search onSearch={this.handleSearch} />
        <SearchResultsWithSpinner
          isLoading={loading}
          results={sortedResults}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={this.handleSort}
          page={page}
          totalPages={totalPages}
          onPageChange={this.handlePageChange} />
      </StyledApp>
    );
  }
}

export default App;
