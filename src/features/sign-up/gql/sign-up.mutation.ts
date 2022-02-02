import { gql } from '@apollo/client';

import { SignUpInput } from './sign-up.input';

export type SignUpMutationVars = {
  input: SignUpInput;
};

export const signUpMutationGql = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        id
        username
        email
        password
      }
    }
  }
`;
