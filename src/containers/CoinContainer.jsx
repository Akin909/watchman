import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import Coin from 'components/@atoms/coin';

import CoinImage from '../components/@atoms/coinImage';
import Container from '../components/@molecules/CoinContainer';

@inject('store')
@observer
class CoinContainer extends Component {
  render() {
    console.log('this.props: ', this.props.store.selectedCoin);
    const { store: { selectedCoin: coin } } = this.props;
    return (
      <Container>
        {coin ? (
          <Coin>
            <CoinImage src={coin.ImageUrl} />
            <p>Name: {coin.FullName}</p>
            <p>US Dollars: {coin.price['USD'] || 0}</p>
            <p>Euros: {coin.price['EURO'] || 0}</p>
            <p>Bit Coin Value: {coin.price['BTC'] || 0}</p>
          </Coin>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    );
  }
}

export default CoinContainer;
