import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';

import { initializeApollo } from '../features/shared/gql/apollo-client';
import {
  publicProfileQueryGql,
  PublicProfileQueryData,
  PublicProfileQueryVars,
} from '../features/user/gql/public-profile.query';
import Head from 'next/head';

import { PublicProfilePayload } from '../features/user/gql/public-profile.payload';
import Microsite from '../features/microsite/Microsite';

interface Props {
  data: PublicProfilePayload;
}

const MicrositePage: NextPage<Props> = ({ data }) => {
  const name = data.displayName ?? `${data.username}`;

  return (
    <>
      <Head>
        <title>{name} | Athena</title>
      </Head>
      <Microsite data={data} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const client = initializeApollo({});

  const result = await client.query<
    PublicProfileQueryData,
    PublicProfileQueryVars
  >({
    query: publicProfileQueryGql,
    variables: { username: context.params?.username as string },
  });

  const props = {
    params: context.params,
    data: result.data.publicProfile,
  };

  return { props };
};

export default MicrositePage;
