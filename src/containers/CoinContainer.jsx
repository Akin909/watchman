import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import Container from 'components/@molecules/CoinContainer';
import CoinData from 'components/@molecules/coinData';

@inject('store')
@observer
class CoinContainer extends Component {
  render() {
    // console.log('SELECTED COIN: ====', this.props.store.selectedCoin);
    const { store: { selectedCoin: coin } } = this.props;
    return (
      <Container>
        {coin ? <CoinData coin={coin} /> : <div>Loading...</div>}
      </Container>
    );
  }
}

export default CoinContainer;
