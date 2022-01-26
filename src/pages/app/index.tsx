import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';

const AppPage: NextPage = () => (
  <Layout>
    <Head>
      <title>Athena - Links</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>App page</div>
  </Layout>
);

export default AppPage;
