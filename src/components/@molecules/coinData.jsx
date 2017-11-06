import React from 'react';

import Article from '../@atoms/article';
import Coin from '../@atoms/coin';
import CoinImage from '../@atoms/coinImage';
import Paragraph from '../@atoms/paragraph';
import ReturnedHtml from '../@atoms/returnedHtml';
import Title from '../@atoms/title';

export default ({ coin }) => [
  <Title key={0}>{coin.FullName}</Title>,
  <Coin key={1}>
    <CoinImage src={coin.ImageUrl} />
  </Coin>,
  <Article>
    <Paragraph key={2} flexDirection="column">
      US Dollars: {coin.price['USD'] || ''}
    </Paragraph>
    <Paragraph key={3} flexDirection="column">
      Euros: {coin.price['EURO'] || ''}
    </Paragraph>
    <Paragraph key={4} flexDirection="column">
      Bit Coin Value: {coin.price['BTC'] || ''}
    </Paragraph>
    <Paragraph flexDirection="column">
      Total Coin Supply: {coin.snapshot.General.TotalCoinSupply}
    </Paragraph>
    {/* FIXME: This is a security vulnerability */}
    <ReturnedHtml
      key={5}
      dangerouslySetInnerHTML={{
        __html: coin.snapshot.General.Description,
      }}
    />
  </Article>,
];
