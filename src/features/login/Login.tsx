import { useQuery } from '@apollo/client';
import React from 'react';
import { Card, CardBody, CardHeader, Heading, Main } from 'grommet';

import LoginForm from './LoginForm';
import { LoginBodyStyle } from './Login.styles';
import { useRouter } from 'next/router';
import { profileQueryGql } from '../user/gql/profile.query';
import type { ProfileQueryPayload } from '../user/gql/profile.query';

const Login: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } =
    useQuery<ProfileQueryPayload>(profileQueryGql);

  React.useEffect(() => {
    if (loading) return;
    if (error) return;

    if (data?.profile?.id) {
      router.push('/app');
    }
  }, [data, error, loading]);

  if (loading) return null;

  return (
    <>
      <LoginBodyStyle />
      <Main pad="large" align="center" fill>
        <Card
          pad="large"
          width="large"
          background="light-1"
          gap="medium"
          round
          elevation={undefined}
        >
          <CardHeader justify="center">
            <Heading level={3}>Sign in to your account</Heading>
          </CardHeader>
          <CardBody justify="center" gap="small">
            <LoginForm />
          </CardBody>
        </Card>
      </Main>
    </>
  );
};

export default Login;
