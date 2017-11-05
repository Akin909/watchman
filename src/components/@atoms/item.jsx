// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

const transitionStyles = {
  entering: '0',
  entered: '1',
};

// #EF9a8a - border
const Item = styled.article`
  align-items: center;
  border-radius: 0.3rem;
  border: 0.1rem solid hsla(220, 7%, 25%, 0.8);
  background-color: hsla(0, 0%, 0%, 0.8);
  display: flex;
  flex-direction: column;
  min-height: 18rem;
  overflow-x: hidden;
  width: 15rem;
  transition: opacity ${props => props.duration}ms ease-in-out;
  opacity: ${props => transitionStyles[props.state]};
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
