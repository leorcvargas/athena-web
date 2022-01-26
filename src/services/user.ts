import { api } from './api';

type UserResponse = {
  id: string;
  email: string;
  username: string;
};

export const getProfile = () => api.get<UserResponse>('/user/profile');
