import React from 'react';
import {
  Anchor,
  Box,
  Button,
  Form,
  FormExtendedEvent,
  FormField,
  Notification,
  TextInput,
} from 'grommet';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ApolloError, useMutation } from '@apollo/client';

import { signUpMutationGql, SignUpMutationVars } from './gql/sign-up.mutation';
import { SignUpPayload } from './gql/sign-up.payload';

interface SignUpFormValue {
  email: string;
  username: string;
  password: string;
}

const initialValue: SignUpFormValue = {
  email: '',
  username: '',
  password: '',
};

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = React.useState('');
  const [value, setValue] = React.useState<SignUpFormValue>(initialValue);
  const [submitting, setSubmitting] = React.useState(false);

  const [signUpMutation] = useMutation<SignUpPayload, SignUpMutationVars>(
    signUpMutationGql
  );

  const onSubmit = async (e: FormExtendedEvent<SignUpFormValue, Element>) => {
    setSubmitting(true);
    const { email, username, password } = e.value;

    try {
      await signUpMutation({
        variables: { input: { email, username, password } },
      });

      router.push('/login');
    } catch (error) {
      const { graphQLErrors } = error as ApolloError;
      const [e] = graphQLErrors;

      if (e.extensions.code === 'BAD_USER_INPUT') {
        const res: any = e.extensions.response;
        const [errorMessage] = res.message;
        setError(String(errorMessage));
        return;
      }

      if (e.extensions.code === '409') {
        setError('Email or username already in use.');
        return;
      }

      setError('Unexpected error from server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <Notification
          toast
          title="Error"
          message={error}
          status="critical"
          onClose={() => setError('')}
        />
      )}
      <Form
        value={value}
        onChange={nextValue => setValue(nextValue)}
        onReset={() => setValue(initialValue)}
        onSubmit={onSubmit}
        messages={{ required: 'Required' }}
      >
        <FormField
          name="email"
          htmlFor="text-input-email"
          label="E-mail"
          required={{ indicator: true }}
        >
          <TextInput id="text-input-email" name="email" type="email" />
        </FormField>

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
            label="Create account"
            disabled={submitting}
            fill
          />
          <Link href="/login">
            <Anchor label="Sign in" />
          </Link>
        </Box>
      </Form>
    </>
  );
};

export default SignUpForm;
