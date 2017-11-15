// @flow
import 'components/global.css.js';

import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import React, { Component } from 'react';

import AppState from './mobx/state';
import CoinContainer from './containers/CoinContainer';
import Home from './containers/Home';
import Title from './components/@atoms/title';

const store = new AppState();

type State = {
  error: string,
};

class App extends Component<{}, State> {
  state = {
    error: '',
  };

  componentDidCatch(e: Error) {
    console.warn(e);
    this.setState({ error: e.message });
  }
  render() {
    return !this.state.error ? (
      <Router>
        <Provider store={store}>
          <div>
            <DevTools />
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route path="/coin/:name" component={CoinContainer} />
          </div>
        </Provider>
      </Router>
    ) : (
      <Title>Everything That could break is broken!!</Title>
    );
  }
}

export default App;
