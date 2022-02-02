import { UserLinkKindEnum } from './user-link.types';

export interface UserLinkInput {
  title?: string;
  url?: string;
  display?: boolean;
  position?: number;
  kind?: UserLinkKindEnum;
}
