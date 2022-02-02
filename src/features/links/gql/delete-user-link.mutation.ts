import { gql } from '@apollo/client';

export interface DeleteUserLinkVars {
  id: number;
}

export const deleteUserLinkMutationGql = gql`
  mutation delete($id: Int!) {
    deleteUserLink(id: $id) {
      success
    }
  }
`;
