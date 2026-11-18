---
status: ready-for-agent
---

# Point "Book a call" at the new cal.com 15-minute link

## Problem Statement

The site's "Book a call" contact entry links to `https://www.cal.eu/junayed711` and shows the handle `cal.eu/junayed711`. Cal has moved from the `.eu` domain to `.com`, so that link is out of date. Visitors who want to book time should land straight on the 15-minute booking page.

## Solution

The "Book a call" entry links to `https://cal.com/junayed711/15min` and shows the handle `cal.com/junayed711/15min`. Its label stays "Book a call". Every place the contact list appears, which is the home page and the connect page, picks up the change.

## User Stories

1. As a visitor on the home page, I want "Book a call" to open the current cal.com booking page, so that I can book time without hitting a stale domain.
2. As a visitor on the connect page, I want "Book a call" to open the same cal.com booking page, so that both entry points behave the same.
3. As a visitor, I want the handle shown next to "Book a call" to match where the link goes, so that I know what I'm clicking before I click it.
4. As a visitor, I want the link to open the 15-minute event directly, so that I don't have to pick an event type first.
5. As a visitor, I want the booking link to keep opening as an external link like the other contacts do, so that it behaves the same as before.
6. As Junayed, I want no reference to the old `cal.eu` link left in the built site, so that nobody gets sent to the retired domain.
7. As Junayed, I want the change confined to the booking entry, so that the rest of the contact list and page copy stay as they are.

## Implementation Decisions

- The booking contact is defined once, as the `BOOKING` constant in the site constants module, and the contact list component renders it on both pages. Only that constant changes.
- `BOOKING.HREF` becomes `https://cal.com/junayed711/15min`, exactly as given, with no `www.`.
- `BOOKING.HANDLE` becomes `cal.com/junayed711/15min`.
- `BOOKING.NAME` stays `Book a call`.
- The `Contact` type, the contact list component and the pages don't change.

## Testing Decisions

- The repo has no test framework. Its gate is `npm run build` (`astro check && astro build`), and this change adds no test framework.
- The seam is the built site: after the build, the rendered home and connect pages should contain `https://cal.com/junayed711/15min` and the handle `cal.com/junayed711/15min`, and nothing in the build output should contain `cal.eu`. This tests what visitors get, not the constant itself.
- No existing tests cover the old link, so none need removing.

## Out of Scope

- Changing the "Book a call" label, or the contact page's title, description or copy.
- Changing the layout or ordering of the contact list.
- Changing any social links or the SITE constants.
- Anything on Cal's side, such as event configuration or redirects from the old domain.

## Further Notes

- `src/consts.ts` is listed as a risky path only because `SITE_URL` there must match `astro.config.mjs`. This change doesn't touch `SITE_URL`.
