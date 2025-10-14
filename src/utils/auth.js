// Helpers simples para manipular token no localStorage
const TOKEN_KEY = "token";

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error("Não foi possível salvar o token no localStorage", e);
  }
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error("Não foi possível ler o token do localStorage", e);
    return null;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error("Não foi possível remover o token do localStorage", e);
  }
}

export default {
  setToken,
  getToken,
  removeToken,
};
