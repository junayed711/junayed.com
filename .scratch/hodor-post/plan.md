# Hodor Launch Post Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a new blog post, "Hold the door: watching AI models try to jailbreak Hodor", with a credited photo of Hodor's actor and three screenshots of the live site.

**Architecture:** One new folder in the blog content collection holding `index.md` and its images, exactly like the existing posts. Images are referenced with relative Markdown paths (`./name.png`), and Astro resolves and optimises them at build time. The new series page comes for free from `src/lib/series.ts`.

**Tech Stack:** Astro 5 content collections (Markdown), Playwright's cached Chromium for screenshots (`npx playwright screenshot` or a short script run from the scratchpad), macOS `sips` for resizing.

**Spec:** `.scratch/hodor-post/spec.md`. Read it in full before starting either task.

## Handing back to temper

This plan runs inside a temper run. When every task is complete and the final
whole-branch review is clean, end with your list of rulings and hand control back
to `/temper:feature`, which checks the branch and opens the pull request. temper's
finish takes the place of `superpowers:finishing-a-development-branch` here.

While it runs, post a progress line as each task starts, as its review comes back,
and as each fix starts, in the shape `build: task <n>/<total> — <what>`.

## Global Constraints

- Post folder: `src/content/blog/ai-models-vs-hodor/`.
- Frontmatter, verbatim:
  - title: "Hold the door: watching AI models try to jailbreak Hodor"
  - date: "2026-10-26"
  - draft: false
  - series: "Watching AI models attack a chatbot"
  - order: 1
  - tags: gatebolt, ai-agents, security, prompt-injection, red-teaming, hodor
- Voice: match the existing posts in `src/content/blog/` (read `same-bug-eleven-times`, `how-i-test-gatebolt-gateway` and `a-lab-for-testing-gatebolt-gateway` first):
  - plain, first person, British spelling, no hype;
  - short sections with `##` headings;
  - bullets that start with a bold lead-in;
  - descriptive alt text on every image.
- Never use the word "marketing". Never mention Gandalf or Lakera. Never quote *Game of Thrones* beyond "hold the door". Never use stills from the show.
- Links:
  - GateBolt: https://gatebolt.com
  - Hodor: https://hodor.gatebolt.com
  - Never link the hodor GitHub repo; it's private.
- Hodor exercises GateBolt **Guard** today. **Gateway** comes later "as a game of its own". Don't claim Gateway is tested.
- Images: at most 1600px wide, `.png` for screenshots, `.jpg` for the photo.
- Gate: `npm run build` (runs `astro check && astro build`). The worktree has no `node_modules`; run `npm ci` once first.
- Commits: subject line only, no body, no trailer (not even Co-Authored-By), no type prefix, no trailing period; a plain imperative sentence.

## Review Focus

1. **Licence drift on the photo.** The Commons file must really be CC BY-SA or more permissive. The caption must name the photographer and the licence and link both the file page and the licence. Check the file's own Commons page, not the search result.
2. **Stale numbers.** "Where it stands" must use figures read from https://hodor.gatebolt.com/rounds and /leaderboard on the day of writing, with the date in the section, not the grill's 53 battles / $0.82.
3. **Phone width.** Tall or very wide screenshots become unreadable on a 375px screen. Crop to the part that matters: a battle screenshot shows a few steps, not the whole page.
4. **Fact accuracy.** Model names, level descriptions, battle limits and pacing must match the spec's list exactly. A wrong model name or level is the most likely factual error.
5. **Series and tag pages.** A new series name with a typo creates a second series. The series page must build at `/series/watching-ai-models-attack-a-chatbot/` (or whatever `seriesSlug` produces) and list this post.

---

### Task 1: Capture the images

**Files:**
- Create: `src/content/blog/ai-models-vs-hodor/hodor-kristian-nairn.jpg`
- Create: `src/content/blog/ai-models-vs-hodor/battle.png`
- Create: `src/content/blog/ai-models-vs-hodor/levels.png`
- Create: `src/content/blog/ai-models-vs-hodor/leaderboard.png`

**Interfaces:**
- Produces, for Task 2:
  - the four filenames above;
  - a credit line for the photo: photographer, licence name, Commons file URL and licence URL;
  - the battle's id/URL and a one-line description of what the battle screenshot shows, for its alt text;
  - the numbers visible on the leaderboard screenshot.
  Put these in the task's report.

- [ ] **Step 1: Choose and download the photo.** Search Wikimedia Commons for Kristian Nairn photos, preferring `File:Kristian Nairn by Gage Skidmore 2.jpg` / `3.jpg`. Open the file's Commons page (the API's `imageinfo` with `extmetadata` gives `LicenseShortName`, `Artist` and `LicenseUrl`) and confirm the licence is CC BY-SA or more permissive. Download it and save it as `hodor-kristian-nairn.jpg`, resized with `sips --resampleWidth 1200` if it's wider than 1600px.

