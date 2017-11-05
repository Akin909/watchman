// @flow
import React, { Component } from 'react';

import Board from 'components/@molecules/board';

import InformationItem from './InformationItem';
import Pagination from './pagination';
import Title from '../components/@atoms/title';

type State = {
  data: any[],
  baseImgUrl: string,
  pageOfItems: number[],
};

export default class BoardContainer extends Component<{}, State> {
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
    const { data, pageOfItems, baseImgUrl } = this.state;
    return [
      <Board>
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
      <div>
        {data.length > 0 && (
          <Pagination
            onClick={this.onClick}
            baseImgUrl={baseImgUrl}
            data={data}
            onChangePage={this.onChangePage}
          />
        )}
      </div>,
    ];
  }
}
