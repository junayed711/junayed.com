# temper

- Gates: npm run build (astro check && astro build)
- Risky paths: .github/workflows/deploy.yml (none — every push to main deploys the live site); public/CNAME (none — holds junayed.com; losing it drops the custom domain); public/robots.txt, astro.config.mjs, src/components/Head.astro, src/layouts/Layout.astro (none — canonical URLs, noindex, sitemap filter and data-pagefind-ignore; a mistake de-indexes the site); src/consts.ts (none — SITE_URL must match `site` in astro.config.mjs)
- Verify: npm run build && npm run preview, then click through home, blog, projects, tags, search and the mobile nav
- Commits: subject line only, with no body and no trailer (not even Co-Authored-By); no type prefix, no trailing period; a plain imperative sentence saying what changed; several related changes may be joined with commas or a semicolon (e.g. "global heading styles, hoist listeners, hamburger icon toggle, SITE_URL"); both sentence case and lowercase appear in history and either is in convention
