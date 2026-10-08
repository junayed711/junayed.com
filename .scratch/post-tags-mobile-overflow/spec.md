# Post tags overflow the page on small screens

## Symptom

On a narrow screen, a blog post with many tags keeps them all on one line. The
row runs past the right edge of the screen, tags are squeezed so `ai-agents`
breaks across two lines, and the page becomes wider than the screen.

## Expected

Tags that don't fit wrap onto extra lines, as they do on the `/tags/` page. The
page is never wider than the screen.

## How to reach it

Open the post "I gave an AI agent the same bug 11 times. Six commits had files
it never knew about." (six tags) at about 390px wide.

## Out of scope

- How tags look: size, colour, border.
- How many tags a post may have.
- The `/tags/` pages, which already wrap.
- The link row on project pages (`src/pages/projects/[...id].astro`).

## Hypothesis

The tag row in `src/pages/blog/[...id].astro` is a `flex` row without
`flex-wrap`; the `/tags/` page uses `flex flex-wrap`. Not yet tested.
