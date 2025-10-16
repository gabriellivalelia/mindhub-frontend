// Helpers simples para manipular token e tipo de usuário no localStorage
const TOKEN_KEY = "token";
const USER_TYPE_KEY = "user_type";

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

export function setUserType(type) {
  try {
    localStorage.setItem(USER_TYPE_KEY, type);
  } catch (e) {
    console.error(
      "Não foi possível salvar o tipo de usuário no localStorage",
      e
    );
  }
}

export function getUserType() {
  try {
    return localStorage.getItem(USER_TYPE_KEY);
  } catch (e) {
    console.error("Não foi possível ler o tipo de usuário do localStorage", e);
    return null;
  }
}

export function removeUserType() {
  try {
    localStorage.removeItem(USER_TYPE_KEY);
  } catch (e) {
    console.error(
      "Não foi possível remover o tipo de usuário do localStorage",
      e
    );
  }
}

export default {
  setToken,
  getToken,
  removeToken,
  setUserType,
  getUserType,
  removeUserType,
};
