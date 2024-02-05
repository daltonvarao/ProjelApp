import axios from 'axios';
import * as auth from './auth';

const env = __DEV__ ? 'development' : 'production';

const baseURL = {
  development: 'https://3dcb-143-208-221-39.ngrok-free.app/api',
  production: 'http://104.131.102.145/api',
};

const api = axios.create({
  baseURL: baseURL[env],
});

api.interceptors.request.use(async function (request) {
  const token = await auth.isLoggedIn();

  if (token) {
    request.headers.authorization = `Bearer ${token}`;
    request.timeout = 30000;
  }

  return request;
});

export default api;
