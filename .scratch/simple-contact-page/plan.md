# Simple Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Handing back to temper

This plan runs inside a temper run. When every task is complete and the final
whole-branch review is clean, end with your list of rulings and hand control back
to `/temper:feature`, which checks the branch and opens the pull request. temper's
finish takes the place of `superpowers:finishing-a-development-branch` here.

While it runs, post a progress line as each task starts, as its review comes back,
and as each fix starts, in the shape `build: task <n>/<total> — <what>`.

**Goal:** Replace the prose-heavy "Let's Connect" block with a five-row contact list (name left, handle right, Copy button on email) on the contact page and the home page, and rename the page to "Contact".

**Architecture:** Contact details move into `src/consts.ts`. A new `ContactList.astro` component renders the rows from those constants and carries one delegated click handler for the Copy button; it replaces `ConnectContent.astro`, which is deleted. The contact page and the home page section both render it. The URL stays `/connect/`.

**Tech Stack:** Astro 5 (static output, `ClientRouter` page transitions), Tailwind CSS 4, TypeScript. No test runner.

**Spec:** `.scratch/simple-contact-page/spec.md`

## Global Constraints

- **Declare before editing.** This repo runs GateBolt strict mode. Before editing any file, run `gatebolt declare --task "<one line>" --vendor claude_code --name "Claude Code" --model <your-model-id> --file <path> [--file <path> ...]` listing every file the task creates, modifies or deletes. Edits before declaring are blocked.
- **Git commands are plain and separate.** Run each `git` command on its own, with no `&&`, pipes or `cd`. The session is isolated to this worktree and refuses compound git commands.
- **Commit messages:** subject line only. No body, no trailer (no `Co-Authored-By`), no type prefix, no trailing period. A plain imperative sentence.
- **The gate is `npm run build`** (`astro check && astro build`). It must finish with 0 errors. There is no test runner; do not add one.
- **Do not touch:** `astro.config.mjs`, `SITE_URL` in `src/consts.ts`, `src/components/Head.astro`, `src/layouts/Layout.astro`, `public/`, `.github/`.
- **The URL stays `/connect/`.** The page file stays `src/pages/connect.astro`. No redirect.
- **Rows, in this exact order and with these exact values:** Email `hello@junayed.com`; Book a call `cal.eu/junayed711`; LinkedIn `in/junayed711`; X `@junayed711`; GitHub `junayed711`.
- **Copy:** the page heading, home section heading and page title are `Contact`; the nav label is `contact`; the button reads `Copy`, then `Copied` for two seconds.
- No intro text, no icons, no arrows on the rows.
- Format with the repo's Prettier config: `npx prettier --write <files you changed>`.

## Review Focus

1. **Clipboard unavailable** (insecure origin, permission denied): the button must not show "Copied" when nothing was copied. Pinned in Task 2, Step 6.
2. **Arriving at the page by an in-site link** rather than a fresh load: Copy must still work, and must not fire twice. Pinned in Task 2, Step 6.
3. **Pressing Copy twice within two seconds:** the label returns to "Copy" once, two seconds after the last press, not early. Pinned in Task 2, Step 6.
4. **A 320px-wide screen:** the longest row (`hello@junayed.com` plus the Copy button) must not cause sideways scrolling; the value truncates. Pinned in Task 2, Step 6.
5. **The home page's structured data:** `sameAs` must still hold exactly the three social profile URLs and must not gain the calendar link. Pinned in Task 1, Step 4.

---

### Task 1: Contact data in the site constants

**Files:**
- Modify: `src/types.ts`
- Modify: `src/consts.ts` (the `SOCIALS` block only, plus one new export)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type Contact = { NAME: string; HANDLE: string; HREF: string }` and `type Socials = Contact[]`, exported from `@types`.
  - `SOCIALS: Socials` from `@consts`, in the order LinkedIn, X, GitHub, each with a `HANDLE`.
  - `BOOKING: Contact` from `@consts`.

- [ ] **Step 1: Declare the files**

```bash
gatebolt declare --task "Add handles and booking link to contact constants" --vendor claude_code --name "Claude Code" --model <your-model-id> --file src/types.ts --file src/consts.ts
```

- [ ] **Step 2: Update the types**

In `src/types.ts`, replace the `Socials` type with:

```ts
export type Contact = {
  NAME: string;
  HANDLE: string;
  HREF: string;
};

