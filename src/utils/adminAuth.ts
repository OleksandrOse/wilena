// src/utils/adminAuth.ts
// Спільна логіка сесії адміна: заголовки, вихід, і головне — authFetch,
// який на 401 намагається мовчки оновити accessToken через ваш
// POST /refresh (він читає refreshToken з httpOnly-куки, яку виставляє
// sendAuthentication), і лише якщо це теж не вдалось — виганяє на /wilena.
// Завдяки цьому користувач лишається залогіненим довше, ніж живе один
// access token, а не тільки на час його короткого життя.

const API_URL = "http://localhost:8080";

type SessionUser = { id: string; role: string; [key: string]: unknown };

export function getAdminUser(): SessionUser | null {
  try {
    const raw = localStorage.getItem("adminUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("adminAccessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function saveAdminSession(accessToken: string, user: SessionUser) {
  localStorage.setItem("adminAccessToken", accessToken);
  localStorage.setItem("adminUser", JSON.stringify(user));
}

export function clearAdminSession() {
  localStorage.removeItem("adminAccessToken");
  localStorage.removeItem("adminUser");
}

function goToLogin() {
  window.location.hash = "#/wilena";
}

// Одна паралельна спроба оновлення на всіх — якщо кілька запитів
// одночасно ловлять 401, не б'ємо /refresh кілька разів підряд.
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${API_URL}/refresh`, {
          method: "POST",
          credentials: "include", // важливо: саме тут читається refreshToken-кука
        });

        if (!res.ok) return null;

        const data: { user: SessionUser; accessToken: string } = await res.json();

        if (data.user?.role !== "admin") return null;

        saveAdminSession(data.accessToken, data.user);
        return data.accessToken;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

// Обгортка над fetch для захищених /admin-запитів: додає Bearer-токен,
// а на 401 спершу пробує /refresh і повторює запит з новим токеном;
// лише якщо оновити не вдалось — чистить сесію і веде на /wilena.
export async function authFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      ...getAuthHeaders(),
    },
  });

  if (res.status !== 401) return res;

  const newToken = await refreshAccessToken();

  if (!newToken) {
    clearAdminSession();
    goToLogin();
    return res;
  }

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      Authorization: `Bearer ${newToken}`,
    },
  });
}
