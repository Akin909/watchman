import { action, observable } from 'mobx';
import { asyncAction } from 'mobx-utils';

import type { Coin } from '../containers/BoardContainer';

const cors = `https://cors-anywhere.herokuapp.com`;
const baseUrl = `https://www.cryptocompare.com/api`;

export default class State {
  @observable selectedCoin = {};
  @observable data = { coins: [] };
  @observable fetchState = 'pending';

  @asyncAction
    *fetchCoins(){
    try {
      const coinListUrl = `${cors}/${baseUrl}/data/coinlist/`;
      const data = yield fetch(coinListUrl);
      const res = yield data.json();
      // after await, modifying state again, needs an actions:
      this.fetchState = 'done';
      this.data = {
        ...this.data,
        coins: Object.values(res.Data),
        baseImgUrl: res.BaseImageUrl,
      };
      console.log('this.coins: ', this.coins);
    } catch (e) {
      console.warn('Error: ', e);
    }
  }

  @asyncAction
  *fetchCoinDetail(coin, baseImgUrl){
    this.coins = [];
    this.fetchState = 'pending';
    const detailUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin.Symbol}&tsyms=BTC,USD,EUR`;
    const snapshotUrl = `${cors}/${baseUrl}/data/coinsnapshotfullbyid/?id=${coin.Id} `;
    const res = yield fetch(detailUrl);
    const snapshotRes = yield fetch(snapshotUrl);
    const { Data: snapshot } = yield snapshotRes.json();
    const data = yield res.json();
    this.selectedCoin = {
      ...coin,
      snapshot,
      price: data[coin.Symbol],
      ImageUrl: `${baseImgUrl}${coin.ImageUrl}`,
    };
  }

  @action
  selectCoin(coin: Coin) {
    this.selectedCoin = coin;
  }
}
