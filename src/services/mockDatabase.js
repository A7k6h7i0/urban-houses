import { featuredCities } from "../constants/cities";
import { slugify } from "../utils/formatters";

const STORAGE_KEY = "uh_marketplace_db_v1";

function createSvgDataUri(title, subtitle, palette) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${palette[0]}" />
          <stop offset="55%" stop-color="${palette[1]}" />
          <stop offset="100%" stop-color="${palette[2]}" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="1200" height="800" fill="#08111f"/>
      <circle cx="180" cy="120" r="180" fill="${palette[0]}" fill-opacity="0.25" filter="url(#blur)" />
      <circle cx="1060" cy="120" r="220" fill="${palette[2]}" fill-opacity="0.2" filter="url(#blur)" />
      <circle cx="900" cy="640" r="260" fill="${palette[1]}" fill-opacity="0.18" filter="url(#blur)" />
      <rect x="110" y="120" width="980" height="560" rx="36" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
      <text x="170" y="255" fill="#ffffff" font-size="44" font-weight="700" font-family="Arial, sans-serif">${title}</text>
      <text x="170" y="305" fill="rgba(255,255,255,0.78)" font-size="24" font-family="Arial, sans-serif">${subtitle}</text>
      <rect x="170" y="370" width="860" height="220" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
      <path d="M210 560 L430 390 L570 500 L730 360 L980 560" fill="none" stroke="white" stroke-opacity="0.4" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M210 560 L210 420 M430 390 L430 560 M570 500 L570 560 M730 360 L730 560 M980 560 L980 430" fill="none" stroke="white" stroke-opacity="0.14" stroke-width="6" />
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function baseState() {
  const images = [
    createSvgDataUri("Skyline Residences", "Premium 3BHK apartment", ["#337ef0", "#0b1322", "#ff9d1a"]),
    createSvgDataUri("Aurelia Villa", "Garden-facing luxury villa", ["#1b4d8a", "#08111f", "#ffb94d"]),
    createSvgDataUri("Plot Prime", "Open plot in a fast-growing zone", ["#0e7c86", "#09111d", "#4dd8ff"]),
    createSvgDataUri("Urban Nest", "Smart city apartment", ["#5f7cff", "#08111f", "#ffd48a"]),
  ];

  const properties = [
    {
      id: "prop_001",
      title: "Skyline Residences",
      slug: slugify("Skyline Residences"),
      price: 12500000,
      city: "Hyderabad",
      locality: "Kokapet",
      type: "Apartment",
      purpose: "Sell",
      bedrooms: 3,
      bathrooms: 3,
      area: 1860,
      featured: true,
      status: "Approved",
      ownerId: "usr_001",
      ownerName: "Aarav Sharma",
      ownerPhone: "+91 98765 43210",
      ownerEmail: "aarav@urbanhouses.com",
      postedAt: "2026-04-08T10:00:00.000Z",
      description: "A high-rise apartment with skyline views, premium clubhouse access, and direct connectivity to ORR.",
      amenities: ["Clubhouse", "Pool", "Gym", "Security", "Lift", "Power Backup"],
      images: [images[0], images[3], images[1]],
      leadCount: 7,
      paymentStatus: "Verified",
    },
    {
      id: "prop_002",
      title: "Aurelia Villa",
      slug: slugify("Aurelia Villa"),
      price: 22500000,
      city: "Bengaluru",
      locality: "Sarjapur Road",
      type: "Villa",
      purpose: "Sell",
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      featured: true,
      status: "Approved",
      ownerId: "usr_002",
      ownerName: "Nisha Verma",
      ownerPhone: "+91 99111 22777",
      ownerEmail: "nisha@urbanhouses.com",
      postedAt: "2026-04-05T12:00:00.000Z",
      description: "A private villa with landscaped garden, double-height living, and premium interiors designed for family living.",
      amenities: ["Garden", "Private Parking", "Security", "Solar", "Home Office", "Terrace"],
      images: [images[1], images[3], images[0]],
      leadCount: 4,
      paymentStatus: "Pending",
    },
    {
      id: "prop_003",
      title: "Orion Plot Phase 2",
      slug: slugify("Orion Plot Phase 2"),
      price: 6800000,
      city: "Hyderabad",
      locality: "Shadnagar",
      type: "Plot",
      purpose: "Sell",
      bedrooms: 0,
      bathrooms: 0,
      area: 1800,
      featured: false,
      status: "Pending",
      ownerId: "usr_001",
      ownerName: "Aarav Sharma",
      ownerPhone: "+91 98765 43210",
      ownerEmail: "aarav@urbanhouses.com",
      postedAt: "2026-04-10T09:30:00.000Z",
      description: "DTCP-approved open plot near industrial corridor with future value upside and clean documentation.",
      amenities: ["Corner Plot", "Road Access", "Drainage", "Water Line"],
      images: [images[2], images[0], images[1]],
      leadCount: 2,
      paymentStatus: "Not Started",
    },
    {
      id: "prop_004",
      title: "Urban Nest Studio",
      slug: slugify("Urban Nest Studio"),
      price: 28000,
      city: "Pune",
      locality: "Hinjewadi",
      type: "Studio",
      purpose: "Rent",
      bedrooms: 1,
      bathrooms: 1,
      area: 640,
      featured: false,
      status: "Approved",
      ownerId: "usr_003",
      ownerName: "Rahul Mehta",
      ownerPhone: "+91 90000 31415",
      ownerEmail: "rahul@urbanhouses.com",
      postedAt: "2026-04-11T16:20:00.000Z",
      description: "Compact, tech-friendly studio for working professionals with premium amenities and quick access to the IT park.",
      amenities: ["Workspace", "Laundry", "Gym", "Cafeteria", "Parking"],
      images: [images[3], images[0], images[2]],
      leadCount: 11,
      paymentStatus: "Verified",
    },
  ];

  return {
    users: [
      { id: "usr_001", name: "Aarav Sharma", email: "aarav@urbanhouses.com", role: "owner" },
      { id: "usr_002", name: "Nisha Verma", email: "nisha@urbanhouses.com", role: "agent" },
      { id: "usr_003", name: "Rahul Mehta", email: "rahul@urbanhouses.com", role: "owner" },
      { id: "admin_001", name: "Admin", email: "admin@urbanhouses.com", role: "admin" },
    ],
    properties,
    leads: [
      {
        id: "lead_001",
        propertyId: "prop_001",
        propertyTitle: "Skyline Residences",
        name: "Karan",
        phone: "9876543210",
        message: "Is the price negotiable? I want to visit this weekend.",
        createdAt: "2026-04-12T09:00:00.000Z",
      },
      {
        id: "lead_002",
        propertyId: "prop_004",
        propertyTitle: "Urban Nest Studio",
        name: "Meera",
        phone: "9988776655",
        message: "Do you allow bachelors and what is the deposit?",
        createdAt: "2026-04-13T08:15:00.000Z",
      },
    ],
    payments: [
      {
        id: "pay_001",
        propertyId: "prop_002",
        propertyTitle: "Aurelia Villa",
        screenshot: null,
        status: "Pending",
        submittedBy: "Nisha Verma",
        submittedAt: "2026-04-11T14:00:00.000Z",
      },
    ],
  };
}

