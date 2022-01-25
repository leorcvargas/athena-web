import React from 'react';
import { Anchor, Box, Button, Form, FormField, TextInput } from 'grommet';
import Link from 'next/link';

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
  const [value, setValue] = React.useState<SignUpFormValue>(initialValue);

  return (
    <Form
      value={value}
      onChange={nextValue => setValue(nextValue)}
      onReset={() => setValue(initialValue)}
      onSubmit={({ value }) => console.log(value)}
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
        <Button type="submit" primary label="Create account" fill />
        <Link href="/login">
          <Anchor label="Sign in" />
        </Link>
      </Box>
    </Form>
  );
};

export default SignUpForm;
