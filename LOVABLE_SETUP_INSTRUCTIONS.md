# 🚀 LOVABLE PROJECT SETUP INSTRUCTIONS

**IMPORTANT**: Read this FIRST before starting any coding.

---

## ⚠️ REPOSITORY CLARIFICATION

This GitHub repository contains:
- ✅ Backend API (FastAPI/Python) - NOT for you to build
- ✅ Specifications & Documentation - FOR YOU to reference
- ❌ NO Next.js frontend code - You need to BUILD this

---

## 🎯 WHAT YOU NEED TO DO

### STEP 1: Understand the Project
This is a **Veterinary Management System (VMS)** for Indian veterinary clinics.

The backend is already built and running at: `http://localhost:8000/api/v1`

**YOU ARE BUILDING**: The frontend admin dashboard (React/Next.js app)

---

### STEP 2: READ THE SPECIFICATIONS (CRITICAL)

Open these files from the GitHub repo and read them COMPLETELY:

1. **LOVABLE_BRIEF_PHASE1.md**
   - Complete specification of what to build
   - 8 pages you need to create
   - All API endpoints listed
   - Component specifications
   - Design direction

2. **ENVIRONMENT_SETUP.md**
   - Technology stack details
   - Dependencies needed
   - Project folder structure
   - Configuration files

3. **BACKEND_INTEGRATION_GUARDRAILS.md**
   - Code patterns to follow
   - TypeScript types you need
   - API client structure
   - Error handling rules

4. **LOVABLE_KICKOFF_PROMPT.md**
   - Summary of everything
   - Build phases (3 phases over 7 days)

---

### STEP 3: BUILD THE PROJECT

**YOU will use Lovable to:**

1. **Initialize a React/Next.js application** with:
   - Next.js 15+ framework
   - TypeScript
   - Tailwind CSS styling
   - React Query (for API data)
   - React Hook Form (for form handling)

2. **Create the folder structure:**
   ```
   src/
   ├── app/           (pages)
   ├── components/    (reusable UI components)
   ├── lib/           (utilities)
   ├── hooks/         (custom React hooks)
   ├── types/         (TypeScript type definitions)
   └── styles/        (CSS/Tailwind)
   ```

3. **Build 8 main pages:**
   - Login page (/auth/login)
   - Dashboard (/dashboard)
   - Pets management (/pets)
   - Pet Owners (/owners)
   - Appointments (/appointments)
   - Billing/Invoices (/billing)
   - Inventory management (/inventory)
   - Staff/Vet management (/staff)

4. **Implement all features** specified in LOVABLE_BRIEF_PHASE1.md

---

### STEP 4: CONNECT TO BACKEND API

The backend is at: `http://localhost:8000/api/v1`

You will:
- Create API functions to call backend endpoints
- Handle authentication (login → get token)
- Include token in all API requests
- Show loading states while fetching
- Display error messages if API fails

---

### STEP 5: FOLLOW THE 3-PHASE BUILD PROCESS

**Phase 1: Setup & Authentication (Days 1-2)**
- Create empty Next.js project
- Build login page
- Implement authentication
- Create protected routes
- Build empty dashboard

**Phase 2: Core Features (Days 3-5)**
- Build all 8 pages
- Connect to API endpoints
- Create forms for CRUD operations
- Add tables for displaying data

**Phase 3: Polish & Final (Days 6-7)**
- Mobile responsive design
- Error/loading states
- Form validation
- Code cleanup
- README documentation

---

## 📋 WHAT TO BUILD: THE 8 PAGES

### 1. LOGIN PAGE
- Email and password fields
- Submit button
- Error messages
- Success → redirects to dashboard

### 2. DASHBOARD
- 4 stat cards (appointments, invoices, pets, owners)
- Today's appointments list
- Pending invoices section
- Low stock alerts

### 3. PETS MANAGEMENT
- List of all pets (table with search/filter)
- Detail page for each pet
- Create new pet form
- Edit pet form
- Delete pet functionality

### 4. PET OWNERS
- List of all owners (table)
- Detail page for each owner
- Create new owner form
- Edit owner form
- Delete owner functionality

### 5. APPOINTMENTS
- Calendar or week view of appointments
- Schedule new appointment form
- Edit/reschedule/cancel appointments
- Mark complete functionality

### 6. BILLING & INVOICES
- List of invoices (with status: pending, paid, overdue)
- Invoice detail page
- Create invoice form (with line items)
- Mark invoice as paid
- Send payment reminder

### 7. INVENTORY
- List of inventory items (name, quantity, status)
- Create new inventory item
- Edit inventory item
- Record item usage
- Delete items

### 8. STAFF MANAGEMENT (Admin only)
- List of veterinarians/staff
- Create new staff member
- Edit staff
- Delete staff

---

## 🔌 API ENDPOINTS YOU'LL CALL

Authentication:
- `POST /auth/login` - Login

Pets:
- `GET /pets` - List all pets
- `GET /pets/{id}` - Get pet details
- `POST /pets` - Create pet
- `PUT /pets/{id}` - Update pet
- `DELETE /pets/{id}` - Delete pet

