import { apiRequest } from "./apiClient";
import { endpoints } from "../constants/endpoints";
import { approveProperty, getAdminDashboard, markFeatured, verifyPayment } from "./mockDatabase";

export const adminService = {
  getDashboard: () => apiRequest(endpoints.admin, {}, () => getAdminDashboard()),
  approveProperty: (id, status) => apiRequest(endpoints.properties.approve(id), { method: "PATCH", body: JSON.stringify({ status }) }, () => approveProperty(id, status)),
  markFeatured: (id, featured) => apiRequest(endpoints.properties.feature(id), { method: "PATCH", body: JSON.stringify({ featured }) }, () => markFeatured(id, featured)),
  verifyPayment: (id, status) => apiRequest(`/admin/payments/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }, () => verifyPayment(id, status)),
};
