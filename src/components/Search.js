import React from 'react';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';

import StyledSearch from './styles/StyledSearch';

class Search extends React.Component {
  state = {
    searchValue: ''
  };

  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };

  onSearchChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <StyledSearch>
        <InputBase
          value={searchValue}
          onChange={this.onSearchChange}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton aria-label="search" onClick={this.handleSearchClick}>
          <SearchIcon />
        </IconButton>
      </StyledSearch>
    );
  }
}

export default Search;