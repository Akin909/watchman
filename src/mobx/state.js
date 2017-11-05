import { action, observable } from 'mobx';

import type { Coin } from '../containers/BoardContainer';

export default class State {
  @observable selectedCoin: {};
  @observable coins: [];

  @action
  selectCoin(coin: Coin) {
    this.selectedCoin = coin;
  }
}
