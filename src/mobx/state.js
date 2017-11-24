import { action, observable, runInAction, useStrict } from 'mobx';
import type { Coin } from '../containers/BoardContainer';

const cors = `https://cors-anywhere.herokuapp.com`;
const baseUrl = `https://www.cryptocompare.com/api`;

useStrict(true);

export default class State {
  @observable selectedCoin = {};
  @observable data = {};
  @observable fetchState = 'pending';
  coinListUrl = `${cors}/${baseUrl}/data/coinlist/`;

  constructor() {
    this.fetchData(this.coinListUrl);
  }

  @action
  fetchData(endpoint: string) {
    fetch(endpoint)
      .then(initial => initial.json())
      .then(res => {
        runInAction('Fetched coins', () => {
          const coins = Object.values(res.Data);
          this.data.coins = coins;
          this.data.baseImgUrl = res.BaseImageUrl;
          this.fetchState = 'done';
        });
      })
      .catch(e => {
        console.warn('Error: ', e);
        runInAction('Failed to fetch coins', () => {
          this.fetchState = 'failed';
        });
      });
  }

  @action
  fetchCoinPrice(detailUrl) {
    return fetch(detailUrl).then(res => res.json());
  }

  @action
  fetchCoinDetail(coin, baseImgUrl) {
    this.fetchState = 'pending';
    const detailUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin.Symbol}&tsyms=BTC,USD,EUR`;
    this.fetchCoinPrice(detailUrl).then(data => {
      runInAction('Fetch Price', () => {
        this.selectedCoin.price = data[coin.Symbol];
      });
    });

    const snapshotUrl = `${cors}/${baseUrl}/data/coinsnapshotfullbyid/?id=${coin.Id} `;
    fetch(snapshotUrl)
      .then(res => res.json())
      .then(sRes => {
        const { Data: snapshot } = sRes;
        runInAction('Fetch Snapshot', () => {
          this.selectedCoin = {
            ...coin,
            snapshot,
            ImageUrl: `${this.data.baseImgUrl}${coin.ImageUrl}`,
            ...this.selectedCoin,
          };
          this.fetchState = 'done';
        });
      });
  }

  @action
  selectCoin(coin: Coin) {
    this.selectedCoin = coin;
  }
}
