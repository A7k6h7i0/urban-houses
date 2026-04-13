import { apiRequest } from "./apiClient";
import { endpoints } from "../constants/endpoints";
import {
  approveProperty,
  createLead,
  createProperty,
  getProperty,
  getPropertyBySlug,
  listProperties,
  markFeatured,
  submitPaymentProof,
} from "./mockDatabase";

export const propertyService = {
  getFeatured: (params = {}) =>
    apiRequest(endpoints.properties.featured, {}, () => listProperties({ ...params, featuredOnly: true, limit: params.limit || 8 })),
  getLatest: (params = {}) =>
    apiRequest(endpoints.properties.latest, {}, () => listProperties({ ...params, sort: "newest", limit: params.limit || 12 })),
  search: (params) =>
    apiRequest(endpoints.properties.search, {}, () => listProperties(params)),
  getById: (id) => apiRequest(endpoints.properties.detail(id), {}, () => getProperty(id)),
  getBySlug: (slug) => apiRequest(`${endpoints.properties.search}/${slug}`, {}, () => getPropertyBySlug(slug)),
  create: (payload) =>
    apiRequest(endpoints.properties.create, { method: "POST", body: JSON.stringify(payload) }, () => createProperty(payload)),
  createLead: (propertyId, payload) =>
    apiRequest(endpoints.properties.leads(propertyId), { method: "POST", body: JSON.stringify(payload) }, () => createLead(propertyId, payload)),
  submitPaymentProof: (propertyId, payload) =>
    apiRequest(endpoints.properties.payment(propertyId), { method: "POST", body: JSON.stringify(payload) }, () => submitPaymentProof(propertyId, payload)),
  approve: (propertyId, status) =>
    apiRequest(endpoints.properties.approve(propertyId), { method: "PATCH", body: JSON.stringify({ status }) }, () => approveProperty(propertyId, status)),
  markFeatured: (propertyId, featured) =>
    apiRequest(endpoints.properties.feature(propertyId), { method: "PATCH", body: JSON.stringify({ featured }) }, () => markFeatured(propertyId, featured)),
};
