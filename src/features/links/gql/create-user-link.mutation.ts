import { gql } from '@apollo/client';

import { CreateUserLinkInput } from './create-user-link.input';

export interface CreateUserLinkVars {
  input: CreateUserLinkInput;
}

export const createUserLinkMutationGql = gql`
  mutation create($input: CreateUserLinkInput!) {
    createUserLink(input: $input) {
      id
    }
  }
`;
