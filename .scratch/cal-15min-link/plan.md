# cal.com Booking Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Point the site's "Book a call" contact at `https://cal.com/junayed711/15min`.

**Architecture:** The booking contact is a single `BOOKING` constant in `src/consts.ts`, which `src/components/ContactList.astro` renders on `/` and `/connect`. Change that constant, then check the built HTML.

**Tech Stack:** Astro 5, TypeScript. No test framework; the gate is `npm run build`.

**Spec:** `.scratch/cal-15min-link/spec.md`

## Handing back to temper

This plan runs inside a temper run. When every task is complete and the final
whole-branch review is clean, end with your list of rulings and hand control back
to `/temper:feature`, which checks the branch and opens the pull request. temper's
finish takes the place of `superpowers:finishing-a-development-branch` here.

While it runs, post a progress line as each task starts, as its review comes back,
and as each fix starts, in the shape `build: task <n>/<total> — <what>`.

## Global Constraints

- `HREF` is exactly `https://cal.com/junayed711/15min` (no `www.`).
- `HANDLE` is exactly `cal.com/junayed711/15min`.
- `NAME` stays `Book a call`.
- Nothing else changes: no `Contact` type, component, page copy, socials or `SITE_URL` changes.
- Commits: subject line only, a plain imperative sentence with no type prefix, no trailing period, no body and no trailer (not even Co-Authored-By).

## Review Focus

- The old `www.cal.eu` URL lingering anywhere in the build output → none expected (checked in Task 1, Step 4).
- Both pages that render the contact list (`/` and `/connect`) → both carry the new URL (checked in Task 1, Step 4).
- `SITE_URL` in the same file accidentally edited → must still match `site` in `astro.config.mjs` (checked by `git diff` in Task 1, Step 4).

---

### Task 1: Swap the booking link

**Files:**
- Modify: `src/consts.ts:41-45` (the `BOOKING` constant)

**Interfaces:**
- Consumes: nothing
- Produces: `BOOKING: Contact` with `NAME`, `HANDLE` and `HREF` as in Global Constraints

- [ ] **Step 1: Build and confirm the check fails on the current link**

Run: `npm run build && grep -l 'https://cal.com/junayed711/15min' dist/index.html dist/connect/index.html`
Expected: the build passes and grep finds no match (exit 1). The new URL isn't there yet.

- [ ] **Step 2: Update `BOOKING` in `src/consts.ts`**

Set `HANDLE` to `cal.com/junayed711/15min` and `HREF` to `https://cal.com/junayed711/15min`. Leave `NAME` as it is.

- [ ] **Step 3: Rebuild**

Run: `npm run build`
Expected: `astro check` reports 0 errors and `astro build` completes.

- [ ] **Step 4: Verify the built output and the diff**

Run: `grep -c 'href="https://cal.com/junayed711/15min"' dist/index.html dist/connect/index.html`
Expected: each file shows a count of at least 1.

Run: `grep -c '>[^<]*cal\.com/junayed711/15min[^<]*<' dist/index.html dist/connect/index.html`
Expected: each file shows a count of at least 1, meaning the handle appears as visible text.

Run: `grep -rl 'cal\.eu' dist`
Expected: no output (exit 1).

Run: `git diff --stat`
Expected: only `src/consts.ts` changed, by two lines.

- [ ] **Step 5: Commit**

```bash
git add src/consts.ts
git commit -m "Point Book a call at the cal.com 15-minute link"
```
