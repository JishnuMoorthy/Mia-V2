# 🚀 LOVABLE KICKOFF PROMPT - COPY & PASTE THIS

---

```
I'm building a Veterinary Management System (VMS) for Indian veterinary clinics. 

I have a COMPLETE backend API running on http://localhost:8000/api/v1 with all endpoints ready.

I need you to build the ADMIN/STAFF DASHBOARD FRONTEND (Phase 1).

GITHUB REPO WITH ALL SPECIFICATIONS:
https://github.com/JishnuMoorthy/mia-s-github-access

READ THESE FIRST (in this order):
1. LOVABLE_BRIEF_PHASE1.md (Complete Phase 1 spec - 8 pages, all endpoints)
2. ENVIRONMENT_SETUP.md (Project setup requirements)
3. BACKEND_INTEGRATION_GUARDRAILS.md (Code structure rules)

TECH STACK (Required):
- Next.js 15+ with App Router
- TypeScript (strict mode)
- Tailwind CSS
- React Query for data fetching
- React Hook Form for forms

PROJECT SCOPE:
8 main pages: Login, Dashboard, Pets, Owners, Appointments, Billing, Inventory, Staff

2 USER ROLES:
- Admin: Full access to everything
- Staff: Limited (can see pets, owners, appointments - read only; no billing, inventory, staff mgmt)

API BASE URL:
http://localhost:8000/api/v1

KEY REQUIREMENTS:
1. All API calls through centralized client (src/lib/api.ts)
2. All data from backend API (no hardcoded data)
3. TypeScript types for everything (src/types/index.ts)
4. Proper error handling & loading states
5. Role-based access control (hide/show features based on user.role)
6. Form validation with error messages
7. Mobile responsive design
8. No console errors

BUILD IN 3 PHASES:
- Phase 1 (Days 1-2): Setup + Login + Auth + Protected routing
- Phase 2 (Days 3-5): Main pages (dashboard, pets, appointments, etc.)
- Phase 3 (Days 6-7): Polish + Responsive + Error handling

DESIGN INSPIRATION:
[I'LL SEND MOBBIN SCREENSHOTS SEPARATELY]
Please use professional healthcare dashboard patterns - clean, organized, user-friendly.

BEFORE YOU START, PLEASE CONFIRM:
1. ✓ You've read LOVABLE_BRIEF_PHASE1.md completely
2. ✓ You understand the 8 pages and all endpoints
3. ✓ You understand the 2-role access control (admin vs staff)
4. ✓ You have questions about anything unclear
5. ✓ You're ready to start Phase 1 setup

Let me know what you need clarified before building!
```

---

## 📋 WHAT TO SEND AFTER

**Once Lovable confirms they're ready, send:**

1. **Your Mobbin design references** (5-10 screenshots)
   - Dashboard layouts
   - Table components
   - Form layouts
   - Mobile responsive examples

2. **This Phase 1 build prompt:**
   ```
   "Now let's build Phase 1: Setup & Authentication (Days 1-2)
   
   Tasks:
   1. Initialize Next.js project with App Router, TypeScript strict, Tailwind, React Query
   2. Create folder structure per ENVIRONMENT_SETUP.md
   3. Build login page (/auth/login) with email/password fields
   4. Build logout functionality (/auth/logout)
   5. Create useAuth() hook for auth state management
   6. Create src/lib/api.ts with login function
   7. Implement protected routing (redirect to /auth/login if not authenticated)
   8. Create main layout (header, sidebar, footer) with navigation
   9. Build empty dashboard page (/dashboard) to verify auth works
   10. TypeScript types for User and auth responses (src/types/index.ts)
   
   Success criteria: After login, should redirect to dashboard. npm run build should have 0 errors.
   
   When done, let me know you're ready for Phase 2 (main pages).
   "
   ```

3. **Then Phase 2 build prompt** (after Phase 1 is done):
   ```
   "Phase 2: Core Features (Days 3-5)
   
   Now build the 8 main pages per LOVABLE_BRIEF_PHASE1.md specifications:
   
   1. Dashboard (/dashboard) - stats, today's appointments, pending invoices, low stock
   2. Pets (/pets) - list, detail, create/edit forms, CRUD
   3. Owners (/owners) - list, detail, create/edit forms, CRUD
   4. Appointments (/appointments) - calendar view, schedule form, CRUD
   5. Billing (/billing) - invoice list, detail, create form, mark as paid, CRUD
   6. Inventory (/inventory) - item list, create/edit, record usage, CRUD
   7. Staff (/staff) - vet management, CRUD (admin only)
   8. Settings (/settings) - user profile (optional)
   
   Each page should:
   - Load real data from API (src/lib/api.ts endpoints)
   - Show loading skeleton while fetching
   - Show error messages if API fails
   - Have sortable/filterable tables where applicable
   - Have working forms with validation
   - Work on mobile and desktop
   
   Reference LOVABLE_BRIEF_PHASE1.md for exact page specifications.
   
   When done, let me know you're ready for Phase 3 (polish).
   "
   ```

---

## ✅ WHAT LOVABLE WILL NEED FROM YOU

**Lovable might ask:**

1. **"Do you have Mobbin design screenshots?"**
   → Yes, send your collected screenshots (5-10 examples)

2. **"Can you clarify the appointment flow?"**
   → Reference LOVABLE_BRIEF_PHASE1.md, section "APPOINTMENTS MANAGEMENT"

3. **"What's the Invoice line items structure?"**
   → Reference BACKEND_INTEGRATION_GUARDRAILS.md, section "TYPES DEFINITION"

4. **"Do I need a database?"**
   → No! All data comes from backend API (http://localhost:8000/api/v1)

5. **"How do I handle authentication?"**
   → Login stores token, include in all API requests. See BACKEND_INTEGRATION_GUARDRAILS.md

6. **"Should I use Next.js Pages or App Router?"**
   → App Router with src/app/ directory (Next.js 15+)

---

## 🎯 SUCCESS CHECKLIST

After Lovable confirms they understand:
- ✓ They've read LOVABLE_BRIEF_PHASE1.md
- ✓ They understand 8 pages scope
- ✓ They understand 2-role access control
- ✓ They have questions answered
- ✓ They're ready to start building

→ **Send Mobbin screenshots + Phase 1 build prompt**

→ **Lovable builds for 5-7 days**

→ **You get production-ready code**

→ **I integrate backend APIs (2-3 days)**

→ **Live in 10-13 days total** 🎉

---

That's it! Simple, clear, efficient. ✅
