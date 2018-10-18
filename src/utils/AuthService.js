export function authenticateToken(token) {
  localStorage.setItem('token', token);
}

export function isUserAuthenticated() {
  return localStorage.getItem('token') !== null;
}

export function deauthenticateUser() {
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}
