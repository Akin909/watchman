import styled from 'styled-components';

export default styled.li`
  align-items: center;
  border-right: 0.08rem solid black;
  display: flex;
  height: 1.2rem;
  justify-content: center;
  margin: 0;
  min-width: 2rem;
  padding-right: 0.5rem;

  &:last-child {
    border-right: none;
  }
`;
