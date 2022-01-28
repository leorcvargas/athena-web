import { gql } from '@apollo/client';

import { UserLinkKindEnum } from './user-link.types';

export interface CreateUserLinkInput {
  input: {
    title: string;
    url: string;
    kind: UserLinkKindEnum;
  };
}

export const createUserLinkMutationGql = gql`
  mutation create($input: CreateUserLinkInput!) {
    createUserLink(input: $input) {
      id
    }
  }
`;
