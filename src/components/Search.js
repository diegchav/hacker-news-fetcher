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

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSearch(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <StyledSearch>
        <form onSubmit={this.handleSubmit}>
          <InputBase
            value={searchValue}
            onChange={this.handleChange}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </form>
      </StyledSearch>
    );
  }
}

export default Search;