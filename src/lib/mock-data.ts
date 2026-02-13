// Mock data for development when backend is unreachable
// This allows testing the UI without a running backend server

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vet' | 'staff';
  token: string;
}

export interface MockDashboardData {
  stats: {
    total_appointments_today: number;
    total_invoices_pending: number;
    total_pets: number;
    total_owners: number;
    inventory_low_stock_count: number;
    messages_to_send: number;
  };
  appointments_today: Array<any>;
  pending_invoices: Array<any>;
  low_stock_items: Array<any>;
  recent_activity: Array<any>;
}

// Mock users with credentials from populate_db.py
const MOCK_USERS: Record<string, { password: string; user: Omit<MockUser, 'token'> }> = {
  'admin@pawscare.com': {
    password: 'Admin@2026!',
    user: {
      id: 'admin-uuid-001',
      name: 'Dr. Admin',
      email: 'admin@pawscare.com',
      role: 'admin',
    },
  },
  'rajesh.sharma@pawscare.com': {
    password: 'Vet@2026!',
    user: {
      id: 'vet-uuid-001',
      name: 'Dr. Rajesh Sharma',
      email: 'rajesh.sharma@pawscare.com',
      role: 'vet',
    },
  },
  'anjali@pawscare.com': {
    password: 'Staff@2026!',
    user: {
      id: 'staff-uuid-001',
      name: 'Anjali Gupta',
      email: 'anjali@pawscare.com',
      role: 'staff',
    },
  },
};

// Mock dashboard data
export const MOCK_DASHBOARD_DATA: MockDashboardData = {
  stats: {
    total_appointments_today: 5,
    total_invoices_pending: 8500,
    total_pets: 247,
    total_owners: 156,
    inventory_low_stock_count: 3,
    messages_to_send: 8,
  },
  appointments_today: [
    {
      id: 'apt-1',
      time: '10:00',
      pet_name: 'Buddy',
      pet_type: 'Dog',
      owner_name: 'Amit Kumar',
      reason: 'Annual Checkup',
      vet_name: 'Dr. Rajesh',
      status: 'scheduled',
    },
    {
      id: 'apt-2',
      time: '11:30',
      pet_name: 'Whiskers',
      pet_type: 'Cat',
      owner_name: 'Sneha Patel',
      reason: 'Ear Infection Checkup',
      vet_name: 'Dr. Priya',
      status: 'scheduled',
    },
    {
      id: 'apt-3',
      time: '14:00',
      pet_name: 'Simba',
      pet_type: 'Dog',
      owner_name: 'Vikram Singh',
      reason: 'Ear Infection Checkup',
      vet_name: 'Dr. Rajesh',
      status: 'scheduled',
    },
    {
      id: 'apt-4',
      time: '16:15',
      pet_name: 'Fluffy',
      pet_type: 'Cat',
      owner_name: 'Divya Sharma',
      reason: 'Cleaning',
      vet_name: 'Dr. Priya',
      status: 'scheduled',
    },
    {
      id: 'apt-5',
      time: '17:00',
      pet_name: 'Lucy',
      pet_type: 'Dog',
      owner_name: 'Amit Kumar',
      reason: 'Follow-up',
      vet_name: 'Dr. Rajesh',
      status: 'scheduled',
    },
  ],
  pending_invoices: [
    {
      id: 'inv-1',
      invoice_number: 'INV-008',
      pet_name: 'Buddy',
      owner_name: 'Amit Kumar',
      amount: 2500,
      days_pending: 5,
    },
    {
      id: 'inv-2',
      invoice_number: 'INV-009',
      pet_name: 'Simba',
      owner_name: 'Vikram Singh',
      amount: 3800,
      days_pending: 2,
    },
    {
      id: 'inv-3',
      invoice_number: 'INV-010',
      pet_name: 'Whiskers',
      owner_name: 'Sneha Patel',
      amount: 1200,
      days_pending: 1,
    },
  ],
  low_stock_items: [
    {
      id: 'inv-item-1',
      name: 'Rabies Vaccine',
      quantity: 5,
      reorder_level: 10,
    },
    {
      id: 'inv-item-2',
      name: 'Amoxicillin',
      quantity: 8,
      reorder_level: 20,
    },
    {
      id: 'inv-item-3',
      name: 'Gauze Pads',
      quantity: 3,
      reorder_level: 5,
    },
  ],
  recent_activity: [
    {
      type: 'payment_received',
      message: 'Payment received for INV-007 (Buddy) - ₹1,500',
      timestamp: '2 hours ago',
    },
    {
      type: 'appointment_completed',
      message: 'Appointment completed: Simba with Dr. Rajesh',
      timestamp: '3 hours ago',
    },
    {
      type: 'vet_added',
      message: 'New vet added: Dr. Sneha Verma',
      timestamp: '1 day ago',
    },
    {
      type: 'pet_added',
      message: 'New pet registered: Rover (Golden Retriever)',
      timestamp: '1 day ago',
    },
  ],
};

