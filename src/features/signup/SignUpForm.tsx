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
import { AxiosError } from 'axios';

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

  const onSubmit = async (e: FormExtendedEvent<SignUpFormValue, Element>) => {
    setSubmitting(true);
    const { email, username, password } = e.value;

    try {
      console.log({ email, username, password });
      throw new Error('Not implemented');
      router.push('/login');
    } catch (error) {
      const { response } = error as AxiosError;

      if (response?.status === 409) {
        setError('The provided email is already in use.');
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
