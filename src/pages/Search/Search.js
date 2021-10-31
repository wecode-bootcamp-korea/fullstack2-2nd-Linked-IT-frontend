// import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Search({ location }) {
  return (
    <Container>
      Search:
      {location.state && <h1>{location.state.keyword}</h1>}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: 72px;
  border: 1px solid black;
`;
