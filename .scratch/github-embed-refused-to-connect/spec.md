# Comments box shows "github.com refused to connect"

## Symptom

At the bottom of a blog post, below the previous/next post links, the comments
box is a grey frame with a broken-page icon and the text "github.com refused to
connect". No comments and no comment form appear.

## Expected

The giscus comments widget loads in that spot and shows the comment thread for
the post, backed by Discussions on the site's own repo,
`junayed711/junayed.com`, in the Announcements category. The widget stays.

## How to reach it

Open any blog post on the live site, junayed.com, and scroll to the bottom. It
happens on every post, every time.

## Out of scope

- Removing the comments widget.
- Anything other than the widget's settings. The theme-switching code in
  `src/components/Head.astro` is touched only if it proves to be part of the
  cause.
- Other leftovers from the template, post navigation, page styling.

## Hypothesis

The widget in `src/components/Giscus.astro` still points at the template
author's repo, `trevortylerlee/astro-micro`. Pointed at a repo this site has no
standing with, giscus sends the frame to a github.com page, which GitHub
refuses to show inside a frame. Not yet proven.

## Known facts

- `junayed711/junayed.com` is public, has Discussions on, and has the giscus
  app installed (done by the owner on 2026-10-08).
- Repo id `R_kgDOSbLt1A`; Announcements category id `DIC_kwDOSbLt1M4DHVac`.
