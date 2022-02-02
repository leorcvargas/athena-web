import { User } from '../../user/gql/user.types';

export enum UserLinkKindEnum {
  BASIC = 'BASIC',
}

export interface UserLinkKind {
  id: number;
  value: UserLinkKindEnum;
}

export interface UserLink {
  id: number;
  url: string;
  title: string;
  user: User | string;
  kind: UserLinkKind | string;
  display: boolean;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
