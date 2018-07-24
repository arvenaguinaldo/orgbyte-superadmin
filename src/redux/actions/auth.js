import api from 'services/api/api';

export function login(data) {
  return api.callPost('/sessions', data).then((res) => {
    const token = res.data.token;
    localStorage.setItem('token', token);
  });
}
