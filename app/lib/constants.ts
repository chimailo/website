export const EMAIL = "ilochima8@gmail.com";
export const TWITTER = "https://twitter.com/Kollign";
export const LINKEDIN = "https://linkedin.com/in/chimailo";
export const GITHUB = "https://github.com/chimailo";
export const RESUME = "/#";

export type Navlink = {
  name: string;
  link: string;
  external?: boolean;
};

export const NAVLINKS: Navlink[] = [
  { name: "about", link: "about" },
  { name: "blog", link: "blog" },
  { name: "projects", link: "projects" },
  // { name: "resume", link: "/#", external: true },
];
