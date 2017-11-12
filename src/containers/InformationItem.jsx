// @flow
import React, { Component } from 'react';

import Button from 'components/@atoms/button';
import CoinImage from 'components/@atoms/coinImage';
import CoinInfo from 'components/@atoms/coinInfo';
import Header from 'components/@atoms/header';
import Item from 'components/@atoms/item';
import type { Coin } from './BoardContainer';

type Props = {
  baseImgUrl: string,
  coin: Coin,
  onClick: (coin: Coin) => void,
  key: string,
  index: number,
};

class InformationItem extends Component<Props> {
  render() {
    const { coin, baseImgUrl, onClick } = this.props;
    return (
      <Item index={this.props.index}>
        <Header>{coin.FullName}</Header>
        <CoinInfo>
          <CoinImage
            src={`${baseImgUrl}${coin.ImageUrl}`}
            alt={`${coin.FullName}`}
          />
          <span>Algorithm: {coin.Algorithm}</span>
          <span>Pre-mined value: {coin.PreMinedValue}</span>
          <span>Proof type: {coin.ProofType}</span>
          <Button onClick={onClick(coin)}>More</Button>
        </CoinInfo>
      </Item>
    );
  }
}

export default InformationItem;
