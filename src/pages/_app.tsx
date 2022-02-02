import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { Grommet } from 'grommet';
import type { AppProps } from 'next/app';

import client from '../apollo-client';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme} full>
        <GlobalStyles />
        {getLayout(<Component {...pageProps} />)}
      </Grommet>
    </ApolloProvider>
  );
}

export default MyApp;
