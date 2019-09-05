import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Search from './components/Search';
import SearchResults from './components/SearchResults';

import {
  API_BASE_URL,
  API_QUERY_PARAM,
  API_HPP_PARAM,
  API_HPP
} from './constants';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component {
  state = {
    results: []
  };

  onSearch = (searchTerm) => {
    const searchUrl = `${API_BASE_URL}${API_QUERY_PARAM}${searchTerm.toLowerCase()}&${API_HPP_PARAM}${API_HPP}`;
    axios.get(searchUrl)
    .then(res => {
      const results = res.data.hits;
      this.setState({ results });
    });
  };

  render() {
    const { results } = this.state;
    return (
      <StyledApp>
        <Search onSearch={this.onSearch} />
        <SearchResults results={results} />
      </StyledApp>
    );
  }
}

export default App;
