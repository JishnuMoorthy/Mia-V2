

# Fix: Tailwind CSS v4 Build Error

## Problem
The dev server returns a 500 error because the CSS variables and `@theme inline` block are configured incorrectly for Tailwind v4. Currently:
- `:root` variables store raw HSL values like `210 20% 90%`
- `@theme inline` wraps them with `hsl(var(--border))`

This doesn't work reliably with Tailwind v4's theme resolution.

## Solution
Restructure the CSS so that:
1. `:root` variables store **complete color values** including `hsl()`, e.g. `--border: hsl(210 20% 90%)`
2. `@theme inline` references them with just `var(--border)` (no hsl wrapper)
3. Base layer styles also use `var(--border)` directly (no hsl wrapper)

Same change applies to `.dark` overrides.

## File Changed

**`src/index.css`** -- single file change:

### `@theme inline` block
Remove `hsl()` wrappers from all color references:
```css
@theme inline {
  --color-border: var(--border);
  --color-background: var(--background);
  --color-primary: var(--primary);
  /* ... same pattern for all colors */
}
```

### `:root` and `.dark` blocks
Add `hsl()` to every color variable value:
```css
:root {
  --background: hsl(210 20% 98%);
  --foreground: hsl(220 25% 10%);
  --border: hsl(214 20% 90%);
  /* ... same pattern for all colors */
}
```

### Base layer
Update to use variables directly:
```css
@layer base {
  * { border-color: var(--border); }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
```

## Why This Works
Tailwind v4's `@theme inline` expects the referenced variables to already be valid CSS color values. By moving `hsl()` into the variable definitions themselves, everything resolves correctly at runtime and Tailwind can generate utilities like `bg-background` and `border-border` without errors.

## No Other Files Need Changes
- `AuthContext.tsx` already exists with full implementation
- `src/main.tsx` imports are correct
- All other files are fine -- this is purely a CSS configuration issue

