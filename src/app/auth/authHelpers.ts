export const getAccessToken = () => localStorage.getItem('access');
export const getRefreshToken = () => localStorage.getItem('refresh');

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
};

export const clearTokens = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

export const isAccessTokenExpired = () => {
  const token = getAccessToken();
  if (!token) return true;

  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return true;

  const expiry = decoded.exp * 1000;
  return Date.now() >= expiry;
};

export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error('No refresh token');

  const res = await fetch('https://a2sv-application-platform-backend-team10.onrender.com/auth/token/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  const result = await res.json();
  if (!res.ok || !result.success) throw new Error(result.message || 'Failed to refresh token');

  const { access } = result.data;
  localStorage.setItem('access', access);
  return access;
};
