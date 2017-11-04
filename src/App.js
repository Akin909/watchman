// @flow
import React, { Component } from 'react';

import AppContainer from 'components/@atoms/container';
import BoardContainer from 'containers/BoardContainer';
import Title from 'components/@atoms/title';

type State = {
  error: string,
};

class App extends Component<State> {
  state = {
    error: '',
  };

  componentDidCatch(e: Error) {
    console.warn(e);
    this.setState({ error: e.message });
  }
  render() {
    return (
      <AppContainer>
        <Title>Watchman</Title>
        <BoardContainer />
      </AppContainer>
    );
  }
}

export default App;
