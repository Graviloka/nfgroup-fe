export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  items: string[] | FooterLink[];
}
