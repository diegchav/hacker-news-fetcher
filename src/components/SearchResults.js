import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Link from '@material-ui/core/Link';

import SearchPagination from './SearchPagination';

import StyledSearchResults from './styles/StyledSearchResults';

import {
  SORT_AUTHOR,
  SORT_TITLE,
  SORT_NUM_COMMENTS,
  SORT_POINTS
} from '../constants';

const tableHeaders = [
  {
    value: 'Author',
    sort: SORT_AUTHOR
  },
  {
    value: 'Title',
    sort: SORT_TITLE
  },
  {
    value: 'Num of comments',
    sort: SORT_NUM_COMMENTS
  },
  {
    value: 'Points',
    sort: SORT_POINTS
  }
];

const SearchResults = ({ results, onSort, sortKey, sortOrder, page, totalPages, onPageChange }) => (
  <StyledSearchResults>
    <Table>
      <TableHead>
        <TableRow>
          {tableHeaders.map((header, i) => (
            <TableCell
              key={i} sortDirection={sortOrder[header.sort] ? sortOrder[header.sort] : false}
            >
              <TableSortLabel
                active={sortKey === header.sort}
                direction={sortOrder[header.sort] ? sortOrder[header.sort] : 'asc'}
                onClick={() => onSort(header.sort)}
              >
                {header.value}
              </TableSortLabel>
            </TableCell>  
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map(item => (
          <TableRow key={item.objectID}>
            <TableCell>{item.author}</TableCell>
            <TableCell>
            <Link underline="none" href={item.url} target="_blank" rel="noreferrer">
              {item.title}
            </Link>
            </TableCell>
            <TableCell>{item.num_comments}</TableCell>
            <TableCell>{item.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <SearchPagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
  </StyledSearchResults>
);

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortOrder: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default SearchResults;