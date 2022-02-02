import { UserLink } from '../../links/gql/user-link.types';

export interface PublicProfilePayload {
  id: number;
  username: string;
  displayName: string;
  bio: string;
  links: UserLink[];
}
