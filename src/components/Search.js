import React from 'react';
import PropTypes from 'prop-types';

import StyledSearch from './styles/StyledSearch';

class Search extends React.Component {
  state = {
    searchTerm: ''
  };

  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { onSearch } = this.props;
    const { searchTerm } = this.state;
    return (
      <StyledSearch>
        <input type="text" onChange={this.onSearchChange} value={searchTerm} />
        <button onClick={() => onSearch(searchTerm)}>Search</button>
      </StyledSearch>
    );
  }
}

export default Search;