export type Socials = Contact[];
```

- [ ] **Step 3: Update the constants**

In `src/consts.ts`, change the import on line 1 to:

```ts
import type { Contact, Metadata, Site, Socials } from "@types";
```

Replace the whole `SOCIALS` export with:

```ts
export const BOOKING: Contact = {
  NAME: "Book a call",
  HANDLE: "cal.eu/junayed711",
  HREF: "https://www.cal.eu/junayed711",
};

export const SOCIALS: Socials = [
  {
    NAME: "LinkedIn",
    HANDLE: "in/junayed711",
    HREF: "https://www.linkedin.com/in/junayed711",
  },
  {
    NAME: "X",
    HANDLE: "@junayed711",
    HREF: "https://x.com/junayed711",
  },
  {
    NAME: "GitHub",
    HANDLE: "junayed711",
    HREF: "https://github.com/junayed711",
  },
];
```

Leave `SITE_URL`, `SITE`, `HOME`, `BLOG`, `PROJECTS` and `CONNECT` exactly as they are.

- [ ] **Step 4: Build and check the structured data**

Run: `npm run build`
Expected: finishes with `0 errors`.

Run:

```bash
node --input-type=commonjs -e 'const h=require("fs").readFileSync("dist/index.html","utf8");const m=h.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);console.log(JSON.stringify(JSON.parse(m[1]).sameAs))'
```

Expected, exactly:

```
["https://www.linkedin.com/in/junayed711","https://x.com/junayed711","https://github.com/junayed711"]
```

Three URLs, no `cal.eu`.

- [ ] **Step 5: Commit**

```bash
git add src/types.ts src/consts.ts
```

```bash
git commit -m "Add handles and booking link to contact constants"
```

---

### Task 2: The contact list, on the contact page and the home page

**Files:**
- Create: `src/components/ContactList.astro`
- Delete: `src/components/ConnectContent.astro`
- Modify: `src/pages/connect.astro`
- Modify: `src/pages/index.astro` (the import on line 6 and the last `<section>`)

**Interfaces:**
- Consumes: `SITE.EMAIL`, `SOCIALS: Contact[]` and `BOOKING: Contact` from `@consts`, where `Contact = { NAME: string; HANDLE: string; HREF: string }`.
- Produces: `ContactList.astro`, a component with no props.

**Background the implementer needs:**
- The site uses Astro's `ClientRouter`, so moving between pages swaps the DOM without a full reload. A bundled `<script>` in a component runs once per full page load, not once per navigation. That is why the Copy handler below is a single click listener on `document` (event delegation): it is bound once, keeps working after every page swap, and can never bind twice. The spec asks for the site's "after-swap" pattern; delegation meets the same two requirements (works after a swap, never double-binds) with less code, and is a deliberate ruling.
- The class `animate` fades an element in; the layout adds `show` to every `.animate` element on load. Keep it on the list.
- `not-prose` stops the typography plugin restyling the list.

- [ ] **Step 1: Declare the files**

```bash
gatebolt declare --task "Replace the connect block with a contact list" --vendor claude_code --name "Claude Code" --model <your-model-id> --file src/components/ContactList.astro --file src/components/ConnectContent.astro --file src/pages/connect.astro --file src/pages/index.astro
```

- [ ] **Step 2: Create the component**

Create `src/components/ContactList.astro` with exactly:

```astro
---
import { BOOKING, SITE, SOCIALS } from "@consts";

const rows = [
  {
    NAME: "Email",
    HANDLE: SITE.EMAIL,
    HREF: `mailto:${SITE.EMAIL}`,
    external: false,
  },
  ...[BOOKING, ...SOCIALS].map((contact) => ({ ...contact, external: true })),
];

const highlight =
  "transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white";
---

