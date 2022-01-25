import { api } from './api';

type SignUpBody = {
  email: string;
  username: string;
  password: string;
};

export const signUp = (body: SignUpBody) => api.post('/auth/signup', body);
