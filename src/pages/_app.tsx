import { Grommet } from 'grommet';
import type { AppProps } from 'next/app';

import GlobalStyles from '../styles/global';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grommet theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Grommet>
  );
}

export default MyApp;
