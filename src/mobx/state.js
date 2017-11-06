import { action, observable } from 'mobx';

import type { Coin } from '../containers/BoardContainer';

const cors = `https://cors-anywhere.herokuapp.com`;
const baseUrl = `https://www.cryptocompare.com/api`;

export default class State {
  @observable selectedCoin = {};
  @observable data = { coins: [] };
  @observable fetchState = 'pending';

  @action
  fetchCoins() {
    const coinListUrl = `${cors}/${baseUrl}/data/coinlist/`;
    this.data = {};
    this.fetchState = 'pending';
    fetch(coinListUrl)
      .then(data => data.json())
      .then(res => {
        this.data = {
          coins: Object.values(res.Data),
          baseImgUrl: res.BaseImageUrl,
        };
        this.fetchState = 'done';
        console.log('this.coins: ', this.coins);
      })
      .catch(e => {
        console.warn('Error: ', e);
        this.fetchState = 'error';
      });
  }

  @action
  fetchCoinDetail(coin, baseImgUrl) {
    this.coins = [];
    this.fetchState = 'pending';
    const detailUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin.Symbol}&tsyms=BTC,USD,EUR`;
    const snapshotUrl = `${cors}/${baseUrl}/data/coinsnapshotfullbyid/?id=${coin.Id} `;
    const data = fetch(detailUrl).then(res => res.json());
    fetch(snapshotUrl)
      .then(res => res.json())
      .then(sRes => {
        const { Data: snapshot } = sRes;
        this.selectedCoin = {
          ...coin,
          snapshot,
          price: data[coin.Symbol],
          ImageUrl: `${baseImgUrl}${coin.ImageUrl}`,
        };
      });
  }

  @action
  selectCoin(coin: Coin) {
    this.selectedCoin = coin;
  }
}
