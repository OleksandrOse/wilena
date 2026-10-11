import { client } from '../api/fetchClient';

export type AdminUser = {
  id: string;
  role: string;
  [key: string]: unknown;
};

export type LoginResponse = {
  user: AdminUser;
  accessToken: string;
};

export type LoginPayload = {
  login: string;
  password: string;
};

export type ChangePasswordPayload = {
  login: string;
  oldPassword: string;
  password: string;
};

export const login = (data: LoginPayload) => {
  return client.post<LoginResponse>('/login', data);
};

export const changePassword = (data: ChangePasswordPayload) => {
  return client.post<{ message?: string }>('/changePassword', data);
};