<ul class="animate not-prose border-t border-black/15 dark:border-white/20">
  {
    rows.map((row) => (
      <li class="flex items-center gap-2 border-b border-black/15 dark:border-white/20">
        <a
          href={row.HREF}
          target={row.external ? "_blank" : undefined}
          rel={row.external ? "noopener" : undefined}
          class:list={[
            "flex min-w-0 flex-1 items-baseline justify-between gap-4 px-2 py-4",
            highlight,
          ]}
        >
          <span class="shrink-0 font-semibold text-black dark:text-white">
            {row.NAME}
          </span>
          <span class="truncate">{row.HANDLE}</span>
        </a>
        {!row.external && (
          <>
            <button
              type="button"
              data-copy={row.HANDLE}
              aria-label="Copy email address"
              class:list={[
                "shrink-0 rounded-sm border border-black/15 px-3 py-2 text-sm dark:border-white/20",
                highlight,
              ]}
            >
              Copy
            </button>
            <span data-copy-status role="status" class="sr-only" />
          </>
        )}
      </li>
    ))
  }
</ul>

<script>
  const timers = new WeakMap<HTMLElement, number>();

  document.addEventListener("click", async (event) => {
    const button = (event.target as Element).closest<HTMLElement>(
      "[data-copy]"
    );
    if (!button || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? "");
    } catch {
      return;
    }

    const status = button.parentElement?.querySelector("[data-copy-status]");
    button.textContent = "Copied";
    if (status) status.textContent = "Email address copied";

    window.clearTimeout(timers.get(button));
    timers.set(
      button,
      window.setTimeout(() => {
        button.textContent = "Copy";
        if (status) status.textContent = "";
      }, 2000)
    );
  });
</script>
```

- [ ] **Step 3: Use it on the contact page**

Replace the whole of `src/pages/connect.astro` with:

```astro
---
import Layout from "@layouts/Layout.astro";
import Container from "@components/Container.astro";
import ContactList from "@components/ContactList.astro";
import { CONNECT } from "@consts";
---

<Layout title={CONNECT.TITLE} description={CONNECT.DESCRIPTION}>
  <Container>
    <div class="space-y-10">
      <h1 class="animate">Let's Connect</h1>
      <ContactList />
    </div>
  </Container>
</Layout>
```

(The heading and title are renamed in Task 3; leave them here.)

- [ ] **Step 4: Use it on the home page**

In `src/pages/index.astro`, change line 6 from

```astro
import ConnectContent from "@components/ConnectContent.astro";
```

to

```astro
import ContactList from "@components/ContactList.astro";
```

and replace the last `<section>` of the page, which currently reads

```astro
      <section class="animate space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-y-2">
          <h2>Let's Connect</h2>
          <Link href="/connect/">See full page</Link>
        </div>
        <ConnectContent />
      </section>
```

with

```astro
      <section class="animate space-y-4">
        <h2>Let's Connect</h2>
        <ContactList />
      </section>
```

Keep the `Link` import; the page still uses it elsewhere.

- [ ] **Step 5: Delete the old component, format, build**

```bash
git rm -q src/components/ConnectContent.astro
```

```bash
npx prettier --write src/components/ContactList.astro src/pages/connect.astro src/pages/index.astro
```

Run: `npm run build`
Expected: finishes with `0 errors`.

Run: `grep -rn "ConnectContent" src`
Expected: no output.

Run: `grep -o 'data-copy="[^"]*"' dist/connect/index.html dist/index.html`
Expected: one match in each file, both `data-copy="hello@junayed.com"`.

Run: `grep -c "reach out on social media" dist/connect/index.html dist/index.html`
Expected: `0` for both files (the old prose is gone).

- [ ] **Step 6: Check it in a browser**

Start the built site in the background: `npm run preview -- --port 4398`, then open `http://localhost:4398/connect/` with whatever browser tool you have. If you have none, say so in your report and list these checks as not run; do not claim them.

Check each of these and report the result of each one separately:

