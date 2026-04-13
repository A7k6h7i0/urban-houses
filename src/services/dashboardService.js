import { apiRequest } from "./apiClient";
import { endpoints } from "../constants/endpoints";
import { getDashboard } from "./mockDatabase";

export const dashboardService = {
  getDashboard: (userId) => apiRequest(endpoints.dashboard, {}, () => getDashboard(userId)),
};
