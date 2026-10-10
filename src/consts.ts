import type { Contact, Metadata, Site, Socials } from "@types";

// Must match `site` in astro.config.mjs.
export const SITE_URL = "https://junayed.com";

export const SITE: Site = {
  TITLE: "Junayed",
  DESCRIPTION:
    "Sleep-deprived twin dad with a day job, building GateBolt on the side.",
  EMAIL: "hello@junayed.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 5,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "Sleep-deprived twin dad with a day job, building GateBolt on the side.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Notes on what I'm building, learning, and reading.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Things I'm building — side projects, experiments, and tools.",
};

export const CONTACT: Metadata = {
  TITLE: "Contact",
  DESCRIPTION: "Email, calendar and socials for getting in touch with Junayed.",
};

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
