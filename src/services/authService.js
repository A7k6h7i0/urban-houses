import { apiRequest } from "./apiClient";
import { endpoints } from "../constants/endpoints";

function mockLogin(payload) {
  return {
    id: payload.email === "admin@urbanhouses.com" ? "admin_001" : "usr_001",
    name: payload.email === "admin@urbanhouses.com" ? "Admin" : payload.name || "Aarav Sharma",
    email: payload.email,
    role: payload.email === "admin@urbanhouses.com" ? "admin" : "owner",
  };
}

function mockSignup(payload) {
  return {
    id: `usr_${crypto.randomUUID().slice(0, 8)}`,
    name: payload.name,
    email: payload.email,
    role: payload.role || "owner",
  };
}

export async function loginUser(payload) {
  return apiRequest(endpoints.auth.login, { method: "POST", body: JSON.stringify(payload) }, () => mockLogin(payload));
}

export async function signupUser(payload) {
  return apiRequest(endpoints.auth.signup, { method: "POST", body: JSON.stringify(payload) }, () => mockSignup(payload));
}
