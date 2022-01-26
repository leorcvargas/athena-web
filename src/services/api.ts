import axios from 'axios';

import { getAccessToken } from './auth';

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
api.interceptors.request.use(async config => {
  const token = getAccessToken();

  if (token && config?.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
