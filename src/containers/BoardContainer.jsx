// @flow
import React, { Component } from 'react';

import Board from 'components/@molecules/board';
import Title from 'components/@atoms/title';

import InformationItem from './InformationItem';

type State = {
  data: any[],
  baseImgUrl: string,
  pageLimit: number,
};

export default class BoardContainer extends Component<{}, State> {
  state = {
    data: [],
    baseImgUrl: '',
    pageLimit: 30,
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

  onClick = (symbol: string) => async () => {
    try {
      const detailUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsym=${symbol}&tsyms=BTC,USD,EUR`;
      const res = await fetch(detailUrl);
      const data = await res.json();
      console.log('data: ', data);
    } catch (e) {
      console.warn(e);
    }
  };

  render() {
    const { data, baseImgUrl, pageLimit } = this.state;
    return (
      <Board>
        {data.length ? (
          data.slice(0, pageLimit).map(coin => {
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
      </Board>
    );
  }
}
