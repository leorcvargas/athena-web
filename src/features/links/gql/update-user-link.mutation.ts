import { gql } from '@apollo/client';

import { UserLinkInput } from './user-link.input';

export interface UpdateUserLinkVars {
  id: number;
  input: UserLinkInput;
}

export const updateUserLinkMutationGql = gql`
  mutation update($id: Int!, $input: UserLinkInput!) {
    updateUserLink(id: $id, input: $input) {
      id
      title
      url
      display
    }
  }
`;
