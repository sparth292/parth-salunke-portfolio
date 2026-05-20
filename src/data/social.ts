export const social = {
  github: "https://github.com/sparth292",
  githubUsername: "sparth292",
  linkedin: "https://www.linkedin.com/in/parthsalunke/",
  twitter: "https://x.com/paajinextdoor",
  email: "sparthsalunke@gmail.com",
  instagram: "https://www.instagram.com/napoleanbonaparth_",
  pinterest: "https://in.pinterest.com/paajinextdoor/",
} as const;

export const socialLinks = [
  { label: "GitHub", href: social.github, icon: "⎇" },
  { label: "LinkedIn", href: social.linkedin, icon: "in" },
  { label: "Twitter / X", href: social.twitter, icon: "𝕏" },
  { label: "Instagram", href: social.instagram, icon: "◎" },
  { label: "Pinterest", href: social.pinterest, icon: "◈" },
  { label: "Email", href: `mailto:${social.email}`, icon: "✉" },
] as const;
