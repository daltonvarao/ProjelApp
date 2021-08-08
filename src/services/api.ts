import axios from 'axios';
import * as auth from './auth';

const env = __DEV__ ? 'development' : 'production';

const baseURL = {
  development: 'http://192.168.1.6:3333/api',
  production: 'http://daltonfelipe.site/api',
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
