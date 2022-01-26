import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { Grommet } from 'grommet';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import client from '../app/apollo-client';
import { store } from '../app/store';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Grommet theme={theme} full>
          <GlobalStyles />
          <Component {...pageProps} />
        </Grommet>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
