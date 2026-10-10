# Simple contact page

Labels: ready-for-agent

## Problem Statement

The "Let's Connect" page makes a visitor work. It opens with two sentences of
prose, one of which hides the calendar booking link mid-sentence, and then puts
every contact detail on a single slash-separated line. Someone who arrives
wanting an email address or a LinkedIn profile has to read before they can act.
Other people's personal sites do this with a short, plain list of contact
details, and this one should too.

## Solution

The page becomes a heading, "Contact", and a list of five rows. Each row names
one way to reach Junayed on the left and shows the actual address or handle on
the right, and the whole row is the link. The email row also has a Copy button.
There is no intro text. The same list replaces the contact section at the bottom
of the home page, and the nav says "contact".

## User Stories

1. As a visitor, I want the contact page to show contact details and nothing else, so that I don't have to read prose to find them.
2. As a visitor, I want each way of reaching Junayed on its own line, so that I can scan the list in a second.
3. As a visitor, I want email listed first, so that the preferred way of getting in touch is the first thing I see.
4. As a visitor, I want to see the email address written out, so that I can read or retype it without clicking anything.
5. As a visitor, I want clicking the email row to open my mail app with the address filled in, so that I can write straight away.
6. As a visitor who uses webmail, I want a Copy button beside the email address, so that I can paste it into my own mail without a mail app opening.
7. As a visitor, I want the Copy button to say "Copied" after I press it, so that I know it worked.
8. As a visitor, I want the Copy button to go back to "Copy" after a moment, so that I can use it again and trust what it says.
9. As a visitor, I want a "Book a call" row, so that I can find the calendar link without hunting through a sentence.
10. As a visitor, I want LinkedIn, X and GitHub each on their own row, so that I can pick the one I use.
11. As a visitor, I want to see the handle on each social row, so that I can find Junayed in an app without following the link.
12. As a visitor, I want the whole row to be clickable, so that I don't have to aim at a small piece of text.
13. As a visitor on a phone, I want each row tall enough to tap comfortably, so that I don't hit the wrong one.
14. As a visitor on a narrow screen, I want long values to stay on one line and never push the page sideways, so that the list stays tidy.
15. As a visitor, I want social and calendar links to open in a new tab, so that I don't lose the site.
16. As a visitor, I want the row I'm hovering over to highlight, so that I can see what I'm about to click.
17. As a keyboard user, I want to tab through the rows and the Copy button in order, each with a visible focus state, so that I can use the page without a mouse.
18. As a screen reader user, I want each row announced with its name and its value, so that I know where each link goes.
19. As a screen reader user, I want to be told when the address has been copied, so that the confirmation isn't only visual.
20. As a visitor, I want the page to look right in light and dark mode, so that it matches the rest of the site.
21. As a visitor, I want the nav item to say "contact", so that I recognise the page I'm looking for.
22. As a visitor on the contact page, I want the nav item shown as current, so that I know where I am.
23. As a visitor with an old link or bookmark to `/connect/`, I want it to keep working, so that I still reach the page.
24. As a visitor on the home page, I want the same contact list at the bottom, so that I can get in touch without visiting another page.
25. As a visitor on the home page, I want the Copy button to work there too, so that the list behaves the same wherever I meet it.
26. As a visitor arriving from a search result or a shared link, I want the page title to read "Contact", so that I know what the page is before I open it.
27. As a visitor moving between pages, I want the Copy button to work whichever page I landed on first, so that it never silently does nothing.
28. As Junayed, I want the contact details defined in one place, so that changing a handle changes it on both the page and the home section.

## Implementation Decisions

- **One contact list component, used twice.** The existing shared contact block is replaced by a contact list that renders the five rows. The contact page and the home page section both render it. Its old prose and slash-separated list are removed outright, not kept behind a flag.
- **The five rows, in this order:**

  | Name | Shown on the right | Goes to |
  | --- | --- | --- |
  | Email | `hello@junayed.com` | mail app (`mailto:`) |
  | Book a call | `cal.eu/junayed711` | the calendar booking page |
  | LinkedIn | `in/junayed711` | the LinkedIn profile |
  | X | `@junayed711` | the X profile |
  | GitHub | `junayed711` | the GitHub profile |

- **Contact data lives in the site constants.** The socials entries gain a display handle, and the calendar link moves out of the component into the constants alongside them, so the component holds no hard-coded contact details. The email keeps coming from the site's existing email constant. The social named "X (formerly Twitter)" is renamed "X". The home page's structured data keeps listing the three social profile URLs and must not gain the calendar link.
- **Row layout** (settled by the prototype, variant A): a list with a hairline rule above the first row and below every row. Each row is a link filling the row, with the name in the heading colour and weight on the left and the value in body colour on the right, truncated with an ellipsis if it doesn't fit. Rows highlight on hover and on keyboard focus using the same treatment as the site's existing cards. No icons, no arrows.
- **The Copy button** sits at the right of the email row as a sibling of the link, not inside it. It is a small bordered button in the style of the site's existing bordered controls. Pressing it writes the email address to the clipboard, changes its text to "Copied" for two seconds, then returns to "Copy". The change is announced to assistive technology. If the clipboard is unavailable the button does nothing visible; the address is on the page and can be selected by hand.
- **Client script wiring.** The site uses client-side page transitions, so the Copy behaviour must be set up on first load and again after each page swap, following the pattern the site's other scripts already use. It must not bind twice to the same button.
- **Naming.** The page heading, the nav label, the home page section heading and the page's title metadata all become "Contact" (the nav label lowercase, as the other nav items are). The page's meta description is rewritten to match and to stay a short plain sentence.
- **The URL does not change.** The page stays at `/connect/`. No redirect is added and the site config is not touched.
- **Home page section.** The section heading becomes "Contact" and the "See full page" link is removed, since the section now shows everything the page does.
- **Entrance animation.** The list keeps the site's existing fade-in on load, on both pages.
- **External links** to the socials and the calendar open in a new tab; the email link does not.

## Testing Decisions

- The repo has no test runner and no existing tests, and this change adds none. Adding a test framework for one static list is out of proportion.
- The gate is the build, which type-checks the site and builds every page. It must pass.
- The rest is checked by hand against the built site, following the repo's usual click-through: the contact page and the home page section, in light and dark mode, at phone and desktop width. Check that each row goes to the right place, that Copy puts the address on the clipboard and shows "Copied", that Copy still works after navigating to the page from another page, that the nav shows "contact" as current on the contact page, and that the mobile nav shows the new label.
- A good check here looks only at what a visitor sees and can do, not at how the component is put together.

## Out of Scope

- Moving the page to `/contact/` or adding a redirect.
- A contact form.
- Icons or logos for the contact methods.
- Adding or removing contact methods.
- Any change to the header beyond the one nav label, or to the footer.
- Changes to the blog, projects, tags or search pages.

## Further Notes

- Three layouts were prototyped on the live route and A (rows with handles) was chosen over an email-first layout, which hid the social handles, and a card layout, which took nearly twice the height for the same information. The prototype is kept on the local branch `prototype/simple-contact-page` for reference only; it is throwaway code and must be rewritten, not copied.
- One thing the prototype got wrong and the real build should avoid: it set up its script on a page-load event the site doesn't otherwise use. Follow the site's existing after-swap pattern instead.
- The owner's bar for this change is that a visitor "doesn't have to work hard". Where a detail isn't covered here, choose whatever asks least of the visitor.
