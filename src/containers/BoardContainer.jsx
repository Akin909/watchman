// @flow
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import Board from 'components/@molecules/board';
import Footer from 'components/@atoms/footer';
import Title from 'components/@atoms/title';

import InformationItem from './InformationItem';
import Pagination from './pagination';

export type Coin = {
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
};

type State = {
  data: any[],
  baseImgUrl: string,
  pageOfItems: Coin[],
};

type Props = {
  store: {
    selectCoin: (c: Coin) => void,
  },
  history: (address: string) => void,
};

@inject('store')
@observer
export default class BoardContainer extends Component<Props, State> {
  state = {
    data: [],
    pageOfItems: [],
    baseImgUrl: '',
  };

  onChangePage = (pageOfItems: any[]) => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  async componentDidMount() {
    const coinListUrl = `https://cors-anywhere.herokuapp.com/https://www.cryptocompare.com/api/data/coinlist/`;

    try {
      const data = await fetch(coinListUrl);
      const res = await data.json();
      this.setState({
        data: Object.values(res.Data),
        baseImgUrl: res.BaseImageUrl,
      });
    } catch (e) {
      console.warn('Error: ', e);
    }
  }

  @action
  onClick = (coin: Coin) => async () => {
    try {
      const detailUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin.Symbol}&tsyms=BTC,USD,EUR`;
      const res = await fetch(detailUrl);
      const data = await res.json();
      console.log('data: ', data);
      this.props.store.selectCoin({ ...coin, price: data });
      this.props.history.push(`/coin/${coin.Symbol}`);
    } catch (e) {
      console.warn(e);
    }
  };

  render() {
    const { data, pageOfItems, baseImgUrl } = this.state;
    console.log('this.props: ', this.props);
    return [
      <Board key={0}>
        {pageOfItems && pageOfItems.length ? (
          pageOfItems.map(coin => {
            return (
              <InformationItem
                onClick={this.onClick}
                baseImgUrl={baseImgUrl}
                key={coin.Id}
                coin={coin}
              />
            );
          })
        ) : (
          <Title>Loading...</Title>
        )}
      </Board>,
      <Footer key={1}>
        {data.length > 0 && (
          <Pagination
            onClick={this.onClick}
            baseImgUrl={baseImgUrl}
            data={data}
            onChangePage={this.onChangePage}
          />
        )}
      </Footer>,
    ];
  }
}
