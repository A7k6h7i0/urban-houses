const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const USE_MOCK_API = String(import.meta.env.VITE_USE_MOCK_API ?? "true") !== "false";

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }
  return response.json();
}

export async function apiRequest(path, options = {}, mockFallback) {
  if (!USE_MOCK_API && API_BASE_URL) {
    return fetchJson(path, options);
  }

  if (typeof mockFallback === "function") {
    return mockFallback();
  }

  return fetchJson(path, options);
}
