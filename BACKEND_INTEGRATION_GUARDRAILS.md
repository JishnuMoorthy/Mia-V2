# 🔧 BACKEND INTEGRATION GUARDRAILS

**Purpose**: Ensure Lovable-built frontend can be seamlessly integrated with FastAPI backend  
**For**: Backend integration team (me) after Lovable delivery  
**Date**: February 12, 2026  

---

## 🎯 CODE STRUCTURE REQUIREMENTS

### Must-Have Files Structure
```
src/lib/api.ts
├── API base URL from env
├── Authentication token management
├── fetch wrapper with error handling
├── All endpoint definitions
└── Type-safe request/response

src/types/index.ts
├── User type
├── Pet type
├── Appointment type
├── Invoice type
├── Inventory type
├── ApiResponse type
└── Error response type

src/hooks/useAuth.ts
├── Current user state
├── Login function
├── Logout function
├── Token management

src/hooks/useApi.ts
├── Automatic token injection
├── Error handling
├── Loading state management
└── Type-safe requests
```

---

## 🔌 API CLIENT PATTERN (Critical for Integration)

### Required: `src/lib/api.ts` Structure

```typescript
// Must export these functions with this exact signature:

export const apiClient = {
  // Auth
  login: (email: string, password: string) => Promise<{
    access_token: string
    user: {
      id: string
      name: string
      email: string
      role: 'admin' | 'staff' | 'vet'
      clinic_id: string
    }
  }>,

  // Pets
  getPets: (params: { skip?: number; limit?: number }) => Promise<PetListResponse>,
  getPetById: (id: string) => Promise<Pet>,
  createPet: (data: CreatePetRequest) => Promise<Pet>,
  updatePet: (id: string, data: UpdatePetRequest) => Promise<Pet>,
  deletePet: (id: string) => Promise<void>,

  // Appointments
  getAppointments: (params: AppointmentFilters) => Promise<AppointmentListResponse>,
  createAppointment: (data: CreateAppointmentRequest) => Promise<Appointment>,
  updateAppointment: (id: string, data: UpdateAppointmentRequest) => Promise<Appointment>,
  deleteAppointment: (id: string) => Promise<void>,
  markAppointmentComplete: (id: string) => Promise<Appointment>,

  // Invoices
  getInvoices: (params: InvoiceFilters) => Promise<InvoiceListResponse>,
  createInvoice: (data: CreateInvoiceRequest) => Promise<Invoice>,
  getInvoiceById: (id: string) => Promise<Invoice>,
  updateInvoice: (id: string, data: UpdateInvoiceRequest) => Promise<Invoice>,
  markInvoicePaid: (id: string, data: MarkPaidRequest) => Promise<Invoice>,
  sendInvoiceReminder: (id: string) => Promise<void>,

  // Inventory
  getInventory: (params: InventoryFilters) => Promise<InventoryListResponse>,
  createInventoryItem: (data: CreateInventoryRequest) => Promise<InventoryItem>,
  updateInventoryItem: (id: string, data: UpdateInventoryRequest) => Promise<InventoryItem>,
  deleteInventoryItem: (id: string) => Promise<void>,

  // Pet Parents/Owners
  getPetParents: (params: PagingParams) => Promise<PetParentListResponse>,
  getPetParentById: (id: string) => Promise<PetParent>,
  createPetParent: (data: CreatePetParentRequest) => Promise<PetParent>,
  updatePetParent: (id: string, data: UpdatePetParentRequest) => Promise<PetParent>,
  deletePetParent: (id: string) => Promise<void>,

  // Users/Vets
  getUsers: (params: UserFilters) => Promise<UserListResponse>,
  createUser: (data: CreateUserRequest) => Promise<User>,
  updateUser: (id: string, data: UpdateUserRequest) => Promise<User>,
  deleteUser: (id: string) => Promise<void>,

  // Dashboard
  getDashboard: () => Promise<DashboardResponse>,
}
```

### Token Management
- ✅ Store token in HTTP-only cookie (preferred) OR localStorage
- ✅ Include token in all requests: `Authorization: Bearer {token}`
- ✅ Handle token expiration (401 responses)
- ✅ Auto-refresh or redirect to login on 401

### Error Handling
```typescript
// All API functions must catch errors and return:
{
  status: 400 | 401 | 403 | 404 | 500
  message: "User-friendly error message"
  details?: "Technical details for logging"
}
```

---

## 📝 TYPES DEFINITION GUARDRAILS

