import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { Grommet } from 'grommet';
import type { AppProps } from 'next/app';

import client from '../app/apollo-client';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme} full>
        <GlobalStyles />
        <Component {...pageProps} />
      </Grommet>
    </ApolloProvider>
  );
}

export default MyApp;
