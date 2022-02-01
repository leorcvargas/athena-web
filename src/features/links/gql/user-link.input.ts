import { UserLinkKindEnum } from './user-link.types';

export interface UserLinkInput {
  title?: string;
  url?: string;
  display?: boolean;
  kind?: UserLinkKindEnum;
}
