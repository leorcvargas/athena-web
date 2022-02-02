import { UserLinkKindEnum } from './user-link.types';

export interface UpdateUserLinkInput {
  title?: string;
  url?: string;
  display?: boolean;
  kind?: UserLinkKindEnum;
}
