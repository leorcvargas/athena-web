import { gql } from '@apollo/client';

import { User } from '../../user/gql/user.types';

export type LoginInput = {
  input: {
    username: string;
    password: string;
  };
};

export interface LoginPayload {
  login: {
    user: User;
    accessToken: string;
  };
}

export const loginMutationGql = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        username
        email
      }
      accessToken
    }
  }
`;
