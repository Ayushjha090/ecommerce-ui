type TokenOwner = "admin" | "client";

const TOKEN_KEYS: Record<TokenOwner, string> = {
  admin: "admin_access_token",
  client: "access_token",
};

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

export const getAccessToken = (owner: TokenOwner) => {
  return getStorage()?.getItem(TOKEN_KEYS[owner]) ?? null;
};

export const setAccessToken = (owner: TokenOwner, token: string) => {
  getStorage()?.setItem(TOKEN_KEYS[owner], token);
};

export const removeAccessToken = (owner: TokenOwner) => {
  getStorage()?.removeItem(TOKEN_KEYS[owner]);
};

export const clearAuthTokens = () => {
  removeAccessToken("admin");
  removeAccessToken("client");
};
