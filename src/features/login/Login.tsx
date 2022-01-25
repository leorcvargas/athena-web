import React from 'react';
import { Card, CardBody, CardHeader, Heading, Main } from 'grommet';

import LoginForm from './LoginForm';
import { LoginBodyStyle } from './Login.styles';

const Login: React.FC = () => {
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