function readState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const state = baseState();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return state;
    }
    return JSON.parse(raw);
  } catch {
    const state = baseState();
    return state;
  }
}

function writeState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function delay(value, ms = 180) {
  return new Promise((resolve) => window.setTimeout(() => resolve(value), ms));
}

export async function getState() {
  return delay(readState());
}

export async function listProperties(params = {}) {
  const state = readState();
  const {
    q = "",
    city = "",
    type = "All",
    purpose = "All",
    minPrice = 0,
    maxPrice = Infinity,
    sort = "recommended",
    featuredOnly = false,
    offset = 0,
    limit = 12,
  } = params;

  let items = [...state.properties].filter((property) => property.status !== "Rejected");
  const min = Number(minPrice);
  const max = Number(maxPrice);

  if (featuredOnly) items = items.filter((property) => property.featured);
  if (city) items = items.filter((property) => property.city === city);
  if (type && type !== "All") items = items.filter((property) => property.type === type);
  if (purpose && purpose !== "All") items = items.filter((property) => property.purpose === purpose);
  if (!Number.isNaN(min)) items = items.filter((property) => property.price >= min);
  if (!Number.isNaN(max)) items = items.filter((property) => property.price <= max);
  if (q) {
    const search = q.toLowerCase();
    items = items.filter((property) => [property.title, property.city, property.locality, property.type, property.description].join(" ").toLowerCase().includes(search));
  }

  if (sort === "price_asc") items.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") items.sort((a, b) => b.price - a.price);
  else if (sort === "newest") items.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  else if (sort === "featured") items.sort((a, b) => Number(b.featured) - Number(a.featured) || new Date(b.postedAt) - new Date(a.postedAt));
  else items.sort((a, b) => Number(b.featured) - Number(a.featured) || new Date(b.postedAt) - new Date(a.postedAt));

  const total = items.length;
  const nextItems = items.slice(offset, offset + limit);

  return delay({
    items: nextItems,
    total,
    hasMore: offset + limit < total,
  });
}