### Must-Have Types in `src/types/index.ts`

```typescript
// User/Auth
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'staff' | 'vet'
  clinic_id: string
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: User
}

// Pet
export interface Pet {
  id: string
  name: string
  species: string // 'Dog' | 'Cat' | 'Rabbit' etc
  breed: string
  gender: 'male' | 'female'
  date_of_birth: string // ISO 8601
  pet_parent_id: string
  clinic_id: string
  weight_kg?: number
  is_sterilized: boolean
  microchip_id?: string
  medical_notes?: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface CreatePetRequest {
  name: string
  species: string
  breed: string
  gender: 'male' | 'female'
  date_of_birth: string
  pet_parent_id: string
  weight_kg?: number
  is_sterilized: boolean
  microchip_id?: string
  medical_notes?: string
}

// Appointment
export interface Appointment {
  id: string
  pet_id: string
  vet_id: string
  clinic_id: string
  appointment_date: string // ISO date
  start_time: string // HH:MM
  end_time: string // HH:MM
  reason: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  notes?: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface CreateAppointmentRequest {
  pet_id: string
  vet_id: string
  appointment_date: string
  start_time: string
  end_time: string
  reason: string
  notes?: string
}

// Invoice
export interface Invoice {
  id: string
  invoice_number: string
  pet_id: string
  clinic_id: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface InvoiceLineItem {
  description: string
  quantity: number
  unit_price: number
  total: number // quantity * unit_price
}

export interface CreateInvoiceRequest {
  pet_id: string
  appointment_id?: string
  line_items: InvoiceLineItem[]
  discount_percent?: number
  notes?: string
}

// Inventory
export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  low_stock_threshold: number
  unit_price: number
  supplier?: string
  expiry_date?: string
  clinic_id: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

// List Responses
export interface PetListResponse {
  items: Pet[]
  total: number
  skip: number
  limit: number
}

export interface ApiResponse<T> {
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, any>
  }
}

// Pagination
export interface PagingParams {
  skip?: number
  limit?: number
}

// Filters
export interface AppointmentFilters extends PagingParams {
  date_from?: string
  date_to?: string
  vet_id?: string
  status?: string
}

export interface InvoiceFilters extends PagingParams {
  status?: 'paid' | 'pending' | 'overdue'
  pet_id?: string
}
```

---

## 🔒 AUTHENTICATION GUARDRAILS

### Login Flow Requirements
```
1. User submits email + password on /auth/login page
2. POST to /auth/login endpoint
3. Receive token + user data
4. Store token (HTTP-only cookie preferred)
5. Store user data in context/state
6. Redirect to /dashboard
7. All subsequent requests include token in Authorization header
```

### Protected Routes
- ❌ `/auth/login` — anyone (should redirect to dashboard if already logged in)
- ✅ `/dashboard` — authenticated users only
- ✅ `/pets`, `/appointments`, `/billing`, `/inventory`, `/staff` — authenticated admin/staff only
- ✅ `/settings` — authenticated users only

### Logout
- Clear token from storage
- Clear user state
- Redirect to `/auth/login`

---

## 📊 DATA FETCHING PATTERNS

### Must Use (For Integration)
```typescript
// ✅ Centralized API client
import { apiClient } from '@/lib/api'

// ✅ React Query or SWR for data fetching
const { data: pets, isLoading, error } = useQuery({
  queryKey: ['pets'],
  queryFn: () => apiClient.getPets({ limit: 50 })
})

// ✅ Proper error boundaries
if (error) return <ErrorComponent message={error.message} />
if (isLoading) return <LoadingSkeleton />
return <PetsList data={pets} />
```

### Cannot Use (Will Break Integration)
```typescript
// ❌ Hardcoded data
const pets = [{ id: 1, name: 'Buddy' }]

// ❌ Inline fetch calls
fetch('http://localhost:8000/api/v1/pets')

// ❌ No error handling
const data = await api.getPets()

// ❌ No loading states
return <PetsList data={data} /> // What if data is undefined?
```

---

## 🛡️ ERROR HANDLING REQUIREMENTS

### All API Calls Must Handle:
```typescript
try {
  const data = await apiClient.getPets()
  // Use data
} catch (error) {
  if (error.status === 401) {
    // Redirect to login
    navigate('/auth/login')
  } else if (error.status === 403) {
    // Show "Access Denied"
    showNotification('You do not have permission', 'error')
  } else if (error.status === 404) {
    // Show "Not Found"
    showNotification('Resource not found', 'error')
  } else if (error.status >= 500) {
    // Show "Server Error"
    showNotification('Server error. Please try again later', 'error')
  } else {
    // Show generic error
    showNotification(error.message, 'error')
  }
}
```

