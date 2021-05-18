import axios from 'axios';
import * as auth from './auth';

const development = process.env.NODE_ENV === 'development';

const devBaseURL = 'http://192.168.0.106:3333/api';
const prodBaseURL = 'http://daltonfelipe.site/api';

const api = axios.create({
  baseURL: development ? devBaseURL : prodBaseURL,
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
