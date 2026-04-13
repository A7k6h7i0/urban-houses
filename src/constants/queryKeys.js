export const queryKeys = {
  featuredProperties: ["properties", "featured"],
  latestProperties: ["properties", "latest"],
  properties: ["properties"],
  property: (id) => ["property", id],
  propertyLeads: (propertyId) => ["property", propertyId, "leads"],
  dashboard: ["dashboard"],
  admin: ["admin"],
  users: ["users"],
};
