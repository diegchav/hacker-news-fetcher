import React from 'react';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';

import StyledSearch from './styles/StyledSearch';

class Search extends React.Component {
  state = {
    searchTerm: 'react'
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
        <InputBase
          value={searchTerm}
          onChange={this.onSearchChange}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton aria-label="search" onClick={() => onSearch(searchTerm)}>
          <SearchIcon />
        </IconButton>
      </StyledSearch>
    );
  }
}

export default Search;