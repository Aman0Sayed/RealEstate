import axios, { AxiosError } from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;
if (!API_BASE) {
  throw new Error('Missing required environment variable: VITE_API_URL');
}

const apiClient = axios.create({
  baseURL: API_BASE.replace(/\/$/, ''),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setToken(token: string | null) {
  if (token) localStorage.setItem('pp_token', token);
  else localStorage.removeItem('pp_token');
  try {
    window.dispatchEvent(new CustomEvent('pp_token_changed'));
  } catch (e) {
    // ignore in non-browser environments
  }
}

export function getToken() {
  return localStorage.getItem('pp_token');
}

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response && error.response.data && typeof error.response.data === 'object') {
      const message = (error.response.data as any).message;
      return Promise.reject(new Error(message || error.message));
    }
    return Promise.reject(error);
  }
);

async function request(method: string, path: string, body?: any) {
  return apiClient.request({
    method,
    url: path,
    data: body,
  });
}

export async function post(path: string, body: any) {
  return request('post', path, body);
}

export async function get(path: string) {
  return request('get', path);
}

export async function put(path: string, body: any) {
  return request('put', path, body);
}

export async function del(path: string) {
  return request('delete', path);
}

// Auth helper wrappers
export async function login(email: string, password: string) {
  return post('/auth/login', { email, password });
}

export async function register(name: string, email: string, password: string, role = 'looker', adminCode?: string) {
  const body: any = { name, email, password, role };
  if (adminCode) body.adminCode = adminCode;
  return post('/auth/register', body);
}

export async function fetchProfile() {
  return get('/users/me');
}

// Properties
export async function listProperties() {
  return get('/properties');
}

export async function getProperty(id: string) {
  return get(`/properties/${id}`);
}

export async function createProperty(data: any) {
  return post('/properties', data);
}

export async function updateProperty(id: string, data: any) {
  return put(`/properties/${id}`, data);
}

export async function deleteProperty(id: string) {
  return del(`/properties/${id}`);
}

// Admin / Users
export async function listUsers() {
  return get('/users');
}

export async function deleteUser(id: string) {
  return del(`/users/${id}`);
}
