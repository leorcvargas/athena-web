import { gql } from '@apollo/client';

import { UserLinkKindEnum } from './user-link.types';

export interface UpdateUserLinkInput {
  input: {
    id: string;
    title?: string;
    url?: string;
    kind?: UserLinkKindEnum;
  };
}

export const updateUserLinkMutationGql = gql`
  mutation update($input: UpdateUserLinkInput!) {
    updateUserLink(input: $input) {
      id
    }
  }
`;
