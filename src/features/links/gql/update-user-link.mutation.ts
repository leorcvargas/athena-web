import { gql } from '@apollo/client';

import { UpdateUserLinkInput } from './update-user-link.input';

export interface UpdateUserLinkVars {
  id: number;
  input: UpdateUserLinkInput;
}

export const updateUserLinkMutationGql = gql`
  mutation update($id: Int!, $input: UpdateUserLinkInput!) {
    updateUserLink(id: $id, input: $input) {
      id
      title
      url
      display
    }
  }
`;
