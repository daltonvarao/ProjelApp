import axios from 'axios';
import * as auth from './auth';
import { ENVIRONMENT } from '../environment';

const baseURL = {
  "DEV": 'http://192.168.1.40:3333/api',
  "PROD": 'http://104.131.102.145/api',
  "TEST": "http://104.131.102.145:8080/api"
};

const api = axios.create({
  baseURL: baseURL[ENVIRONMENT],
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
