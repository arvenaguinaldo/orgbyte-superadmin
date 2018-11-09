export function setThemeColor(color) {
  localStorage.setItem('color', color);
}

export function noThemeColor() {
  return localStorage.getItem('token') === null;
}

export function removeThemeColor() {
  localStorage.removeItem('color');
}

export function getThemeColor() {
  return localStorage.getItem('color');
}
