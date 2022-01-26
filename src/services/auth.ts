import { api } from './api';

type SignUpBody = {
  email: string;
  username: string;
  password: string;
};

type LoginBody = {
  username: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

const localTokenKey = 'access-token';

export const storeAccessToken = (accessToken: string) => {
  localStorage.setItem(localTokenKey, accessToken);
};

export const destroyAccessToken = () => {
  localStorage.removeItem(localTokenKey);
};

export const getAccessToken = () => localStorage.getItem(localTokenKey);

export const signUp = (body: SignUpBody) => api.post('/auth/signup', body);

export const login = (body: LoginBody) =>
  api
    .post<LoginResponse>('/auth/login', body)
    .then(({ data }) => storeAccessToken(data.accessToken));
