import {
  ApolloClient,
  createHttpLink,
  HttpOptions,
  InMemoryCache,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const isServer = typeof window === 'undefined';

type ApolloState = any;

type Props = { [APOLLO_STATE_PROP_NAME]: ApolloState } & { [key: string]: any };

let apolloClient: ApolloClient<ApolloState>;

function createIsomorphLink() {
  const options: HttpOptions = {
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: 'include',
    // headers: {
    //   cookie: req.headers.get('Cookie'),
    // },
  };
  return createHttpLink(options);
}

const createApolloClient = () => {
  const client = new ApolloClient({
    ssrMode: isServer,
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });

  return client;
};

export const initializeApollo = (initialState: any = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (isServer) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (pageProps: Props) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};

export const addApolloState = (
  client: ApolloClient<ApolloState>,
  pageProps: { props: Props }
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};
