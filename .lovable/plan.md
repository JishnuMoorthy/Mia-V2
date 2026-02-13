

# Fix: Tailwind CSS v4 Compatibility

## Problem
Tailwind CSS v4 uses a completely new configuration approach. The current setup mixes v4's `@import "tailwindcss"` with the legacy `tailwind.config.ts` file via `@config`, which doesn't work. This causes the build to fail silently, resulting in a blank preview.

## Solution
Convert the theme from `tailwind.config.ts` into Tailwind v4's CSS-based `@theme` directive inside `src/index.css`, and remove the legacy config reference.

## Changes

### 1. Rewrite `src/index.css`
- Remove `@config "../tailwind.config.ts"`
- Add a `@theme` block defining all custom colors, border-radius, and fonts using CSS variables
- Keep the existing CSS variable definitions in `:root` and `.dark`
- Replace `@apply border-border` with plain CSS (`border-color: hsl(var(--border))`)

### 2. Delete `tailwind.config.ts`
- No longer needed -- all configuration lives in CSS now

### 3. Update `postcss.config.js`
- Remove `autoprefixer` (Tailwind v4 handles it automatically)

## Why This Fixes It
Tailwind v4 has its own module system. By using `@theme` to register custom utility values, classes like `bg-background`, `text-foreground`, and `border-border` become valid utilities that the compiler recognizes.

