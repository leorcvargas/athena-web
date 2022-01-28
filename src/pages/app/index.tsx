import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';
import { Links } from '../../features/links';

const AppPage: NextPage = () => (
  <Layout>
    <Head>
      <title>Athena - Links</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Links />
  </Layout>
);

export default AppPage;
