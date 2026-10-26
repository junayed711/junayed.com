---
status: ready-for-agent
---

# Spec: a launch post for Hodor

## Problem Statement

Hodor (https://hodor.gatebolt.com) is live: eight AI models take turns trying to trick a friendly door-keeper chatbot into giving up a password, and anyone can watch. Nothing on junayed.com says it exists, what it is, or why I built it. I want a post that introduces it in my usual voice, looks interesting enough that people go and watch, and gives me a home I can keep updating as results and odd behaviour come in.

## Solution

A new blog post, "Hold the door: watching AI models try to jailbreak Hodor", the first in a new series, "Watching AI models attack a chatbot". It explains what Hodor is, where the name comes from, why I built it (every battle is data I learn from to improve GateBolt), how a battle and the seven levels work, why Claude won't attack, and where the game stands today. It carries a real, freely licensed photo of Hodor's actor and three screenshots of the live site. It says plainly near the top that it's early and will be updated, and ends with a link to watch the battles. It goes live when merged.

## User Stories

1. As a reader who has never heard of Hodor, I want the opening lines to tell me what it is, so that I know within seconds whether to keep reading.
2. As a reader, I want to know the name comes from the door-keeper in *Game of Thrones* who held the door, so that I get the joke behind the name and the "Hold the door" tagline.
3. As a reader, I want to see a real picture of Hodor, so that the reference lands and the post looks interesting.
4. As the author, I want that picture to be freely licensed and credited, so that I'm not using HBO's images on a site connected to my company.
5. As a reader, I want to know why the game exists, so that I understand it's a source of data on how models attack, used to improve GateBolt, and not just a toy.
6. As a reader, I want to know which GateBolt products Hodor exercises today (Guard) and which come later (Gateway, as a game of its own), so that I'm not misled about what's being tested.
7. As a reader, I want to know who the eight attackers are and that they split into four frontier and four open-weight models, so that I can pick one to follow.
8. As a reader, I want to know the rules of a battle (up to 8 messages, 3 guesses, a model wins only by guessing the password), so that I understand what counts as a win.
9. As a reader, I want to know that viewers can see the password and the attacker's plan but the attacker can't see the password, so that I know what watching is like.
10. As a reader, I want to see a screenshot of a battle in progress, so that I can picture the site before clicking through.
11. As a reader, I want the seven levels explained from no defence, through homemade filters, to GateBolt Guard on replies, messages and the whole conversation, so that I understand where GateBolt comes in.
12. As a reader, I want to see the level grid, so that I can take the ladder in at a glance.
13. As a reader, I want to know how rounds work (a win moves a model up one level; the first past level 7 wins the round and everyone restarts), so that I can follow the race over time.
14. As a reader, I want to know that Claude Opus can't attack because Anthropic blocks the attacker prompt, while Hodor himself runs on Claude Haiku, so that I understand why Opus sits on level 1 at no cost.
15. As a reader, I want a dated "where it stands" section with real numbers, so that I know how far the models have got and when that was true.
16. As a reader, I want to see the leaderboard, so that I can see the standings without leaving the post.
17. As a reader, I want to be told the post is early and will be updated, so that I come back and don't treat it as a final verdict.
18. As a reader, I want a clear link at the end to watch the battles, so that I can go straight to the live site.
19. As a reader following GateBolt, I want this post tagged and grouped in a series, so that I can find it and the posts that follow.
20. As the author, I want the post to read like my other posts (plain, first person, British spelling, short sections, bold bullet leads, no hype), so that the blog has one voice.
21. As the author, I want the post's structure to make it easy to rewrite the "where it stands" section and add odd behaviour as it shows up, so that keeping it current is a small edit.
22. As the author, I want the post to go live when the pull request merges, so that I can share it straight away.
23. As the author, I want nothing in the post to call it marketing, and no mention of Gandalf, so that it says what I want it to say.
24. As a reader on a phone, I want the images to fit the page and carry descriptive alt text, so that the post works on any screen and with a screen reader.

## Implementation Decisions

- One new blog post in the existing blog content collection, in its own folder named `ai-models-vs-hodor`, with its images beside it, following the pattern of the other posts.
- Frontmatter: title "Hold the door: watching AI models try to jailbreak Hodor"; a one-sentence description; date 2026-10-26; `draft: false`; series "Watching AI models attack a chatbot"; order 1; tags gatebolt, ai-agents, security, prompt-injection, red-teaming, hodor. A new series needs no other change, since series are derived from posts.
- Shape, in order:
  1. Opening: what Hodor is in one or two lines.
  2. A note that the post is early and will be updated as results come in.
  3. The name: one line, named after the door-keeper in *Game of Thrones* who held the door, with the photo and its credit.
  4. Why I built it: data on how models actually attack, which I learn from to improve GateBolt; Guard today, Gateway later as a game of its own; anyone can watch.
  5. How a battle works: the eight attackers, the rules, what viewers see; with a battle screenshot.
  6. The seven levels and rounds; with the level-grid screenshot.
  7. Claude won't attack.
  8. Where it stands, dated: the round, battle count, spend, the furthest level reached; with the leaderboard screenshot.
  9. Ending: a link line, `[Watch the battles at hodor.gatebolt.com →](https://hodor.gatebolt.com)`.
- Photo: a freely licensed photo of Kristian Nairn (who played Hodor) from Wikimedia Commons, preferring the Gage Skidmore convention photos (CC BY-SA). Pick the clearest, confirm its licence on its Commons page, and credit it in the caption and alt text, for example "Kristian Nairn, who played Hodor. Photo: Gage Skidmore, CC BY-SA", linking the source and licence. No HBO stills.
- Screenshots: captured from the live site with a headless browser: a battle mid-way (plan, messages, and a filter or guard decision where one exists), the leaderboard, and the About page's level grid. Cropped and sized to suit the blog's width, each with descriptive alt text in the style of the other posts. Showing the password is fine; viewers can see it on the live site.
- Numbers in "where it stands" are read from the live site on the day the post is written, not reused from the grill, and the section names that date.
- Facts about the game come from the hodor repo and the live site:
  - Hodor runs on Claude Haiku 5.5.
  - The attackers are Claude Opus 5.5, GPT-6.1 Sol, Gemini 4 Argon, Grok 4.7, DeepSeek V4 Pro, Qwen3.8 2.4T, Kimi K3 and GLM-5.3.
  - The levels are:
    1. No defence.
    2. Hodor is told to keep it secret.
    3. A homemade filter on replies.
    4. Guard on replies.
    5. A homemade word filter on messages, plus Guard on replies.
    6. Guard on messages and replies.
    7. Guard on the whole conversation.
  - A battle allows 8 messages and 3 guesses. Models are paced to a battle every 22 minutes, with at most 6 per model a day.
- Links: GateBolt to https://gatebolt.com, Hodor to https://hodor.gatebolt.com. No link to the hodor repo, which is private.

## Testing Decisions

- A good test here checks what a reader gets, not how the post is built: the post builds, appears where posts appear, and reads correctly.
- The seam is the repo's existing gate, `npm run build` (astro check and astro build). It validates the frontmatter against the blog schema, resolves the image imports and builds the series page. No new test seam is added.
- Verification on top of the gate: run the preview and check the post on the blog index, its tag pages, the new series page and search, and at phone width. Confirm every image loads and fits, and every link works.
- Prior art: the other posts in the blog collection, which carry no tests of their own and rely on the same gate.

## Out of Scope

- Results posts, patch stories and odd behaviour: these come later, as updates to this post or as new posts in the series.
- Any mention of Lakera's Gandalf.
- Calling the project marketing.
- Stills or clips from *Game of Thrones*, and quotes from the show beyond "hold the door".
- Changes to the hodor repo, the GateBolt site or the blog's layout and components.
- A question to readers at the end.

## Further Notes

- The post is meant to change often. Keep the "where it stands" section self-contained so it can be rewritten without touching the rest.
- The name "Hodor" belongs to HBO and George R.R. Martin. The hodor design doc flagged it for a lawyer's check. The post keeps exposure low by using words only plus a freely licensed photo of the actor.
- Merging to main deploys the live site, so merging publishes the post.