// Mock pets list
export const MOCK_PETS = [
  {
    id: 'pet-1',
    name: 'Buddy',
    breed: 'Labrador',
    species: 'Dog',
    age: 3,
    owner: { id: 'owner-1', name: 'Amit Kumar', phone: '9999111122' },
    health_status: 'healthy',
    upcoming_appointment: {
      date: '2026-02-13',
      time: '10:00',
      reason: 'Annual Checkup',
    },
  },
  {
    id: 'pet-2',
    name: 'Lucy',
    breed: 'Golden Retriever',
    species: 'Dog',
    age: 2,
    owner: { id: 'owner-1', name: 'Amit Kumar', phone: '9999111122' },
    health_status: 'healthy',
    upcoming_appointment: {
      date: '2026-02-21',
      time: '14:00',
      reason: 'Booster Vaccination',
    },
  },
  {
    id: 'pet-3',
    name: 'Whiskers',
    breed: 'Persian',
    species: 'Cat',
    age: 4,
    owner: { id: 'owner-2', name: 'Sneha Patel', phone: '8765432100' },
    health_status: 'caution',
    upcoming_appointment: {
      date: '2026-02-13',
      time: '14:00',
      reason: 'Ear Infection Checkup',
    },
  },
  {
    id: 'pet-4',
    name: 'Simba',
    breed: 'German Shepherd',
    species: 'Dog',
    age: 5,
    owner: { id: 'owner-3', name: 'Vikram Singh', phone: '8876543210' },
    health_status: 'healthy',
    upcoming_appointment: {
      date: '2026-03-05',
      time: '11:00',
      reason: 'Dental Cleaning',
    },
  },
  {
    id: 'pet-5',
    name: 'Fluffy',
    breed: 'Siamese',
    species: 'Cat',
    age: 1,
    owner: { id: 'owner-4', name: 'Divya Sharma', phone: '9876543210' },
    health_status: 'healthy',
    upcoming_appointment: {
      date: '2026-02-25',
      time: '09:00',
      reason: 'Vaccinations',
    },
  },
];

/**
 * Mock login function
 * Validates email and password against mock users
 * Returns a mock auth token and user object
 */
export async function mockLogin(
  email: string,
  password: string
): Promise<{ access_token: string; user: MockUser }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userEntry = MOCK_USERS[email];

  if (!userEntry) {
    throw new Error('Invalid email or password');
  }

  if (userEntry.password !== password) {
    throw new Error('Invalid email or password');
  }

  // Generate a fake JWT token
  const fakeToken = `mock_token_${email}_${Date.now()}`;

  return {
    access_token: fakeToken,
    user: {
      ...userEntry.user,
      token: fakeToken,
    },
  };
}

/**
 * Check if we should use mock mode
 * Returns true if backend is unreachable
 */
export function shouldUseMockMode(): boolean {
  // Always use mock mode for now (can be toggled with environment variable later)
  return true;
}
