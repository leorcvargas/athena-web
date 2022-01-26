import React from 'react';
import { Card, CardBody, CardHeader, Heading, Main } from 'grommet';

import LoginForm from './LoginForm';
import { LoginBodyStyle } from './Login.styles';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserProfile, selectUser } from '../user/userSlicer';

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(selectUser);

  React.useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  React.useEffect(() => {
    if (profile.pending || profile.error) {
      return;
    }

    if (!profile.pending && profile.data.id) {
      router.push('/app');
    }
  }, [profile.data, profile.error, profile.pending]);

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
