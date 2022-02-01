import { gql } from '@apollo/client';

import { UserLinkInput } from './user-link.input';

export interface CreateUserLinkVars {
  input: UserLinkInput;
}

export const createUserLinkMutationGql = gql`
  mutation create($input: UserLinkInput!) {
    createUserLink(input: $input) {
      id
    }
  }
`;
