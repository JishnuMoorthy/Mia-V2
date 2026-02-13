import { API_BASE_URL } from "@/lib/constants";
import type {
  LoginRequest,
  LoginResponse,
  User,
  Pet,
  PetParent,
  Appointment,
  Invoice,
  InventoryItem,
  MedicalRecord,
  DashboardStats,
  PaginatedResponse,
  Payment,
} from "@/types";

/* ── Helpers ──────────────────────────────────────── */

function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? `Request failed (${res.status})`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

/* ── Auth ──────────────────────────────────────────── */

export const apiClient = {
  // Auth
  login: (data: LoginRequest) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMe: () => request<User>("/auth/me"),

  // Dashboard
  getDashboard: () => request<DashboardStats>("/clinic/dashboard"),

  // Pets
  getPets: (params?: string) =>
    request<PaginatedResponse<Pet>>(`/pets${params ? `?${params}` : ""}`),
  getPet: (id: string) => request<Pet>(`/pets/${id}`),
  createPet: (data: Partial<Pet>) =>
    request<Pet>("/pets", { method: "POST", body: JSON.stringify(data) }),
  updatePet: (id: string, data: Partial<Pet>) =>
    request<Pet>(`/pets/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePet: (id: string) =>
    request<void>(`/pets/${id}`, { method: "DELETE" }),

  // Pet Parents (Owners)
  getOwners: (params?: string) =>
    request<PaginatedResponse<PetParent>>(`/pet_parents${params ? `?${params}` : ""}`),
  getOwner: (id: string) => request<PetParent>(`/pet_parents/${id}`),
  createOwner: (data: Partial<PetParent>) =>
    request<PetParent>("/pet_parents", { method: "POST", body: JSON.stringify(data) }),
  updateOwner: (id: string, data: Partial<PetParent>) =>
    request<PetParent>(`/pet_parents/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteOwner: (id: string) =>
    request<void>(`/pet_parents/${id}`, { method: "DELETE" }),

  // Appointments
  getAppointments: (params?: string) =>
    request<PaginatedResponse<Appointment>>(`/appointments${params ? `?${params}` : ""}`),
  getAppointment: (id: string) => request<Appointment>(`/appointments/${id}`),
  createAppointment: (data: Partial<Appointment>) =>
    request<Appointment>("/appointments", { method: "POST", body: JSON.stringify(data) }),
  updateAppointment: (id: string, data: Partial<Appointment>) =>
    request<Appointment>(`/appointments/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteAppointment: (id: string) =>
    request<void>(`/appointments/${id}`, { method: "DELETE" }),

  // Medical Records
  getMedicalRecords: (petId: string) =>
    request<MedicalRecord[]>(`/pets/${petId}/medical_records`),

  // Invoices
  getInvoices: (params?: string) =>
    request<PaginatedResponse<Invoice>>(`/invoices${params ? `?${params}` : ""}`),
  getInvoice: (id: string) => request<Invoice>(`/invoices/${id}`),
  createInvoice: (data: Partial<Invoice>) =>
    request<Invoice>("/invoices", { method: "POST", body: JSON.stringify(data) }),
  updateInvoice: (id: string, data: Partial<Invoice>) =>
    request<Invoice>(`/invoices/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  // Payments
  createPayment: (data: Partial<Payment>) =>
    request<Payment>("/payments", { method: "POST", body: JSON.stringify(data) }),

  // Inventory
  getInventory: (params?: string) =>
    request<PaginatedResponse<InventoryItem>>(`/inventory${params ? `?${params}` : ""}`),
  getInventoryItem: (id: string) => request<InventoryItem>(`/inventory/${id}`),
  createInventoryItem: (data: Partial<InventoryItem>) =>
    request<InventoryItem>("/inventory", { method: "POST", body: JSON.stringify(data) }),
  updateInventoryItem: (id: string, data: Partial<InventoryItem>) =>
    request<InventoryItem>(`/inventory/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteInventoryItem: (id: string) =>
    request<void>(`/inventory/${id}`, { method: "DELETE" }),

  // Users (Staff)
  getUsers: (params?: string) =>
    request<PaginatedResponse<User>>(`/users${params ? `?${params}` : ""}`),
  getUser: (id: string) => request<User>(`/users/${id}`),
  createUser: (data: Partial<User> & { password: string }) =>
    request<User>("/users", { method: "POST", body: JSON.stringify(data) }),
  updateUser: (id: string, data: Partial<User>) =>
    request<User>(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteUser: (id: string) =>
    request<void>(`/users/${id}`, { method: "DELETE" }),
};
