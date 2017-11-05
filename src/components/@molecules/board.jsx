import styled from 'styled-components';

const Board = styled.div`
  padding: 1rem;
  background-color: #757575;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.2rem;
  justify-items: center;
`;

export default Board;
