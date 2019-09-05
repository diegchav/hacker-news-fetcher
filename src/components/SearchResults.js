import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import StyledSearchResults from './styles/StyledSearchResults';

const SearchResults = ({ results }) => (
  <StyledSearchResults>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Author</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Num of comments</TableCell>
          <TableCell>Points</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map(item => (
          <TableRow key={item.objectID}>
            <TableCell>{item.author}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.num_comments}</TableCell>
            <TableCell>{item.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </StyledSearchResults>
);

SearchResults.propTypes = {
  results: PropTypes.array.isRequired
};

export default SearchResults;