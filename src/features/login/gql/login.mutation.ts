import { gql } from '@apollo/client';

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
