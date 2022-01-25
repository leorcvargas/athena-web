import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { Login } from '../../features/login';

const LoginPage: NextPage = () => (
  <>
    <Head>
      <title>Athena - Sign in</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Login />
  </>
);

export default LoginPage;
