import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Junayed",
  DESCRIPTION:
    "Sleep-deprived twin dad with a day job, building Layzer on the side.",
  EMAIL: "hello@junayed.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "Sleep-deprived twin dad with a day job, building Layzer on the side.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Notes on what I'm building, learning, and reading.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Things I'm building — side projects, experiments, and tools.",
};

export const CONNECT: Metadata = {
  TITLE: "Let's Connect",
  DESCRIPTION: "Get in touch — socials and email.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X (formerly Twitter)",
    HREF: "https://x.com/junayed711",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/junayed711",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/junayed711",
  },
];
