import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  MyContextProvider,
  ModeContext,
  ModeDispatchContext,
  UserContext,
  UserDispatchContext,
} from '../../contexts/MyContextProvider';

export default function MyApp() {
  return (
    <MyContextProvider>
      <MyComponent />
    </MyContextProvider>
  );
}

const MODES = {
  light: {
    backgroundColor: '#EEEEEE',
    color: 'black',
    toggleColor: '#333333',
  },
  dark: {
    backgroundColor: '#333333',
    color: 'white',
    toggleColor: 'orange',
  },
};

function MyComponent() {
  const mode = useContext(ModeContext);
  const user = useContext(UserContext);
  const modeDispatch = useContext(ModeDispatchContext);
  const userDispatch = useContext(UserDispatchContext);

  return (
    <Container
      backgroundColor={MODES[mode].backgroundColor}
      color={MODES[mode].color}
    >
      <ModeToggler
        toggleColor={MODES[mode].toggleColor}
        onClick={() => modeDispatch({ type: 'TOGGLE' })}
      />
      <Title
        onClick={() =>
          userDispatch({ type: 'UPDATE_NAME', newUserName: 'Oh Hyejin' })
        }
      >
        {`안녕하세요, ${user.name}님!`}
      </Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;

  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  font-size: 16px;
`;

const ModeToggler = styled.div`
  width: 32px;
  height: 32px;
  margin: 200px 0 32px;
  border-radius: 50%;

  background-color: ${props => props.toggleColor};
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  cursor: pointer;
`;
