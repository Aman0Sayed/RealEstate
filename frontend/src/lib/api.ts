import axios, { AxiosError } from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: API_BASE.replace(/\/$/, ''),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response && error.response.data && typeof error.response.data === 'object') {
      const data = error.response.data as any;
      const message = data.message;
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

// Contact
export async function submitContact(data: { name: string; email: string; phone: string; message: string }) {
  return post('/contact', data);
}

// Properties
export async function listProperties() {
  return get('/properties');
}

export async function getProperty(id: string) {
  return get(`/properties/${id}`);
}
