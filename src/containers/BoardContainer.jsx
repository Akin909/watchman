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
    selectCoin: (c: Coin) => void,
  },
  history: (address: string) => void,
};

const cors = `https://cors-anywhere.herokuapp.com`;
const baseUrl = `https://www.cryptocompare.com/api`;

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
    this.setState({ pageOfItems });
  };

  async componentDidMount() {
    const coinListUrl = `${cors}/${baseUrl}/data/coinlist/`;

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
      const snapshotUrl = `${cors}/${baseUrl}/data/coinsnapshotfullbyid/?id=${coin.Id} `;
      const res = await fetch(detailUrl);
      const snapshotRes = await fetch(snapshotUrl);
      const { Data: snapshot } = await snapshotRes.json();
      const data = await res.json();
      this.props.store.selectCoin({
        ...coin,
        snapshot,
        price: data[coin.Symbol],
        ImageUrl: `${this.state.baseImgUrl}${coin.ImageUrl}`,
      });
      this.props.history.push(`/coin/${coin.Symbol}`);
    } catch (e) {
      console.warn(e);
      this.setState({ error: e.message });
    }
  };

  render() {
    const { data, pageOfItems, baseImgUrl, error } = this.state;
    return [
      <Board key={0}>
        {error && <Title>{error}</Title>}
        {pageOfItems && pageOfItems.length ? (
          pageOfItems.map((coin, index) => {
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
