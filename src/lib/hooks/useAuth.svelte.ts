import { page } from "$app/state";
import { invalidateAll } from "$app/navigation";

export const useAuth = () => {
  const authenticated = $derived(!!page.data.user);
  const userInfo = $derived(page.data.user || null);

  const isTokenExpired = (token: string | null, bufferSeconds = 30) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now() + bufferSeconds * 1000;
    } catch {
      return true;
    }
  };

  const refreshToken = async () => {
    const response = await fetch("/api/auth/refresh", { method: "POST" });
    if (response.ok) {
      await invalidateAll();
      return true;
    }
    return false;
  };

  const getToken = async () => {
    const currentToken = page.data.token;

    if (isTokenExpired(currentToken)) {
      const success = await refreshToken();
      if (!success) {
        throw new Error("Session expired and could not be renewed");
      }
      return page.data.token;
    }

    return currentToken;
  };

  const login = () => {
    window.location.href = "/auth/login";
  };

  const logout = () => {
    window.location.href = "/auth/logout";
  };

  return {
    get authenticated() {
      return authenticated;
    },
    get userInfo() {
      return userInfo;
    },
    getToken,
    login,
    logout
  };
};
