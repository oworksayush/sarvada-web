// Central content. Only confirmed prospectus facts are stated; features are marked proposed/planned.
export const company = {
  legalName: "Sarvada Assets Pvt. Ltd.",
  brand: "Sarvada",
  tagline: "A little closer to nature. A little closer to yourself.",
  // Verified contact details — leave null until supplied. Nothing renders while null.
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
  privacyUrl: null as string | null,
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "About Sarvada", to: "/about" },
  { label: "Our Projects", to: "/projects" },
  { label: "The Sarvada Life", to: "/life" },
  { label: "Sarvada Club", to: "/club" },
  { label: "Contact", to: "/contact" },
];

export const project = {
  name: "Sarvada Farm Theme",
  descriptor: "Farm-themed plotted development",
  slug: "sarvada-farm-theme",
  location: "Chikkaballapur district, North Bengaluru region",
  facts: [
    { value: "25", unit: "acres", label: "Proposed development" },
    { value: "100", unit: "", label: "Planned farm plots" },
    { value: "5,400", unit: "sq. ft.", label: "Plots starting from" },
    { value: "2.5", unit: "acres", label: "Proposed lake-facing clubhouse area" },
  ],
};

// Content model — previous projects stay unpublished until verified.
export type ProjectEntry = { name: string; status: "current" | "previous" | "upcoming"; published: boolean };
export const projects: ProjectEntry[] = [
  { name: "Sarvada Farm Theme", status: "current", published: true },
  { name: "The Green Valley", status: "previous", published: false },
];
