# 🚀 LOVABLE BRIEF — Phase 1 Admin MVP

**Project**: Mia VMS (Veterinary Management System)  
**Phase**: Phase 1 - Admin/Staff Dashboard MVP  
**Timeline**: 5-7 days to production  
**Status**: Ready for Lovable to build  
**Date**: February 12, 2026  

---

## 📋 EXECUTIVE BRIEF FOR LOVABLE

You are building the **Admin/Staff Dashboard** for a veterinary clinic management system. This is a production-ready MVP that will integrate with an existing FastAPI backend.

**Key Principles**:
- ✅ Professional, clean design (inspired by Mobbin references you'll provide)
- ✅ Fast, responsive, mobile-first
- ✅ Direct API integration (endpoints listed below)
- ✅ Role-based access control (admin vs staff)
- ✅ No hardcoded data - all from backend API
- ✅ Production-ready error handling & loading states

---

## 🎨 DESIGN DIRECTION

### Visual Inspiration
Reference these Mobbin designs for UI/UX patterns:
- Dashboard layouts with stat cards and widgets
- Table components with sorting/filtering
- Modal forms for CRUD operations
- Calendar components for appointments
- Invoice/billing cards
- Navigation patterns (sidebar, top nav)

### Color Scheme (Customize as needed)
- Primary: Professional blue/teal (healthcare appropriate)
- Secondary: Complementary accent color
- Neutral: Grays for backgrounds and borders
- Status: Green (success), Red (error), Yellow (warning), Blue (info)

### Typography
- Headlines: Bold, clear hierarchy
- Body: Readable, accessible (16px minimum for mobile)
- Monospace: For IDs, amounts, technical info

### Components
- Buttons: Primary (CTA), Secondary, Danger (for delete)
- Forms: Clean inputs with validation feedback
- Tables: Sortable columns, pagination, row actions
- Cards: For pets, invoices, inventory items
- Modals: For forms, confirmations, details
- Notifications: Toast for alerts, success messages
- Loading: Skeleton screens, spinners

---

## 🏗️ PROJECT STRUCTURE

```
mia-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (header, sidebar)
│   │   ├── page.tsx             # Home/redirect to dashboard
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx     # Login page
│   │   │   └── logout/
│   │   │       └── page.tsx     # Logout handler
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Main dashboard
│   │   ├── pets/
│   │   │   ├── page.tsx         # Pet list
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx     # Pet detail
│   │   │   └── new/
│   │   │       └── page.tsx     # Create pet
│   │   ├── owners/
│   │   │   ├── page.tsx         # Owner list
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx     # Owner detail
│   │   │   └── new/
│   │   │       └── page.tsx     # Create owner
│   │   ├── appointments/
│   │   │   ├── page.tsx         # Appointment calendar
│   │   │   └── new/
│   │   │       └── page.tsx     # Schedule appointment
│   │   ├── billing/
│   │   │   ├── page.tsx         # Invoices list
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx     # Invoice detail
│   │   │   └── new/
│   │   │       └── page.tsx     # Create invoice
│   │   ├── inventory/
│   │   │   ├── page.tsx         # Inventory list
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Item detail/edit
│   │   ├── staff/
│   │   │   └── page.tsx         # Vet management
│   │   └── settings/
│   │       └── page.tsx         # User settings
│   ├── components/
│   │   ├── Sidebar.tsx          # Main navigation
│   │   ├── Header.tsx           # Top header
│   │   ├── Footer.tsx           # Footer
│   │   ├── Navbar.tsx           # Mobile nav
│   │   ├── DashboardWidgets.tsx  # Dashboard cards
│   │   ├── Table.tsx            # Reusable table
│   │   ├── Modal.tsx            # Reusable modal
│   │   ├── Form.tsx             # Reusable form wrapper
│   │   ├── Loading.tsx          # Loading skeleton
│   │   └── Notification.tsx     # Toast notifications
│   ├── lib/
│   │   ├── api.ts               # API client wrapper
│   │   ├── auth.ts              # Auth helpers
│   │   └── constants.ts         # App constants
│   ├── hooks/
│   │   ├── useAuth.ts           # Auth hook
│   │   ├── useApi.ts            # API hook
│   │   └── useNotification.ts   # Notification hook
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   └── globals.css              # Tailwind + global styles
├── public/
│   └── icons/                   # SVG icons
├── .env.local                   # Environment variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔌 API INTEGRATION

### Backend Server
```
Base URL: http://localhost:8000/api/v1
```

### Authentication
```
Endpoint: POST /auth/login
Request: { "email": string, "password": string }
Response: { "access_token": string, "user": { id, name, email, role } }
Storage: HTTP-only cookie OR localStorage with "Authorization: Bearer {token}"
```

### All Required Endpoints

#### Dashboard
```
GET  /clinic/dashboard
     → { stats, appointments_today, pending_invoices, low_stock_items, recent_activity }
```

#### Pets (CRUD)
```
GET    /pets?clinic_id=X&skip=0&limit=50
POST   /pets
GET    /pets/{id}
PUT    /pets/{id}
DELETE /pets/{id}
```

#### Pet Parents/Owners (CRUD)
```
GET    /pet_parents?clinic_id=X
POST   /pet_parents
GET    /pet_parents/{id}
PUT    /pet_parents/{id}
DELETE /pet_parents/{id}
```

#### Appointments (CRUD)
```
GET    /appointments?clinic_id=X&date_from=2026-02-13&date_to=2026-02-19
POST   /appointments
GET    /appointments/{id}
PUT    /appointments/{id}
DELETE /appointments/{id}
PUT    /appointments/{id}/mark-complete
```

#### Invoices (CRUD + Payment)
```
GET    /invoices?clinic_id=X&status=pending
POST   /invoices
GET    /invoices/{id}
PUT    /invoices/{id}
PUT    /invoices/{id}/mark-paid
POST   /invoices/{id}/send-reminder
```

#### Inventory (CRUD)
```
GET    /inventory?clinic_id=X
POST   /inventory
GET    /inventory/{id}
PUT    /inventory/{id}
DELETE /inventory/{id}
```

#### Users/Vets (CRUD)
```
GET    /users?role=vet&clinic_id=X
POST   /users
GET    /users/{id}
PUT    /users/{id}
DELETE /users/{id}
```

---

## 📱 KEY PAGES TO BUILD

### 1. LOGIN PAGE
**Route**: `/auth/login`  
**Purpose**: Authenticate users (admin, staff, vet)  
**Fields**:
- Email (required)
- Password (required)
- "Remember me" checkbox (optional)

**Actions**:
- POST to `/auth/login`
- Store token (HTTP-only cookie preferred)
- Redirect based on role:
  - Admin → `/dashboard`
  - Staff → `/dashboard` (limited features)
  - Vet → `/vet/schedule` (Phase 2)

**Validation**:
- Email format validation
- Password required
- Show error messages from API

---

### 2. DASHBOARD (Main Landing)
**Route**: `/dashboard`  
**Purpose**: Overview of clinic operations  
**Layout**: 
```
┌─────────────────────────────────────┐
│ Header (Clinic Name, User, Logout)  │
├──────────────────────────────────────┤
│ Sidebar │  Main Content              │
│ - Dashboard  │  ┌──────────────────┐ │
│ - Pets       │  │ Quick Stats (4)  │ │
│ - Owners     │  │ - Appointments   │ │
│ - Appointments│ │ - Pending $      │ │
│ - Billing    │  │ - Pets           │ │
│ - Inventory  │  │ - Owners         │ │
│ - Staff      │  └──────────────────┘ │
│ - Settings   │                       │
│              │  ┌──────────────────┐ │
│              │  │Today's Appts (5) │ │
│              │  │[List with times] │ │
│              │  └──────────────────┘ │
│              │                       │
│              │  ┌──────────────────┐ │
│              │  │Pending Invoices  │ │
│              │  │[Cards/List]      │ │
│              │  └──────────────────┘ │
│              │                       │
│              │  ┌──────────────────┐ │
│              │  │Low Stock Alerts  │ │
│              │  │[Warning items]   │ │
│              │  └──────────────────┘ │
└──────────────────────────────────────┘
```

**Components**:
- Stats widgets (4 cards: appointments, pending, pets, owners)
- Today's appointments list (scrollable, clickable)
- Pending invoices (with payment reminders)
- Low stock alerts (with order buttons)
- Recent activity feed

**Data Source**: GET `/clinic/dashboard`

---

### 3. PETS MANAGEMENT
**Route**: `/pets`  
**Purpose**: View, create, edit, delete pets  
**List Page**:
- Table with columns: Name, Breed, Species, Owner, Status, Upcoming Apt
- Search by name/owner
- Filter by species, health status
- Pagination
- [+ Add New Pet] button
- Row actions: [View] [Edit] [Delete]

**Detail Page** (`/pets/[id]`):
- Pet info (name, breed, age, owner)
- Quick actions: [Schedule Appt] [View Medical] [Create Invoice]
- Upcoming appointments
- Recent medical records (read-only)
- Billing status
- [Edit] [Delete] buttons

**Create/Edit Form** (`/pets/new` or `/pets/[id]/edit`):
- Name, Species, Breed, Gender
- Date of Birth
- Owner (dropdown)
- Weight, Sterilized checkbox
- Microchip ID, Medical Notes
- [SAVE] [CANCEL] buttons

---

### 4. OWNERS/PET PARENTS MANAGEMENT
**Route**: `/owners`  
**Purpose**: Manage pet owners/parents  
**List Page**:
- Table: Name, Phone, Email, # Pets, Last Visit
- Search by name/phone
- [+ Add New Owner] button
- Row actions: [View] [Edit] [Contact] [Delete]

**Detail Page** (`/owners/[id]`):
- Contact info (name, phone, email, address)
- List of pets they own (clickable)
- Appointment history
- Invoice history
- [Edit] [Delete] buttons

**Create/Edit Form**:
- Name, Phone, Email
- Address (optional)
- [SAVE] [CANCEL]

---

### 5. APPOINTMENTS MANAGEMENT
**Route**: `/appointments`  
**Purpose**: Schedule, view, manage appointments  
**Calendar View**:
- Week view (Mon-Sun)
- Time slots (30-min blocks)
- Color-coded by vet
- Appointment cards showing: Time | Pet | Owner | Vet | Reason
- Drag-to-reschedule (optional)
- [+ Schedule New] button
- Filters: Vet, Date Range, Status

**Appointment Details**:
- Pet info, Owner info, Vet, Time, Reason
- [Reschedule] [Mark Complete] [Cancel] buttons
- Notes field

**Schedule Form** (`/appointments/new`):
- Pet (dropdown, required)
- Veterinarian (dropdown, required)
- Date (date picker, required)
- Time (time picker, 30-min blocks available)
- Reason (dropdown)
- Notes (textarea)
- [SCHEDULE] [CANCEL] buttons

**Smart Features**:
- Show available time slots (calculated from existing appointments)
- Warn if vet double-booked
- Show pet's last appointment
- Auto-fill reason if common pattern

---

### 6. BILLING & INVOICES
**Route**: `/billing`  
**Purpose**: Create, track, manage invoices  
**List Page**:
- Table: Invoice #, Pet/Owner, Amount, Status, Due Date, Days Pending
- Status badges: Paid ✓, Pending ⏳, Overdue 🔴
- Filters: [All] [Pending] [Paid] [Overdue]
- Sort by: Date, Amount, Status
- [+ Create New Invoice] button
- Row actions: [View] [Send Reminder] [Mark Paid] [Print] [Delete]

**Invoice Detail** (`/billing/[id]`):
- Invoice header: Invoice #, Date, Due Date
- Pet/Owner info
- Line items (description, qty, unit price, total)
- Subtotal, Discount, Total
- Payment status and date (if paid)
- [Mark as Paid] [Send Reminder] [Print] [Email] [Delete]

**Create Invoice Form** (`/billing/new`):
- Pet (dropdown, required)
- Related Appointment (dropdown, optional)
- Line Items (dynamic):
  - [+ Add Item] button for each line
  - Fields: Description, Quantity, Unit Price (auto-calculates total)
- Discount % (optional)
- Final Amount (auto-calculated, display only)
- Notes (textarea)
- [SAVE & SEND] [SAVE AS DRAFT] [CANCEL] buttons

**Mark Paid Form** (modal):
- Payment Method (dropdown: cash, card, check, UPI, bank transfer)
- Payment Date (date picker)
- Amount (pre-filled)
- Notes (textarea)
- [CONFIRM] [CANCEL]

---

### 7. INVENTORY MANAGEMENT
**Route**: `/inventory`  
**Purpose**: Track medicines, supplies, low stock  
**List Page**:
- Table: Item Name, Category, Qty, Reorder Level, Unit Price, Status
- Status indicator: ✓ OK / ⚠️ LOW / 🔴 OUT
- Search by name
- Filter: [All] [Low Stock] [Out of Stock]
- [+ Add Item] button
- Row actions: [Edit] [Record Usage] [Order Now] [History] [Delete]

**Item Detail/Edit** (`/inventory/[id]`):
- Name, Category, Current Qty
- Reorder Level, Unit Price
- Supplier, Last Restock Date
- Expiry Date (if applicable)
- Stock transaction history
- [SAVE] [DELETE] [RECORD USAGE] buttons

**Add Item Form**:
- Name (required)
- Category (dropdown)
- Quantity (required)
- Reorder Level (required)
- Unit Price (required)
- Supplier (required)
- Expiry Date (optional)
- Notes (textarea)
- [SAVE] [CANCEL]

**Record Usage Form** (modal):
- Item name (display)
- Quantity Change (number, can be negative)
- Reason (dropdown: used for appointment, damaged, expired, etc.)
- Notes (textarea)
- [CONFIRM] [CANCEL]

---

### 8. VET STAFF MANAGEMENT
**Route**: `/staff`  
**Purpose**: Manage veterinarians and staff (admin only)  
**List Page**:
- Table: Name, Role, Email, Phone, Appts Today, Appts This Week
- Filter: [All] [Active] [Inactive]
- [+ Add New Staff] button
- Row actions: [View] [Edit] [Schedule] [Remove]

**Add Vet Form**:
- Name (required)
- Email (required)
- Phone (required)
- Role (dropdown: vet, staff)
- Specialties (multi-select or text)
- [ADD] [CANCEL]

**Edit Form**:
- Same fields as add
- [SAVE] [DELETE] [CANCEL]

---

## 🔐 ACCESS CONTROL

### Role-Based Visibility

**ADMIN** (Full Access):
- ✅ Dashboard (full)
- ✅ Pets (CRUD)
- ✅ Owners (CRUD)
- ✅ Appointments (CRUD)
- ✅ Billing (CRUD + payments)
- ✅ Inventory (CRUD)
- ✅ Staff Management (CRUD)

**STAFF** (Limited Access):
- ✅ Dashboard (limited - no billing)
- ✅ Pets (read-only)
- ✅ Owners (read-only + contact)
- ✅ Appointments (read + create)
- ❌ Billing (hidden)
- ❌ Inventory (hidden)
- ❌ Staff Management (hidden)

**Implementation**:
```typescript
// Example role check in components
if (user.role === 'admin' || user.role === 'staff') {
  show(<Dashboard />)
}

if (user.role === 'admin') {
  show(<BillingSection />)
}
```

---

## ⚙️ TECHNICAL REQUIREMENTS

### Must-Haves
- ✅ Next.js 15+ with App Router
- ✅ TypeScript throughout
- ✅ Tailwind CSS for styling
- ✅ React Query or SWR for API data fetching
- ✅ Form validation (React Hook Form recommended)
- ✅ Error boundaries & fallbacks
- ✅ Loading states (skeleton screens)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility (WCAG 2.1 Level AA minimum)

### API Integration Rules
- ✅ All API calls via centralized client (`lib/api.ts`)
- ✅ Automatic token injection in all requests
- ✅ Error handling with user-friendly messages
- ✅ Loading states during API calls
- ✅ No hardcoded data - everything from API
- ✅ Proper HTTP status code handling

### Environment Variables
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME=Mia VMS
```

### Code Structure Guardrails
- ✅ Components in `src/components/`
- ✅ Pages in `src/app/`
- ✅ Utilities in `src/lib/`
- ✅ Types in `src/types/`
- ✅ Custom hooks in `src/hooks/`
- ✅ No inline API calls - use `lib/api.ts` wrapper
- ✅ Consistent error handling throughout
- ✅ TypeScript strict mode enabled

---

## 🧪 QUALITY STANDARDS

### Before Delivery
- ✅ All pages responsive (mobile, tablet, desktop)
- ✅ All forms have validation feedback
- ✅ All API errors show user-friendly messages
- ✅ Loading states visible during API calls
- ✅ No console errors or warnings
- ✅ Accessibility checked (keyboard navigation, screen readers)
- ✅ Performance acceptable (Lighthouse > 80)

### Testing Checklist
- ✅ Login works
- ✅ Dashboard loads all widgets
- ✅ Can view pet list and details
- ✅ Can create/edit/delete pets
- ✅ Can schedule appointments
- ✅ Can create invoices
- ✅ Can manage inventory
- ✅ Role-based access working
- ✅ All tables sortable/filterable
- ✅ Forms validate correctly
- ✅ Mobile responsive

---

## 📦 DELIVERABLES

When complete, provide:
1. **Full Next.js project** with all components
2. **README.md** with setup & run instructions
3. **API integration complete** and tested
4. **Responsive design** across all breakpoints
5. **Error handling** throughout
6. **TypeScript types** properly defined
7. **Production-ready code** (no TODOs or placeholders)

---

## 🚀 DEPLOYMENT

After Lovable builds:
1. Code will be integrated with backend API
2. End-to-end testing against real backend
3. Deploy to staging server
4. Final QA and user testing
5. Production deployment

---

## 📞 REFERENCE DOCUMENTS

These are the architectural documents you should review:

1. **MVP_UX_REDESIGN_ROLE_BASED.md** — Complete UX workflows and mockups
2. **ADMIN_MVP_TECHNICAL_SPEC.md** — Detailed technical specifications
3. **This brief** — Complete Lovable build specification

All in: `/Users/jishnunarasimhamoorthy/Desktop/Mia/`

---

## ✅ CHECKLIST FOR LOVABLE

Before you start building:

- [ ] You have reviewed MVP_UX_REDESIGN_ROLE_BASED.md
- [ ] You have reviewed ADMIN_MVP_TECHNICAL_SPEC.md
- [ ] You understand the Phase 1 scope (8 main pages)
- [ ] You have the Mobbin design references ready
- [ ] You understand the API endpoints (listed above)
- [ ] You understand role-based access control
- [ ] You have the environment variables set
- [ ] You're using TypeScript throughout
- [ ] You're using Tailwind CSS for styling
- [ ] You understand the project structure

**Questions?** Reference the technical spec documents or ask for clarification.

---

## 🎯 SUCCESS CRITERIA

This build is successful when:
1. ✅ All 8 main pages are functional
2. ✅ API integration works (can fetch/post data)
3. ✅ Role-based access control enforced
4. ✅ Responsive design across devices
5. ✅ Professional UI inspired by Mobbin
6. ✅ Production-ready code quality
7. ✅ Ready for backend integration testing

---

**Status**: Ready for Lovable  
**Expected Timeline**: 5-7 days  
**Backend Integration**: After this build completes

Let's build the best vet clinic admin dashboard! 🚀
