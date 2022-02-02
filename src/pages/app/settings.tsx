import React from 'react';
import Head from 'next/head';

import Layout from '../../components/Layout';

const SettingsPage = () => (
  <>
    <Head>
      <title>Athena - Links</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>Settings page</div>
  </>
);

SettingsPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default SettingsPage;
