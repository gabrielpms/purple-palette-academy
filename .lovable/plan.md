

## Plan: Add "Coming Soon" flag to courses

### Database Change
Add a `is_coming_soon` boolean column (default `false`) to the `courses` table.

### Code Changes

**1. `src/hooks/useCourses.ts`** — Add `is_coming_soon?: boolean` to the `Course` interface.

**2. `src/components/admin/CourseForm.tsx`** — Add a Switch/Checkbox for "Em Breve" in the form, alongside the existing flags (Destaque, Novo, Temporada).

**3. `src/pages/admin/AdminCoursesPage.tsx`** — Show an "Em Breve" badge in the status column when `is_coming_soon` is true.

**4. `src/components/ui/course-card.tsx`** — When `is_coming_soon` is true:
- Add an "Em Breve" badge (distinct styling, e.g. amber/yellow).
- Replace or hide the price, showing "Em Breve" instead.
- Optionally reduce the CTA prominence.

**5. `src/pages/CourseDetailPage.tsx`** — When `is_coming_soon` is true:
- Show a prominent "Em Breve" banner/badge.
- Disable or replace the Hotmart CTA button with a "Coming Soon" state.

