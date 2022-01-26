import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';

const SettingsPage: NextPage = () => (
  <Layout>
    <Head>
      <title>Athena - Links</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>Settings page</div>
  </Layout>
);

export default SettingsPage;