- [ ] **Step 2: Capture the battle screenshot.** Find a finished battle on the live site with a clear attack: plan, a few messages, Hodor's replies, and a guess. Battles are listed from the home page's replay, the hall of fame or rounds pages, and each has a `/battle/<id>` URL. Prefer one that shows a filter or guard decision if any exists; none may exist yet, since no model has passed level 2, and that's fine. Screenshot it with Playwright's cached Chromium at a 1280px-wide viewport in light mode, cropped to the conversation. Save it as `battle.png`, at most 1600px wide.

- [ ] **Step 3: Capture the level grid.** Screenshot the level grid on https://hodor.gatebolt.com/about the same way, cropped to the grid. Save it as `levels.png`.

- [ ] **Step 4: Capture the leaderboard.** Screenshot https://hodor.gatebolt.com/leaderboard the same way, cropped to the table. Save it as `leaderboard.png`. Also read and note today's figures from https://hodor.gatebolt.com/rounds: round number, battles, total spend, each model's level.

- [ ] **Step 5: Check the images.** Run `file src/content/blog/ai-models-vs-hodor/*`. Expected: four images, each at most 1600px wide. Open each one with the Read tool and confirm it's legible and shows what its name says.

- [ ] **Step 6: Commit**

```bash
git add src/content/blog/ai-models-vs-hodor/
git commit -m "Add the photo and screenshots for the Hodor post"
```

---

### Task 2: Write the post

**Files:**
- Create: `src/content/blog/ai-models-vs-hodor/index.md`

**Interfaces:**
- Consumes: Task 1's four image files, the photo credit line, the battle description and today's numbers.

- [ ] **Step 1: Write the frontmatter.** Use the Global Constraints values, plus a one-sentence `description`, in the style of the other posts. For example: "Eight AI models take turns trying to trick a friendly door-keeper chatbot into giving up a password. Here's how the game works, and why I built it."

- [ ] **Step 2: Write the body, in the spec's order.**
  1. **Opening:** what Hodor is, in one or two lines, linking https://hodor.gatebolt.com and GateBolt.
  2. **Early note:** a plain sentence that it's early and the post will be updated as results come in. Model it on the lab post's "I'll update this post after the first run".
  3. **The name:** one line, "named after the door-keeper in *Game of Thrones* who held the door". Add the photo with descriptive alt text, then an italic caption line crediting it. For example: `*Kristian Nairn, who played Hodor. Photo: [Gage Skidmore](<file page>), [CC BY-SA 2.0](<licence url>).*` Use the real licence version from Task 1.
  4. **Why I built it:** every battle is data on how models actually attack, which I learn from to improve GateBolt. Guard today, Gateway later as a game of its own. Anyone can watch.
  5. **How a battle works:**
     - the eight attackers, named, split four frontier / four open-weight;
     - Hodor runs on Claude Haiku 5.5;
     - up to 8 messages and 3 guesses, and a model wins only by guessing the password, not by getting Hodor to say it;
     - viewers see the password and the attacker's plan; the attacker doesn't see the password;
     - with `battle.png`.
  6. **The seven levels:** the spec's exact list of levels, then rounds: a win moves a model up one level, the first past level 7 wins the round, and everyone restarts at level 1. Pacing: a battle every 22 minutes, at most 6 per model a day. With `levels.png`.
  7. **Claude won't attack:** Anthropic blocks the attacker prompt, so Opus can't play and sits on level 1 at no cost, while Hodor himself runs on Haiku.
  8. **Where it stands:** a `##` section whose first line names the date. Include the round, battles so far, total spend and the furthest level reached, using Task 1's numbers. Say plainly that no model has yet reached a level GateBolt guards, if that's still true. With `leaderboard.png`. Keep the section self-contained so it can be rewritten alone.
  9. **Ending:** a `---` rule, then `[Watch the battles at hodor.gatebolt.com →](https://hodor.gatebolt.com)`. This matches the end of `how-i-priced-layzer`.

- [ ] **Step 3: Install and run the gate**

Run: `npm ci && npm run build`
Expected: `astro check` reports 0 errors and the build completes. The output lists `/blog/ai-models-vs-hodor/index.html` and a `/series/<slug>/index.html` for the new series.

- [ ] **Step 4: Check the built pages**

Run: `ls dist/blog/ai-models-vs-hodor/ dist/series/ && grep -c "Hold the door" dist/blog/index.html dist/tags/hodor/index.html`
Expected: the post folder exists, the new series folder exists, and both greps count at least 1.

- [ ] **Step 5: Scan the copy against the constraints**

Run: `grep -niE "marketing|gandalf|lakera|github.com/gatebolt/hodor" src/content/blog/ai-models-vs-hodor/index.md`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add src/content/blog/ai-models-vs-hodor/index.md
git commit -m "Add a post introducing Hodor"
```
