export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";

export const APP_NAME = "Mia VMS";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  PETS: "/pets",
  PET_DETAIL: "/pets/:id",
  PET_NEW: "/pets/new",
  OWNERS: "/owners",
  OWNER_DETAIL: "/owners/:id",
  OWNER_NEW: "/owners/new",
  APPOINTMENTS: "/appointments",
  APPOINTMENT_NEW: "/appointments/new",
  BILLING: "/billing",
  BILLING_DETAIL: "/billing/:id",
  BILLING_NEW: "/billing/new",
  INVENTORY: "/inventory",
  STAFF: "/staff",
} as const;
