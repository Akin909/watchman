import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import Container from 'components/@molecules/CoinContainer';
import CoinData from 'components/@molecules/coinData';

@inject('store')
@observer
class CoinContainer extends Component {
  render() {
    const { store: { selectedCoin: coin, fetchState } } = this.props;
    return (
      <Container>
        {fetchState === 'done' && coin ? (
          <CoinData coin={coin} />
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    );
  }
}

export default CoinContainer;
