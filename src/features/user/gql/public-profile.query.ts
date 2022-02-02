import { gql } from '@apollo/client';
import { PublicProfilePayload } from './public-profile.payload';

export type PublicProfileQueryData = { publicProfile: PublicProfilePayload };
export type PublicProfileQueryVars = { username: string };

export const publicProfileQueryGql = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
      id
      username
      bio
      displayName
      links {
        id
        title
        url
        position
        display
      }
    }
  }
`;
