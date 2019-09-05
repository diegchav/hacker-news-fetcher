import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Link from '@material-ui/core/Link';

import StyledSearchResults from './styles/StyledSearchResults';

import {
  SORT_AUTHOR,
  SORT_TITLE,
  SORT_NUM_COMMENTS,
  SORT_POINTS
} from '../constants';

const SearchResults = ({ results, onSort, sortKey, sortOrder }) => (
  <StyledSearchResults>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell
            sortDirection={sortOrder[SORT_AUTHOR] ? sortOrder[SORT_AUTHOR] : false}
          >
            <TableSortLabel
              active={sortKey === SORT_AUTHOR}
              direction={sortOrder[SORT_AUTHOR] ? sortOrder[SORT_AUTHOR] : 'asc'}
              onClick={() => onSort(SORT_AUTHOR)}
            >
              Author
            </TableSortLabel>
          </TableCell>
          <TableCell
            sortDirection={sortOrder[SORT_TITLE] ? sortOrder[SORT_TITLE] : false}
          >
            <TableSortLabel
              active={sortKey === SORT_TITLE}
              direction={sortOrder[SORT_TITLE] ? sortOrder[SORT_TITLE] : 'asc'}
              onClick={() => onSort(SORT_TITLE)}
            >
              Title
            </TableSortLabel>
          </TableCell>
          <TableCell
            sortDirection={sortOrder[SORT_NUM_COMMENTS] ? sortOrder[SORT_NUM_COMMENTS] : false}
          >
            <TableSortLabel
              active={sortKey === SORT_NUM_COMMENTS}
              direction={sortOrder[SORT_NUM_COMMENTS] ? sortOrder[SORT_NUM_COMMENTS] : 'asc'}
              onClick={() => onSort(SORT_NUM_COMMENTS)}
            >
              Num of comments
            </TableSortLabel>
          </TableCell>
          <TableCell
            sortDirection={sortOrder[SORT_POINTS] ? sortOrder[SORT_POINTS] : false}
          >
            <TableSortLabel
              active={sortKey === SORT_POINTS}
              direction={sortOrder[SORT_POINTS] ? sortOrder[SORT_POINTS] : 'asc'}
              onClick={() => onSort(SORT_POINTS)}
            >
              Points
            </TableSortLabel>
          </TableCell>
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
  </StyledSearchResults>
);

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortOrder: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default SearchResults;