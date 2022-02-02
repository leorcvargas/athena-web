import { gql } from '@apollo/client';

export const logoutMutationGql = gql`
  mutation {
    logout {
      success
    }
  }
`;
