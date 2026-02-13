

# Phase 1 MVP — Clean Rebuild Plan

## Current Status

Phase 1 is **~90% complete**. The application code (login, auth, dashboard, layout, types, API client) is well-built and follows all the spec requirements. The sole blocker is a Tailwind CSS v4 build failure that prevents the preview from rendering.

## What Needs to Be Done

### Step 1: Fix the CSS Build (Root Cause Fix)

The `src/index.css` file uses Tailwind v4's `@theme inline` directive with CSS custom properties. The current configuration looks correct structurally, but the Google Fonts `@import url()` statement placed after `@import "tailwindcss"` may be causing the PostCSS pipeline to fail.

**Fix:**
- Move the Google Fonts import into `index.html` as a `<link>` tag instead of a CSS `@import url()`
- Simplify the `@theme inline` block to only register colors that are actually used in components
- Ensure `postcss.config.js` has only `@tailwindcss/postcss` (already correct)

### Step 2: Verify All Existing Pages Render

Once CSS compiles:
- Login page renders with proper styling (teal primary, card layout, form inputs)
- Protected route redirects unauthenticated users to `/login`
- Dashboard layout renders with dark sidebar, header, and content area
- Dashboard page shows stat cards, appointment list, and low stock alerts
- Role-based sidebar items hide correctly for non-admin users
- Logout clears session and redirects to login

### Step 3: Add Missing Phase 1 Polish

Minor items from the spec not yet implemented:
- **"Remember me" checkbox** on login (optional per spec)
- **Redirect logic**: If already logged in, `/login` should redirect to `/dashboard`

## Technical Details

### File Changes

**`index.html`** — Add Google Fonts link tag:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
```

**`src/index.css`** — Remove the `@import url()` line for Google Fonts (keep everything else as-is)

**`src/pages/Login.tsx`** — Add redirect if already authenticated:
```typescript
const { token } = useAuth();
if (token) return <Navigate to="/dashboard" replace />;
```

### No Changes Needed (Already Correct)
- `src/lib/api.ts` — All endpoints match the backend spec
- `src/types/index.ts` — All types match the database schema
- `src/contexts/AuthContext.tsx` — Full auth flow with token validation
- `src/hooks/useAuth.ts` — Clean context hook
- `src/components/ProtectedRoute.tsx` — Auth guard with loading state
- `src/components/DashboardLayout.tsx` — Sidebar + header + responsive
- `src/pages/Dashboard.tsx` — Stats, appointments, low stock alerts
- `src/App.tsx` — Route structure with protected routes
- `src/main.tsx` — Providers (BrowserRouter, QueryClient, AuthProvider, Toaster)

## Phase 1 Completion Checklist

After these changes:
- [x] Login page with phone/password and validation
- [x] Auth state management (login, logout, token storage)
- [x] Protected routing (redirect to login if unauthenticated)
- [x] Dashboard layout (sidebar, header, responsive)
- [x] Dashboard page (stats, appointments, low stock)
- [x] Role-based access (admin vs staff sidebar items)
- [x] API client with all endpoints
- [x] TypeScript types for all models
- [x] Login redirect when already authenticated
- [x] CSS compiles and renders correctly

## What Comes Next (Phase 2)

After Phase 1 is verified working, Phase 2 adds the 6 CRUD pages:
1. Pets management (list, detail, create/edit)
2. Owners management (list, detail, create/edit)
3. Appointments (list/calendar, schedule, manage)
4. Billing (invoices, payments, mark paid)
5. Inventory (stock tracking, low stock alerts)
6. Staff management (admin only, vet CRUD)

