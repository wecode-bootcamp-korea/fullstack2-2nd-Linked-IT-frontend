import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SignIn() {
  return (
    <>
      <SignInPageHeader>
        <Link to="/">
          <img alt="LinkedIT Logo" src="/images/common_logo_full.png" />
        </Link>
      </SignInPageHeader>
    </>
  );
}

const SignInPageHeader = styled.header`
  position: absolute;
  top: 0;

  width: 100%;

  a {
    display: block;
    margin: 2em 0 0 3.5em;

    img {
      width: 7rem;
    }
  }
`;
