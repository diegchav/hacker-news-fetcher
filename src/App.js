import React from 'react';
import styled from 'styled-components';

import Search from './components/Search';

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
`;

class App extends React.Component {
  state = {
    results: []
  };

  onSearch = (searchTerm) => {
    console.log(searchTerm);
  };

  render() {
    return (
      <StyledApp>
        <Search onSearch={this.onSearch} />
      </StyledApp>
    );
  }
}

export default App;
