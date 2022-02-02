import { gql } from '@apollo/client';

import { UserLink } from './user-link.types';

export interface UserLinksQueryResponse {
  userLinks: UserLink[];
}

export const userLinksQuery = gql`
  query {
    userLinks {
      id
      url
      title
      display
      kind {
        value
      }
    }
  }
`;
