export type VisualizationKind =
  | "comparison"
  | "checkout"
  | "dashboard"
  | "campaign"
  | "landing";

export type ProductCard = {
  name: string;
  price: string;
  metric: string;
  badge: string;
  features: string[];
};

export type VisualizationStat = {
  label: string;
  value: string;
  tone: "brand" | "success" | "warning" | "accent";
};

export type VisualizationAction = {
  label: string;
  variant: "primary" | "secondary" | "outline" | "ghost";
};

export type VisualizationSpec = {
  kind: VisualizationKind;
  title: string;
  subtitle: string;
  intent: string;
  products: ProductCard[];
  stats: VisualizationStat[];
  actions: VisualizationAction[];
  navItems?: string[];
  heroSlides?: Array<{
    eyebrow: string;
    title: string;
    description: string;
    offer: string;
  }>;
  filters?: Array<{
    label: string;
    options: string[];
  }>;
};

export const currentVisualizationSpec: VisualizationSpec = {
  kind: "landing",
  title: "Customer Marketplace Landing Page",
  subtitle:
    "A customer-facing ecommerce landing page with a marketplace topbar, promotional carousel, filters, and product discovery grid.",
  intent: "Help shoppers search, browse deals, filter quickly, and move into product discovery without friction.",
  stats: [
    { label: "Live deals", value: "128", tone: "accent" },
    { label: "Fast delivery", value: "24h", tone: "brand" },
    { label: "Top rated", value: "4.7+", tone: "success" },
  ],
  actions: [
    { label: "Shop deals", variant: "primary" },
    { label: "Explore categories", variant: "outline" },
  ],
  navItems: [
    "All",
    "Mobiles",
    "Fashion",
    "Electronics",
    "Home",
    "Appliances",
    "Beauty",
  ],
  heroSlides: [
    {
      eyebrow: "Festival Mega Sale",
      title: "Big savings across phones, fashion, and home essentials",
      description:
        "Discover curated deals, bank offers, and express delivery picks in one shopper-friendly storefront.",
      offer: "Up to 70% off",
    },
    {
      eyebrow: "Prime Picks",
      title: "Upgrade your everyday tech setup",
      description:
        "Shop headphones, wearables, accessories, and productivity gear with verified ratings.",
      offer: "From $29",
    },
    {
      eyebrow: "Fresh Arrivals",
      title: "New season styles for every cart",
      description:
        "Browse trending apparel, footwear, and grooming essentials with quick filters.",
      offer: "New drops daily",
    },
  ],
  filters: [
    { label: "Delivery", options: ["Today", "Tomorrow", "Free shipping"] },
    { label: "Price", options: ["Under $50", "$50-$150", "$150+"] },
    { label: "Rating", options: ["4 stars & up", "Best sellers", "New arrivals"] },
    { label: "Category", options: ["Electronics", "Fashion", "Home"] },
  ],
  products: [
    {
      name: "Galaxy M Power 5G",
      price: "$219",
      metric: "4.6",
      badge: "Deal",
      features: ["6000mAh battery", "AMOLED display", "Exchange available"],
    },
    {
      name: "UrbanRun Sneakers",
      price: "$64",
      metric: "4.5",
      badge: "Trending",
      features: ["Lightweight sole", "3 colors", "Free return"],
    },
    {
      name: "NoiseLite Headphones",
      price: "$89",
      metric: "4.8",
      badge: "Top rated",
      features: ["ANC mode", "45h playback", "Fast charge"],
    },
    {
      name: "SmartChef Air Fryer",
      price: "$129",
      metric: "4.7",
      badge: "Home",
      features: ["6 presets", "Family size", "2-year warranty"],
    },
    {
      name: "Everyday Backpack",
      price: "$42",
      metric: "4.4",
      badge: "Choice",
      features: ["Laptop sleeve", "Water resistant", "Quick access pocket"],
    },
    {
      name: "GlowCare Kit",
      price: "$34",
      metric: "4.6",
      badge: "Beauty",
      features: ["Dermat tested", "Gift pack", "Subscribe & save"],
    },
  ],
};
