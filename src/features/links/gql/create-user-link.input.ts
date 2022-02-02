import { UserLinkKindEnum } from './user-link.types';

export interface CreateUserLinkInput {
  title: string;
  url: string;
  display: boolean;
  position: number;
  kind: UserLinkKindEnum;
}
