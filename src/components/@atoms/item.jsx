// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

const transitionStyles = {
  entering: '0',
  entered: '1',
};

const Item = styled.article`
  align-items: center;
  border-radius: 0.3rem;
  box-shadow: -0.05rem 0.07rem 0.018em rgba(0, 0, 0, 0.5);
  background-color: #131e4c;
  display: flex;
  flex-flow: column;
  min-height: 30rem;
  overflow-x: hidden;
  width: 25rem;
  transition: opacity ${props => props.duration}ms ease-in-out;
  opacity: ${props => transitionStyles[props.state]};
  font-size: 1.8rem;
`;

export default (props: any) => (
  <Transition appear in={true} timeout={300}>
    {state => (
      <Item state={state} duration={props.index * 500}>
        {props.children}
      </Item>
    )}
  </Transition>
);
