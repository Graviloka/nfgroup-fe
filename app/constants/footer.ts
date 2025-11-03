import { FooterSection } from '../types/footer';

export const footerSections: FooterSection[] = [
  {
    title: "Offers",
    items: [
      { label: "Residential Sales", href: "https://nfgroup-indonesia.com/listings/properties" },
      { label: "Land Sales", href: "https://nfgroup-indonesia.com/listings/land" },
      { label: "Off Plan", href: "https://nfgroup-indonesia.com/listings/properties?type%5B0%5D=all&tenure%5B0%5D=0&tenure%5B1%5D=3&isExclusive=false&price%5B0%5D=0&price%5B1%5D=10000000" },
      { label: "Rentals", href: "https://nfgroup-indonesia.com/listings/properties?tenure%5B0%5D=0&isExclusive=false&price%5B0%5D=0&price%5B1%5D=30800" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About NF Group", href: "https://nfgroup-indonesia.com/about-nf-group" },
      { label: "Partnership Programs", href: "https://nfgroup-indonesia.com/partnership-program" },
      { label: "Client Reviews", href: "https://nfgroup-indonesia.com/reviews" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Villa & Resort Management", href: "https://nfgroup-indonesia.com/villa-resorts-management" },
      { label: "Project Marketing", href: "https://nfgroup-indonesia.com/project-marketing" },
      { label: "Exclusive Listing", href: "https://nfgroup-indonesia.com/listings/land?isExclusive=true" },
      { label: "Consultancy", href: "https://nfgroup-indonesia.com/consultancy" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Quarterly Market Wide", href: "https://nfgroup-indonesia.com/reports/quarterly-market-wide" },
      { label: "Quarterly Market Sector", href: "https://nfgroup-indonesia.com/reports/quarterly-market-sector" },
      { label: "News", href: "https://nfgroup-indonesia.com/news" },
      { label: "Privacy Policy", href: "https://nfgroup-indonesia.com/privacy-policy" },
    ],
  },
  {
    title: "Socials",
    items: [
      { label: "Instagram", href: "https://www.instagram.com/nfgroup.indonesia" },
      { label: "Facebook", href: "https://www.facebook.com/nfgroupindonesia" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/nf-group-indonesia-real-estate/" },
    ],
  },
  {
    title: "Certified By",
    items: ["LSP", "AREBI"],
  },
];
