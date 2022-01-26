import { gql } from '@apollo/client';

import { User } from './user.types';

export type ProfileQueryPayload = { profile: User };

export const profileQueryGql = gql`
  query {
    profile {
      id
      email
      username
    }
  }
`;
