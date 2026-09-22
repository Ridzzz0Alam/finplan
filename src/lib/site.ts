export const siteConfig = {
  name: "FinPlan",
  legalName: "FinPlan Advisory Group",
  tagline: "Financial planning, built around your life",
  description:
    "FinPlan is an independent financial advisory firm helping families and business owners plan, invest and retire with confidence.",
  url: "https://finplan.example.com",
  email: "hello@finplan.example.com",
  phone: "+1 (555) 014-2200",
  address: {
    street: "220 Harbour Street, Suite 12",
    city: "Boston",
    region: "MA",
    postalCode: "02110",
    country: "USA",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/finplan",
    x: "https://x.com/finplan",
  },
} as const;

export const mainNav = [
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
] as const;
