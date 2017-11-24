import React from 'react';
import styled from 'styled-components';

import Article from 'components/@atoms/article';
import Coin from 'components/@atoms/coin';
import CoinImage from 'components/@atoms/coinImage';
import Paragraph from 'components/@atoms/paragraph';
import ReturnedHtml from 'components/@atoms/returnedHtml';
import Title from 'components/@atoms/title';

const PageContainer = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
`;

export default function CoinData({ coin }) {
  return coin && coin.price ? (
    <PageContainer>
      <Title key={0}>{coin.FullName}</Title>
      <Coin width={1} key={1}>
        <CoinImage src={coin.ImageUrl} />
      </Coin>
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
      </Article>
    </PageContainer>
  ) : (
    <Title>
      Failed to fetch coin info. <br />Sorry!
    </Title>
  );
}
