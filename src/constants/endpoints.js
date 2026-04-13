export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  properties: {
    featured: "/properties/featured",
    latest: "/properties/latest",
    search: "/properties",
    detail: (id) => `/properties/${id}`,
    leads: (id) => `/properties/${id}/leads`,
    create: "/properties",
    payment: (id) => `/properties/${id}/payments`,
    approve: (id) => `/admin/properties/${id}/status`,
    feature: (id) => `/admin/properties/${id}/feature`,
  },
  dashboard: "/dashboard/me",
  admin: "/admin/dashboard",
};
