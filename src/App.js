// @flow
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';

import AppContainer from 'components/@atoms/container';
import BoardContainer from 'containers/BoardContainer';
import Title from 'components/@atoms/title';

import AppState from './mobx/state';
import CoinContainer from './containers/CoinContainer';

const store = new AppState();

type State = {
  error: string,
};

const Home = props => (
  <AppContainer>
    <Title>Watchman</Title>
    <BoardContainer {...props} />
  </AppContainer>
);

class App extends Component<{}, State> {
  state = {
    error: '',
  };

  componentDidCatch(e: Error) {
    console.warn(e);
    this.setState({ error: e.message });
  }
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div>
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route path="/coin/:name" component={CoinContainer} />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