1. Five rows show in the order Email, Book a call, LinkedIn, X, GitHub, each with its handle on the right, and no paragraph of text above them.
2. Pressing Copy changes the button to "Copied", and about two seconds later back to "Copy". Reading the clipboard gives `hello@junayed.com`.
3. Pressing Copy twice about one second apart: the button stays "Copied" until two seconds after the second press, and does not flick back early.
4. Load `http://localhost:4398/blog/` fresh, click "let's connect" in the nav (an in-site navigation, not a reload), then press Copy: it still works. Go to the home page by clicking the site title and press Copy in the section at the bottom: it works there too, and one press produces one "Copied".
5. In the console run `Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true })`, then press Copy: the button stays "Copy" and no error is thrown.
6. At a 320px-wide viewport the page does not scroll sideways (`document.documentElement.scrollWidth <= window.innerWidth` is `true`) and the email value ends in an ellipsis if it does not fit.
7. Tabbing reaches each row and the Copy button in order, each with a visible focus state. Light and dark mode both look right (theme buttons are in the footer).

Stop the preview server when done.

- [ ] **Step 7: Commit**

```bash
git add src/components/ContactList.astro src/pages/connect.astro src/pages/index.astro
```

```bash
git commit -m "Replace the connect block with a contact list"
```

---

### Task 3: Rename the page to "Contact"

**Files:**
- Modify: `src/consts.ts` (the `CONNECT` export)
- Modify: `src/pages/connect.astro`
- Modify: `src/pages/index.astro` (one heading)
- Modify: `src/components/Header.astro` (one nav label, line 13)

**Interfaces:**
- Consumes: `ContactList.astro` from Task 2, already in place on both pages.
- Produces: `CONTACT: Metadata` from `@consts`, replacing `CONNECT`.

- [ ] **Step 1: Declare the files**

```bash
gatebolt declare --task "Rename the connect page to Contact" --vendor claude_code --name "Claude Code" --model <your-model-id> --file src/consts.ts --file src/pages/connect.astro --file src/pages/index.astro --file src/components/Header.astro
```

- [ ] **Step 2: Rename the metadata constant**

In `src/consts.ts`, replace

```ts
export const CONNECT: Metadata = {
  TITLE: "Let's Connect",
  DESCRIPTION: "Get in touch — socials and email.",
};
```

with

```ts
export const CONTACT: Metadata = {
  TITLE: "Contact",
  DESCRIPTION: "Email, calendar and socials for getting in touch with Junayed.",
};
```

- [ ] **Step 3: Update the contact page**

In `src/pages/connect.astro`, change the import to `import { CONTACT } from "@consts";`, the layout line to

```astro
<Layout title={CONTACT.TITLE} description={CONTACT.DESCRIPTION}>
```

and the heading to

```astro
      <h1 class="animate">Contact</h1>
```

- [ ] **Step 4: Update the home section heading and the nav label**

In `src/pages/index.astro`, in the last `<section>`, change `<h2>Let's Connect</h2>` to `<h2>Contact</h2>`.

In `src/components/Header.astro`, change

```ts
  { href: "/connect/", label: "let's connect" },
```

to

```ts
  { href: "/connect/", label: "contact" },
```

The `href` stays `/connect/`. The same `navItems` array feeds the desktop nav and the mobile menu, so this one edit covers both.

- [ ] **Step 5: Format, build, check**

```bash
npx prettier --write src/consts.ts src/pages/connect.astro src/pages/index.astro src/components/Header.astro
```

Run: `npm run build`
Expected: finishes with `0 errors`.

Run: `grep -rn -i "let's connect" src`
Expected: no output.

Run: `grep -rn "CONNECT" src`
Expected: no output.

Run: `grep -o "<title>[^<]*</title>" dist/connect/index.html`
Expected: `<title>Contact | Junayed</title>`

Run: `grep -c 'aria-current="page"' dist/connect/index.html`
Expected: at least `1` (the nav marks "contact" as the current page).

Run: `ls dist/connect/index.html`
Expected: the file exists (the URL has not moved).

- [ ] **Step 6: Commit**

```bash
git add src/consts.ts src/pages/connect.astro src/pages/index.astro src/components/Header.astro
```

```bash
git commit -m "Rename the connect page to Contact"
```