export async function getProperty(id) {
  const state = readState();
  return delay(state.properties.find((property) => property.id === id) || null);
}

export async function getPropertyBySlug(slug) {
  const state = readState();
  return delay(state.properties.find((property) => property.slug === slug) || null);
}

export async function createLead(propertyId, payload) {
  const state = readState();
  const property = state.properties.find((item) => item.id === propertyId);
  if (!property) throw new Error("Property not found");
  const lead = {
    id: `lead_${crypto.randomUUID().slice(0, 8)}`,
    propertyId,
    propertyTitle: property.title,
    createdAt: new Date().toISOString(),
    ...payload,
  };
  state.leads.unshift(lead);
  property.leadCount = (property.leadCount || 0) + 1;
  writeState(state);
  return delay(lead);
}

export async function createProperty(payload) {
  const state = readState();
  const property = {
    id: `prop_${crypto.randomUUID().slice(0, 8)}`,
    slug: slugify(payload.title),
    leadCount: 0,
    paymentStatus: "Not Started",
    featured: false,
    status: "Pending",
    postedAt: new Date().toISOString(),
    ...payload,
  };
  state.properties.unshift(property);
  writeState(state);
  return delay(property);
}

export async function submitPaymentProof(propertyId, payload) {
  const state = readState();
  const property = state.properties.find((item) => item.id === propertyId);
  if (!property) throw new Error("Property not found");
  const payment = {
    id: `pay_${crypto.randomUUID().slice(0, 8)}`,
    propertyId,
    propertyTitle: property.title,
    submittedAt: new Date().toISOString(),
    status: "Pending",
    ...payload,
  };
  state.payments.unshift(payment);
  property.paymentStatus = "Pending";
  writeState(state);
  return delay(payment);
}

export async function getDashboard(userId) {
  const state = readState();
  const listings = state.properties.filter((property) => property.ownerId === userId);
  const leads = state.leads.filter((lead) => listings.some((listing) => listing.id === lead.propertyId));
  return delay({
    listings,
    leads,
    stats: {
      totalListings: listings.length,
      approved: listings.filter((item) => item.status === "Approved" || item.status === "Featured").length,
      pending: listings.filter((item) => item.status === "Pending").length,
      leads: leads.length,
    },
  });
}

export async function getAdminDashboard() {
  const state = readState();
  return delay({
    listings: state.properties,
    leads: state.leads,
    payments: state.payments,
    users: state.users,
    stats: {
      totalListings: state.properties.length,
      pendingListings: state.properties.filter((item) => item.status === "Pending").length,
      featuredListings: state.properties.filter((item) => item.featured).length,
      pendingPayments: state.payments.filter((item) => item.status === "Pending").length,
    },
  });
}

export async function approveProperty(propertyId, status) {
  const state = readState();
  const property = state.properties.find((item) => item.id === propertyId);
  if (!property) throw new Error("Property not found");
  property.status = status;
  if (status === "Approved" && property.featured) property.status = "Featured";
  writeState(state);
  return delay(property);
}

export async function markFeatured(propertyId, featured) {
  const state = readState();
  const property = state.properties.find((item) => item.id === propertyId);
  if (!property) throw new Error("Property not found");
  property.featured = featured;
  if (featured && property.status === "Approved") property.status = "Featured";
  if (!featured && property.status === "Featured") property.status = "Approved";
  writeState(state);
  return delay(property);
}

export async function verifyPayment(paymentId, status) {
  const state = readState();
  const payment = state.payments.find((item) => item.id === paymentId);
  if (!payment) throw new Error("Payment not found");
  payment.status = status;
  const property = state.properties.find((item) => item.id === payment.propertyId);
  if (property && status === "Verified") {
    property.featured = true;
    property.status = "Featured";
    property.paymentStatus = "Verified";
  }
  writeState(state);
  return delay(payment);
}

export async function getCities() {
  return delay(featuredCities);
}
