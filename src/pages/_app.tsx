import React from 'react';
import { Grommet } from 'grommet';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../store';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Grommet theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </Grommet>
    </Provider>
  );
}

export default MyApp;
