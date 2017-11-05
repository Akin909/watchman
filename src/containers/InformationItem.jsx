// @flow
import React, { Component } from 'react';

import CoinImage from 'components/@atoms/coinImage';
import CoinInfo from 'components/@atoms/coinInfo';
import Header from 'components/@atoms/header';
import Item from 'components/@atoms/item';
import Button from 'components/@atoms/button';

type Props = {
  baseImgUrl: string,
  coin: {
    CoinName: string,
    Algorithm: string,
    CoinName: string,
    FullName: string,
    FullyPremined: string,
    Id: string,
    ImageUrl: string,
    Name: string,
    PreMinedValue: string,
    ProofType: string,
    SortOrder: string,
    Sponsored: string,
    Symbol: string,
    TotalCoinSupply: string,
    TotalCoinsFreeFloat: string,
    Url: string,
  },
  onClick: (symbol: string) => () => void,
};

class InformationItem extends Component<Props> {
  render() {
    const { coin, baseImgUrl, onClick } = this.props;
    return (
      <Item>
        <Header>{coin.FullName}</Header>
        <CoinInfo>
          <CoinImage
            src={`${baseImgUrl}${coin.ImageUrl}`}
            alt={`${coin.FullName}`}
          />
          <span>Algorithm: {coin.Algorithm}</span>
          <span>Pre-mined value: {coin.PreMinedValue}</span>
          <span>Proof type: {coin.ProofType}</span>
          <Button onClick={onClick(coin.Symbol)}>More</Button>
        </CoinInfo>
      </Item>
    );
  }
}

export default InformationItem;
