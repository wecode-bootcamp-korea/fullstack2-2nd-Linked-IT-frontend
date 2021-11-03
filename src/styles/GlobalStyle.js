import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  :root {
    background-color: ${({ theme }) => theme.colors.bgcBeige};
  }
`;

export default GlobalStyle;
