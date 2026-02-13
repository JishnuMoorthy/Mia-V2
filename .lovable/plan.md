

# Mia VMS - Admin/Staff Dashboard Frontend

## Overview
Build a complete Admin/Staff Dashboard for an Indian veterinary clinic management system. The frontend connects to an existing FastAPI backend at `http://localhost:8000/api/v1`.

**Tech Stack Adaptation**: The specs call for Next.js 15+, but Lovable uses React + Vite. The plan adapts accordingly using React Router for routing, while keeping everything else identical (React Query, React Hook Form, Tailwind CSS, TypeScript strict mode).

---

## Phase 1: Project Foundation and Authentication (First Build)

### 1.1 - Project Initialization
Create all missing foundation files:
- `index.html` (entry point)
- `package.json` with all dependencies (react, react-router-dom, @tanstack/react-query, react-hook-form, tailwindcss, lucide-react, sonner for toasts, date-fns)
- `vite.config.ts`
- `tailwind.config.ts`
- `tsconfig.json` (strict mode enabled)

### 1.2 - Core Architecture Files

```text
src/
  types/index.ts          -- All TypeScript interfaces (User, Pet, Appointment, Invoice, InventoryItem, PetParent, etc.)
  lib/api.ts              -- Centralized API client with token injection, error handling, all endpoint functions
  lib/constants.ts        -- API base URL, app name, route paths
  hooks/useAuth.ts        -- Auth state management (login, logout, current user, token storage)
  contexts/AuthContext.tsx -- Auth context provider
```

### 1.3 - Layout and Routing
- `App.tsx` with React Router setup
- `ProtectedRoute` component (redirects to login if not authenticated)
- `DashboardLayout` component (sidebar + header + main content area)
- Sidebar navigation with role-based menu items (admin sees all 8 items; staff sees only Pets, Owners, Appointments)
- Header with clinic name, user info, logout button
- Mobile-responsive hamburger menu

### 1.4 - Login Page (`/login`)
- Email and password fields with React Hook Form validation
- "Remember me" checkbox
- Error message display from API
- POST to `/auth/login`, store token, redirect to `/dashboard`
- Clean, professional healthcare-style design

---

## Phase 2: Core Pages (Second Build)

### 2.1 - Dashboard (`/dashboard`)
- 4 stat cards (today's appointments, pending invoices, total pets, total owners)
- Today's appointments list (scrollable, clickable)
- Pending invoices section
- Low stock alerts
- Data from `GET /clinic/dashboard`
- Loading skeletons while fetching

### 2.2 - Pets Management (`/pets`, `/pets/:id`, `/pets/new`)
- Searchable, sortable table with pagination
- Filter by species
- Create/Edit pet form (modal or page) with owner selection dropdown
- Delete with confirmation dialog
- Pet detail view with medical history
- CRUD via `/pets` endpoints

### 2.3 - Owners Management (`/owners`, `/owners/:id`, `/owners/new`)
- Searchable table with pagination
- Create/Edit owner form
- Owner detail showing linked pets
- CRUD via `/pet_parents` endpoints

### 2.4 - Appointments (`/appointments`, `/appointments/new`)
- Calendar/list view with date range filtering
- Schedule new appointment form (select pet, vet, date, time)
- Mark complete / cancel actions
- Status badges (scheduled, completed, cancelled, no_show)
- CRUD via `/appointments` endpoints

### 2.5 - Billing (`/billing`, `/billing/:id`, `/billing/new`) -- Admin Only
- Invoice list with status filters (paid, pending, overdue)
- Create invoice with line items
- Mark as paid with payment method selection (UPI, cash, card)
- Send payment reminder
- CRUD via `/invoices` endpoints

### 2.6 - Inventory (`/inventory`) -- Admin Only
- Item list with low-stock highlighting
- Create/Edit item form (name, quantity, expiry, threshold)
- Delete with confirmation
- CRUD via `/inventory` endpoints

### 2.7 - Staff Management (`/staff`) -- Admin Only
- Vet/staff list
- Create/Edit user form
- Role assignment
- CRUD via `/users` endpoints

---

## Phase 3: Polish (Third Build)

- Consistent error handling across all pages
- Empty states for all lists
- Mobile responsive refinements
- Toast notifications for all CRUD operations
- 401 handling (auto-redirect to login on token expiry)
- Form validation messages matching API error responses
- Accessibility improvements

---

## Role-Based Access Control

| Feature | Admin | Staff |
|---|---|---|
| Dashboard | Full | Limited (no billing/inventory widgets) |
| Pets | Full CRUD | Read only |
| Owners | Full CRUD | Read only |
| Appointments | Full CRUD | Read only |
| Billing | Full CRUD | Hidden |
| Inventory | Full CRUD | Hidden |
| Staff | Full CRUD | Hidden |

---

## Technical Details

### API Client Pattern (`src/lib/api.ts`)
- Base URL from environment variable (`VITE_API_BASE_URL`)
- Fetch wrapper that auto-injects `Authorization: Bearer {token}` header
- Typed request/response for every endpoint
- 401 response interceptor to clear auth and redirect to login
- All functions exported as `apiClient` object matching the spec signatures

### State Management
- Auth state via React Context + localStorage for token persistence
- Server state via React Query (TanStack Query) for all API data
- Form state via React Hook Form with validation

### Key Dependencies
- `@tanstack/react-query` - data fetching and caching
- `react-hook-form` + `zod` - form validation
- `react-router-dom` - client-side routing
- `lucide-react` - icons
- `sonner` - toast notifications
- `date-fns` - date formatting
- `tailwindcss` - styling