Owners:
- `GET /pet_parents` - List owners
- `GET /pet_parents/{id}` - Get owner details
- `POST /pet_parents` - Create owner
- `PUT /pet_parents/{id}` - Update owner
- `DELETE /pet_parents/{id}` - Delete owner

Appointments:
- `GET /appointments` - List appointments
- `POST /appointments` - Create appointment
- `PUT /appointments/{id}` - Update appointment
- `DELETE /appointments/{id}` - Delete appointment

Invoices:
- `GET /invoices` - List invoices
- `POST /invoices` - Create invoice
- `GET /invoices/{id}` - Get invoice details
- `PUT /invoices/{id}` - Update invoice
- `PUT /invoices/{id}/mark-paid` - Mark paid

Inventory:
- `GET /inventory` - List inventory
- `POST /inventory` - Create item
- `PUT /inventory/{id}` - Update item
- `DELETE /inventory/{id}` - Delete item

Dashboard:
- `GET /clinic/dashboard` - Get dashboard stats

---

## 🎨 DESIGN GUIDELINES

Build with:
- ✅ Professional, clean UI (like healthcare dashboards)
- ✅ Blue/teal color scheme
- ✅ Clear typography and spacing
- ✅ Responsive design (works on mobile, tablet, desktop)
- ✅ Easy-to-use forms and tables
- ✅ Clear error/success messages
- ✅ Loading indicators while fetching data

---

## 🔐 IMPORTANT REQUIREMENTS

1. **All data from API** - Don't hardcode any data
2. **Authentication** - Login required, token in every request
3. **Error handling** - Show user-friendly error messages
4. **Loading states** - Show loading while fetching
5. **Form validation** - Validate fields before submitting
6. **Mobile responsive** - Works on all screen sizes
7. **No console errors** - Clean code
8. **TypeScript types** - Type all data and functions

---

## ✅ BUILD CHECKLIST

**Before you start:**
- [ ] Read LOVABLE_BRIEF_PHASE1.md completely
- [ ] Read ENVIRONMENT_SETUP.md 
- [ ] Read BACKEND_INTEGRATION_GUARDRAILS.md
- [ ] Understand the 8 pages to build
- [ ] Understand the API endpoints
- [ ] Ready to start Phase 1

**Phase 1 Success (Days 1-2):**
- [ ] Next.js project initialized
- [ ] Login page created
- [ ] Authentication working
- [ ] Dashboard page created (empty is ok)
- [ ] Navigation working
- [ ] npm run build succeeds with 0 errors

**Phase 2 Success (Days 3-5):**
- [ ] All 8 pages created
- [ ] API calls working (data showing)
- [ ] Forms created and functional
- [ ] Tables displaying data
- [ ] Create/Edit/Delete operations working
- [ ] npm run build succeeds

**Phase 3 Success (Days 6-7):**
- [ ] Mobile responsive verified
- [ ] All error states working
- [ ] All loading states working
- [ ] Form validation working
- [ ] No console errors
- [ ] README.md created

---

## 🚀 HOW TO DELIVER

When you finish building:

1. **Create a GitHub repository** for the frontend code
2. **Push all code** to that repository
3. **Send me the GitHub link**
4. **I will review** against acceptance criteria
5. **Then I'll integrate** with the backend API

---

## 📞 IF YOU HAVE QUESTIONS

- Check **LOVABLE_BRIEF_PHASE1.md** (answers to most questions)
- Check **BACKEND_INTEGRATION_GUARDRAILS.md** (code patterns)
- Check **ENVIRONMENT_SETUP.md** (technical details)
- Ask me in chat (I'll answer with references to the docs)

---

## ⏰ TIMELINE

- **Days 1-2**: Phase 1 (Setup + Auth)
- **Days 3-5**: Phase 2 (Main pages)
- **Days 6-7**: Phase 3 (Polish)
- **Total: 7 days** to MVP frontend

Then I will:
- Review your code (1 day)
- Integrate with backend (2-3 days)
- Test everything (1-2 days)
- Deploy to production (1 day)

**Total: 10-13 days from today to live** 🎉

---

## 🎯 SUCCESS CRITERIA

Your build is successful when:
1. ✅ All 8 pages render without errors
2. ✅ Can login and navigate between pages
3. ✅ All CRUD operations work (create, read, update, delete)
4. ✅ Data loads from API (not hardcoded)
5. ✅ Forms validate and submit successfully
6. ✅ Mobile responsive (test on phone size)
7. ✅ No console errors or warnings
8. ✅ npm run build succeeds with 0 errors
9. ✅ README.md provided with setup instructions

---

## 🎓 START NOW

1. Read all 4 spec documents (1-2 hours)
2. Plan out the pages and components
3. Start Phase 1: Setup + Authentication
4. Build and iterate
5. Deliver when complete

**Let's build the best vet clinic admin dashboard!** 🚀

You've got this! Ask if you need anything clarified.
