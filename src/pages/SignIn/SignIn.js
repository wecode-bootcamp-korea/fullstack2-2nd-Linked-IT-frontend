import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/*  Practice for Using React Context  */
import MyApp from './MyApp';

export default function SignIn() {
  return (
    <>
      <SignInPageHeader>
        <Link to="/">
          <img alt="LinkedIT Logo" src="/images/common_logo_full.png" />
        </Link>
      </SignInPageHeader>

      {/*  Practice for Using React Context  */}
      <MyApp />
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
