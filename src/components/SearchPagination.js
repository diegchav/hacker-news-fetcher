import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';

import StyledSearchPagination from './styles/StyledSearchPagination';

import {
  PREV_PAGE,
  NEXT_PAGE
} from '../constants';

const SearchPagination = ({ page, totalPages, onPageChange }) => (
  <StyledSearchPagination>
    <IconButton aria-label="previous" disabled={page <= 0} onClick={() => onPageChange(PREV_PAGE)}>
      <NavigateBefore />
    </IconButton>
    {
      totalPages
        ? <span>{page + 1}</span>
        : null
    }
    <IconButton aria-label="after" disabled={page >= totalPages} onClick={() => onPageChange(NEXT_PAGE)}>
      <NavigateNext />
    </IconButton>
  </StyledSearchPagination>
);

SearchPagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default SearchPagination;