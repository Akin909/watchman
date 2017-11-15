import React from 'react';

import AppContainer from 'components/@atoms/container';
import BoardContainer from 'containers/BoardContainer';
import Nav from 'components/@molecules/nav';
import Title from 'components/@atoms/title';

const Home = props => (
  <AppContainer>
    <Nav>
      <Title>Watchman</Title>
    </Nav>
    <BoardContainer {...props} />
  </AppContainer>
);

export default Home;
