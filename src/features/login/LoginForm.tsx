import { ApolloError, useMutation } from '@apollo/client';
import React from 'react';
import {
  Anchor,
  Box,
  Button,
  Form,
  FormExtendedEvent,
  FormField,
  TextInput,
} from 'grommet';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { storeAccessToken } from '../../services/auth';
import { loginMutationGql } from './gql/login.mutation';
import type { LoginInput, LoginPayload } from './gql/login.mutation';

interface LoginFormValue {
  username: string;
  password: string;
}

const initialValue: LoginFormValue = {
  username: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [loginMutation, { loading, reset }] = useMutation<
    LoginPayload,
    LoginInput
  >(loginMutationGql);
  const router = useRouter();
  const [value, setValue] = React.useState<LoginFormValue>(initialValue);
  const [errors, setErrors] = React.useState(initialValue);

  const onSubmit = async (e: FormExtendedEvent<LoginFormValue, Element>) => {
    try {
      const { username, password } = e.value;
      const input = { username, password };

      const { data } = await loginMutation({ variables: { input } });

      storeAccessToken(data?.login?.accessToken ?? '');
      router.push('/app');
    } catch (error) {
      const { graphQLErrors } = error as ApolloError;
      const [e] = graphQLErrors;

      if (e.extensions.code === 'UNAUTHENTICATED') {
        setErrors({
          ...initialValue,
          password: 'Incorrect username or password',
        });
        return;
      }

      if (e.extensions.code === '404') {
        setErrors({
          ...initialValue,
          username: 'User not found',
        });
        return;
      }

      setErrors({ ...initialValue, password: 'Unexpected error from server.' });
    } finally {
      reset();
    }
  };

  return (
    <>
      <Form
        value={value}
        onChange={nextValue => setValue(nextValue)}
        onReset={() => setValue(initialValue)}
        onSubmit={onSubmit}
        messages={{ required: 'Required' }}
      >
        <FormField
          name="username"
          htmlFor="text-input-username"
          label="Username"
          required={{ indicator: true }}
          validate={[
            {
              message: 'Invalid character detected',
              regexp: /^[a-zA-Z0-9_.-]*$/,
            },
            {
              message: 'Username length must be between 3 and 20 characters',
              regexp: /^[a-zA-Z0-9_.-]{3,20}$/,
            },
          ]}
          error={errors.username}
        >
          <TextInput id="text-input-username" name="username" type="username" />
        </FormField>

        <FormField
          name="password"
          htmlFor="text-input-password"
          label="Password"
          type="password"
          required={{ indicator: true }}
          validate={[
            {
              message: 'Password minimum length is 8 characters',
              regexp: /^.{8,}$/,
            },
          ]}
          error={errors.password}
        >
          <TextInput id="text-input-password" name="password" type="password" />
        </FormField>

        <Box
          direction="column"
          gap="medium"
          align="center"
          margin={{ top: 'medium' }}
          fill="horizontal"
        >
          <Button
            type="submit"
            primary
            label="Sign in"
            fill
            disabled={loading}
          />
          <Link href="/sign-up">
            <Anchor label="Create an account" />
          </Link>
        </Box>
      </Form>
    </>
  );
};

export default LoginForm;
