import type { Coin } from '../containers/BoardContainer';

import { observable } from 'mobx';

export default class State {
  @observable selectedCoin: {};
  @observable coins: [];

  @action
  selectCoin(coin: Coin) {
    this.selectCoin = coin;
  }
}
