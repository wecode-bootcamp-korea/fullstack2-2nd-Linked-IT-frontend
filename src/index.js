import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const GlobalStyle = createGlobalStyle`
  ${reset}

	// 전역스타일

`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
