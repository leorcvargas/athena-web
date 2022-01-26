import React from 'react';
import { Card, CardBody, CardHeader, Heading, Image, Main } from 'grommet';

import SignUpForm from './SignUpForm';
import { ImageBox } from './SignUp.styles';

const SignUp: React.FC = () => {
  return (
    <Main direction="row">
      <ImageBox fill>
        <Image fit="cover" src="/sign-up-bg.jpeg" />
      </ImageBox>
      <Card pad="large" width="xxlarge" round={undefined}>
        <CardHeader justify="center" align="center">
          <Heading level={3}>Create your account for free</Heading>
        </CardHeader>
        <CardBody justify="center" pad="small">
          <SignUpForm />
        </CardBody>
      </Card>
    </Main>
  );
};

export default SignUp;
