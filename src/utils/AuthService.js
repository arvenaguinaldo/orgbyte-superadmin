import axios from 'axios';

export function authenticateToken(token) {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function isUserAuthenticated() {
  return localStorage.getItem('token') !== null;
}

export function deauthenticateUser() {
  delete axios.defaults.headers.common['Authorization'];
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}
