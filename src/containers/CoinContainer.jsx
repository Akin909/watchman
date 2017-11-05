import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import Coin from 'components/@atoms/coin';

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
            <p>{coin.FullName}</p>
          </Coin>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    );
  }
}

export default CoinContainer;
