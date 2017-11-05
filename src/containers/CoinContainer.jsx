import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import Coin from 'components/@atoms/coin';

import CoinImage from 'components/@atoms/coinImage';
import Container from 'components/@molecules/CoinContainer';
import ReturnedHtml from 'components/@atoms/returnedHtml';
import Title from 'components/@atoms/title';

@inject('store')
@observer
class CoinContainer extends Component {
  render() {
    console.log('SELECTED COIN: ====', this.props.store.selectedCoin);
    const { store: { selectedCoin: coin } } = this.props;
    return (
      <Container>
        {coin ? (
          [
            <Title key={0}>{coin.FullName}</Title>,
            <Coin key={1}>
              <CoinImage src={coin.ImageUrl} />
            </Coin>,
            <p key={2}>US Dollars: {coin.price['USD'] || 0}</p>,
            <p key={3}>Euros: {coin.price['EURO'] || 0}</p>,
            <p key={4}>Bit Coin Value: {coin.price['BTC'] || 0}</p>,
            <p>Total Coin Supply: {coin.snapshot.General.TotalCoinSupply}</p>,
            // FIXME: This is a security vulnerability
            <ReturnedHtml
              key={5}
              dangerouslySetInnerHTML={{
                __html: coin.snapshot.General.Description,
              }}
            />,
          ]
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    );
  }
}

export default CoinContainer;
