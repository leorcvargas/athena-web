import { User } from '../../user/gql/user.types';

export enum UserLinkKindEnum {
  BASIC = 'BASIC',
}

export interface UserLinkKind {
  id: string;
  value: UserLinkKindEnum;
}

export interface UserLink {
  id: string;
  url: string;
  title: string;
  user: User | string;
  kind: UserLinkKind | string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
