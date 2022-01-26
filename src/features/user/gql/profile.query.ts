import { gql } from '@apollo/client';

import { User } from './user.types';

export type ProfileQueryPayload = { profile: User };

export const profileQueryGql = gql`
  query Profile {
    profile {
      id
      email
      username
    }
  }
`;
