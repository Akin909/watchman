import { width } from 'styled-system';
import styled from 'styled-components';

const Coin = styled.section`
  ${width};
  height: 20rem;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Coin;
