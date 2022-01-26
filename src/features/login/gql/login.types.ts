import { User } from '../../user/gql/user.types';

export type LoginInput = {
  input: {
    username: string;
    password: string;
  };
};

export interface LoginPayload {
  login: {
    user: User;
    accessToken: string;
  };
}