### Error Messages Must Be:
- ✅ User-friendly (not technical stack traces)
- ✅ Actionable (tell user what to do)
- ✅ Logged for debugging (include details)

---

## 🎨 UI/UX GUARDRAILS

### Loading States
- ✅ Show skeleton screens while fetching
- ✅ Show spinners in modals/forms while submitting
- ✅ Disable buttons while loading
- ✅ Never show blank/broken UI during load

### Empty States
- ✅ Show message when no pets: "No pets found. [+ Create Pet]"
- ✅ Show message when no appointments: "No appointments. [+ Schedule]"
- ✅ Offer clear action to create item

### Validation Feedback
- ✅ Show field-level errors under inputs
- ✅ Highlight invalid fields in red
- ✅ Show success message on form submission
- ✅ Clear errors when user fixes field

### Responsive Design
- ✅ Mobile: Single column, stacked layout
- ✅ Tablet: 2-column where appropriate
- ✅ Desktop: Full multi-column layouts
- ✅ Touch targets: Min 44px height on mobile
- ✅ Readable text: Min 16px on mobile

---

## 🧪 TESTING CHECKLIST FOR INTEGRATION

Before handing off to backend integration:

- [ ] Login page works (can login with valid credentials)
- [ ] Unauthorized access redirects to login
- [ ] Dashboard loads without errors
- [ ] Pet list loads and displays
- [ ] Can create a new pet
- [ ] Can edit a pet
- [ ] Can delete a pet
- [ ] Can schedule an appointment
- [ ] Can create an invoice
- [ ] Can add inventory item
- [ ] All tables sort/filter correctly
- [ ] All forms validate correctly
- [ ] Role-based access working (admin vs staff)
- [ ] Responsive design on mobile
- [ ] No console errors or warnings
- [ ] Error messages display correctly
- [ ] Loading states show during API calls
- [ ] Logout works and clears session

---

## 📦 DELIVERABLE CHECKLIST

Lovable must deliver:

- [ ] Full Next.js project structure
- [ ] All 8 main pages functional
- [ ] `src/lib/api.ts` with all endpoints
- [ ] `src/types/index.ts` with all types
- [ ] `src/hooks/useAuth.ts` and `src/hooks/useApi.ts`
- [ ] All components responsive and accessible
- [ ] Proper error handling throughout
- [ ] Loading states on all data-fetching components
- [ ] Role-based access control working
- [ ] README with setup instructions
- [ ] No hardcoded data
- [ ] TypeScript strict mode enabled
- [ ] Production-ready code quality

---

## 🔄 INTEGRATION WORKFLOW

### Step 1: Receive Code from Lovable
- Clone the Next.js project
- Install dependencies
- Verify structure matches guardrails

### Step 2: Backend Integration
- Verify API endpoints exist in FastAPI backend
- Test each endpoint with Postman/curl
- Create `src/lib/api.ts` if Lovable didn't
- Integrate authentication
- Wire up all API calls

### Step 3: Testing
- Test login flow
- Test each page's data loading
- Test error scenarios (404, 500, etc.)
- Test role-based access
- Test on mobile/tablet/desktop

### Step 4: Deployment
- Build and verify no errors
- Deploy to staging
- Final testing in staging environment
- Deploy to production

---

## 🚀 INTEGRATION SUCCESS

This Phase 1 frontend is successfully integrated when:

1. ✅ All pages load from backend data
2. ✅ No hardcoded test data visible
3. ✅ Authentication working end-to-end
4. ✅ All CRUD operations functional
5. ✅ Role-based access enforced
6. ✅ Error handling working properly
7. ✅ Responsive design verified
8. ✅ No errors in browser console
9. ✅ Admin & staff can use all features
10. ✅ Ready for production deployment

---

## � SECURITY GUARDRAILS

### No Production Secrets in Code
- ✅ API base URL from environment variable (NEXT_PUBLIC_API_BASE_URL)
- ✅ No hardcoded API keys, tokens, or credentials
- ✅ No console.log() of sensitive data (tokens, passwords)
- ✅ Remove all TODO/FIXME comments before delivery
- ✅ `.env.local` in `.gitignore` (NEVER committed)

