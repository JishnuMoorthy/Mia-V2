/* ── Enums ─────────────────────────────────────────── */

export type UserRole = "admin" | "vet" | "staff";
export type PetGender = "male" | "female" | "unknown";
export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no_show";
export type InvoiceStatus = "draft" | "issued" | "paid" | "cancelled";
export type PaymentMethod = "upi" | "cash" | "card";
export type PaymentStatus = "pending" | "paid" | "failed";

/* ── Core Models ──────────────────────────────────── */

export interface User {
  id: string;
  clinic_id: string;
  name: string;
  phone: string;
  email: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PetParent {
  id: string;
  clinic_id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  govt_id_reference: string | null;
  created_at: string;
  updated_at: string;
}

export interface Pet {
  id: string;
  clinic_id: string;
  pet_parent_id: string;
  name: string;
  species: string;
  breed: string | null;
  gender: PetGender;
  date_of_birth: string | null;
  registration_number: string | null;
  sterilization_status: string | null;
  alerts: string | null;
  created_at: string;
  updated_at: string;
  pet_parent?: PetParent;
}

export interface Appointment {
  id: string;
  clinic_id: string;
  pet_id: string;
  vet_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  notes: string | null;
  procedure_type: string | null;
  created_at: string;
  updated_at: string;
  pet?: Pet;
  vet?: User;
}

export interface MedicalRecord {
  id: string;
  clinic_id: string;
  pet_id: string;
  vet_id: string;
  visit_date: string;
  symptoms: string | null;
  diagnosis: string | null;
  prescription: string | null;
  follow_up_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Invoice {
  id: string;
  clinic_id: string;
  pet_id: string;
  invoice_number: string;
  total_amount: number;
  gst_amount: number;
  status: InvoiceStatus;
  line_items?: InvoiceLineItem[];
  created_at: string;
  updated_at: string;
  pet?: Pet;
}

export interface Payment {
  id: string;
  clinic_id: string;
  invoice_id: string;
  payment_method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  reference_id: string | null;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  clinic_id: string;
  name: string;
  quantity: number;
  expiry_date: string | null;
  low_stock_threshold: number;
  created_at: string;
  updated_at: string;
}

/* ── Auth ──────────────────────────────────────────── */

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

/* ── API Pagination ───────────────────────────────── */

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

/* ── Dashboard ────────────────────────────────────── */

export interface DashboardStats {
  todays_appointments: number;
  pending_invoices: number;
  total_pets: number;
  total_owners: number;
  todays_appointment_list: Appointment[];
  pending_invoice_list: Invoice[];
  low_stock_items: InventoryItem[];
}
