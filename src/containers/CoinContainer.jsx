import React, { Component } from 'react';

import Coin from 'components/@atoms/coin';
import Container from '../components/@molecules/CoinContainer';

class CoinContainer extends Component {
  render() {
    return (
      <Container>
        <Coin />
      </Container>
    );
  }
}

export default CoinContainer;
