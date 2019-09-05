import React from 'react';
import PropTypes from 'prop-types';

import StyledSearchResults from './styles/StyledSearchResults';

const SearchResults = ({ results }) => (
  <StyledSearchResults>
    <thead>
      <tr>
        <th>Author</th>
        <th>Title</th>
        <th>Num of comments</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      {results.map(item => (
        <tr key={item.objectID}>
        <td>{item.author}</td>
        <td>{item.title}</td>
        <td>{item.num_comments}</td>
        <td>{item.points}</td>
        </tr>
      ))}
    </tbody>
  </StyledSearchResults>
);

SearchResults.propTypes = {
  results: PropTypes.array.isRequired
};

export default SearchResults;