### Authentication Security
- ✅ Token stored in HTTP-only, Secure cookie (preferred) or localStorage
- ✅ CSRF protection if using cookies for state mutations
- ✅ Token refresh strategy implemented (handle 401 responses)
- ✅ Token expiration handling (redirect to login on 401)
- ✅ Logout clears all sensitive data

### API Security
- ✅ All requests use HTTPS in production (configured via env var)
- ✅ CORS headers properly configured on backend
- ✅ Input validation on all forms (client-side + server-side)
- ✅ Output encoding prevents XSS (use React's default escaping)
- ✅ No dangerouslySetInnerHTML usage

### Dependency Security
- ✅ No known vulnerabilities: `npm audit` passes
- ✅ Dependencies updated regularly
- ✅ Lock file (package-lock.json) committed

---

## 🚀 PERFORMANCE GUARDRAILS

### Build & Runtime Performance
- ✅ Production build < 250KB gzipped (JavaScript)
- ✅ First Contentful Paint < 2 seconds
- ✅ Largest Contentful Paint < 2.5 seconds
- ✅ Cumulative Layout Shift < 0.1
- ✅ Interaction to Next Paint < 100ms

### Lighthouse Scores
- ✅ Desktop Performance > 80
- ✅ Mobile Performance > 75
- ✅ Accessibility > 85
- ✅ Best Practices > 85
- ✅ SEO > 80

### Runtime Optimization
- ✅ API calls debounced/throttled (search, filter, etc.)
- ✅ Images lazy-loaded with `next/image`
- ✅ Code splitting enabled (Next.js automatic)
- ✅ No N+1 API calls (batch where possible)
- ✅ No memory leaks (proper cleanup in useEffect)
- ✅ Pagination prevents loading massive lists

### Monitoring & Observability
- ✅ Error boundary on all pages (catch render errors)
- ✅ Structured error logging (not just console.error)
- ✅ API errors logged for debugging
- ✅ Performance metrics available (Web Vitals)

---

## ♿ ACCESSIBILITY GUARDRAILS

### WCAG 2.1 Level AA Compliance

**Semantic HTML:**
- ✅ Proper heading hierarchy (h1 → h2 → h3, not skipped)
- ✅ All form inputs have associated `<label>` elements
- ✅ All buttons use `<button>` (not divs with click handlers)
- ✅ All links use `<a>` tags
- ✅ Nav landmarks: `<nav>`, `<main>`, `<footer>`
- ✅ Lists use `<ul>`, `<ol>`, `<li>` properly

**Keyboard Navigation:**
- [ ] Can tab through all interactive elements (buttons, inputs, links)
- [ ] Focus indicator visible on all elements
- [ ] No keyboard traps (can always tab away)
- [ ] Tab order logical and predictable (left-to-right, top-to-bottom)
- [ ] Modals trap focus properly (and release on close)
- [ ] Dropdown menus keyboard accessible (arrows, enter, escape)

**Color & Contrast:**
- ✅ Text contrast 4.5:1 minimum (normal text)
- ✅ Text contrast 3:1 minimum (large text, UI components)
- ✅ Color not the only way to convey information (use icons/text)
- ✅ Status badges have text labels (not just color)
- ✅ Links distinguishable from surrounding text

**Screen Reader Support:**
- ✅ Images have alt text (alt="description") or role="presentation"
- ✅ Icon-only buttons have aria-label
- ✅ Form errors announced to screen readers (aria-live)
- ✅ Page title meaningful and unique (`<title>` tag)
- ✅ Heading structure matches page content
- ✅ Skip to main content link (not visible by default)

**Testing Checklist:**
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Tab through entire app using keyboard only
- [ ] Test with browser zoom at 200%
- [ ] Test with Windows High Contrast mode
- [ ] Use axe DevTools or WAVE audit tool
- [ ] Test with keyboard only (no mouse)

---

## 📊 GUARDRAIL ENFORCEMENT

When I integrate the backend, I will:

1. ✅ Verify all types match API responses
2. ✅ Test all API client functions
3. ✅ Verify error handling works
4. ✅ Check role-based access control
5. ✅ Test all pages end-to-end
6. ✅ Verify loading/error states
7. ✅ Check responsive design
8. ✅ Run accessibility audit (axe DevTools)
9. ✅ Run security audit (OWASP Top 10)
10. ✅ Verify performance targets met (Lighthouse)
11. ✅ Optimize and deploy
12. ✅ Monitor in production

---

**These guardrails ensure a seamless handoff from Lovable → Backend Integration** 🎯
