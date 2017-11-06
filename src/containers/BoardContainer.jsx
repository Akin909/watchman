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
  error: string,
};

type Props = {
  store: {
    fetchCoins: () => void,
    fetchCoinDetail: (coin: Coin) => void,
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
    error: '',
  };

  onChangePage = (pageOfItems: any[]) => {
    // update state with new page of items
    //Test
    this.setState({ pageOfItems });
  };

  async componentDidMount() {
    await this.props.store.fetchCoins();
  }

  @action
  onClick = (coin: Coin) => async () => {
    try {
      await this.props.store.fetchCoinDetail(coin);
      this.props.history.push(`/coin/${coin.Symbol}`);
    } catch (e) {
      console.warn(e);
      this.setState({ error: e.message });
    }
  };

  render() {
    const { pageOfItems, baseImgUrl, error } = this.state;
    console.log('this.props.store: ', this.props.store);
    const { data: { coins } } = this.props.store;
    console.log('coins: ', coins);
    return error ? (
      <Title>{error}</Title>
    ) : (
      [
        <Board key={0}>
          {pageOfItems && pageOfItems.length ? (
            pageOfItems.map((coin: Coin, index) => {
              return (
                <InformationItem
                  index={index}
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
          {coins.length > 0 && (
            <Pagination
              onClick={this.onClick}
              baseImgUrl={baseImgUrl}
              data={coins}
              onChangePage={this.onChangePage}
            />
          )}
        </Footer>,
      ]
    );
  }
}
