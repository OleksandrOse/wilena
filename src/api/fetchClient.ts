/* eslint-disable @typescript-eslint/no-explicit-any */
//const BASE_URL = 'http://127.0.0.1:8080';
const BASE_URL = process.env.REACT_APP_API_URL;
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('adminAccessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function clearAdminSession() {
  localStorage.removeItem('adminAccessToken');
  localStorage.removeItem('adminUser');
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    return body?.message || 'Unbekannter Fehler.';
  } catch {
    return 'Unbekannter Fehler.';
  }
}

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      ...getAuthHeaders(),
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options).then(async response => {
    if (response.status === 401) {
      clearAdminSession();
      window.location.hash = '#/wilena';
    }

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response));
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  put: <T>(url: string, data: any) => request<T>(url, 'PUT', data),
  delete: <T = void>(url: string) => request<T>(url, 'DELETE'),
};
