import styled from 'styled-components';

export default styled.article`
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin: 1rem;

  > * {
    align-self: center;
    display: flex;
    padding: 0.5rem;
    width: 100%;
  }
`;
