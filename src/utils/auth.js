// Helpers simples para manipular token e tipo de usuário no localStorage
const TOKEN_KEY = "token";
const USER_TYPE_KEY = "user_type";
const USER_EMAIL_KEY = "user_email";

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

export function setUserEmail(email) {
  try {
    localStorage.setItem(USER_EMAIL_KEY, email);
  } catch (e) {
    console.error(
      "Não foi possível salvar o email do usuário no localStorage",
      e
    );
  }
}

export function getUserEmail() {
  try {
    return localStorage.getItem(USER_EMAIL_KEY);
  } catch (e) {
    console.error("Não foi possível ler o email do usuário do localStorage", e);
    return null;
  }
}

export function removeUserEmail() {
  try {
    localStorage.removeItem(USER_EMAIL_KEY);
  } catch (e) {
    console.error(
      "Não foi possível remover o email do usuário do localStorage",
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
  setUserEmail,
  getUserEmail,
  removeUserEmail,
};
