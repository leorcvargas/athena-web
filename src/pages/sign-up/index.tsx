import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { SignUp } from '../../features/signup';

const SignUpPage: NextPage = () => (
  <>
    <Head>
      <title>Athena - Sign up</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SignUp />
  </>
);

export default SignUpPage;
