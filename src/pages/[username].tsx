import React from 'react';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import apolloClient from '../apollo-client';
import {
  publicProfileQueryGql,
  PublicProfileQueryData,
  PublicProfileQueryVars,
} from '../features/user/gql/public-profile.query';
import { PublicProfilePayload } from '../features/user/gql/public-profile.payload';
import Head from 'next/head';
import { Avatar, Box, Button, Heading, Main, Text } from 'grommet';

interface Props {
  data: PublicProfilePayload;
}

const Microsite: NextPage<Props> = ({ data }) => {
  const name = data.displayName ?? `${data.username}`;

  return (
    <>
      <Head>
        <title>{name} | Athena</title>
      </Head>
      <Main background="brand" fill>
        <Box
          direction="column"
          align="center"
          justify="center"
          pad="large"
          gap="medium"
        >
          <Avatar src="/no-profile-picture.png" size="xlarge" />

          <Box direction="column" align="center" gap="xxsmall">
            <Heading level="3" size="small">
              {name}
            </Heading>
            <Text size="small">{data.bio}</Text>
          </Box>

          <Box gap="medium" width="medium">
            {data.links.map(link => (
              <Button
                primary
                key={link.id}
                href={`//${link.url}`}
                label={link.title}
                target="_blank"
                fill="horizontal"
                justify="center"
                style={{ textAlign: 'center' }}
              />
            ))}
          </Box>
        </Box>
      </Main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const result = await apolloClient.query<
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Microsite;
