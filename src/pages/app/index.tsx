import React from 'react';
import Head from 'next/head';

import Layout from '../../components/Layout';
import { Links } from '../../features/links';

const AppPage = () => (
  <>
    <Head>
      <title>Athena - Links</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Links />
  </>
);

AppPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AppPage;
