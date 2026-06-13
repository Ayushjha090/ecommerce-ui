export type Category = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  parentId?: number | null;
  parent?: {
    id: number;
    name: string;
  } | null;
  productsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CategoryStat = {
  label: string;
  value: string;
  description: string;
  tone: "brand" | "success" | "warning" | "info";
};

export type VisualizationSpec = {
  title: string;
  subtitle: string;
  stats: CategoryStat[];
  categories: Category[];
  parentOptions: Array<{ id: number | null; name: string }>;
  formDefaults: {
    name: string;
    description: string;
    image: string;
    parentId: number | null;
  };
};

export const currentVisualizationSpec: VisualizationSpec = {
  title: "Categories",
  subtitle: "Manage product categories and hierarchy",
  stats: [
    {
      label: "Total categories",
      value: "24",
      description: "Flat table view",
      tone: "brand",
    },
    {
      label: "Root categories",
      value: "8",
      description: "Top-level catalog groups",
      tone: "success",
    },
    {
      label: "Child categories",
      value: "16",
      description: "Linked to parent category",
      tone: "info",
    },
    {
      label: "Empty categories",
      value: "3",
      description: "No products assigned",
      tone: "warning",
    },
  ],
  parentOptions: [
    { id: null, name: "No parent category" },
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Beauty" },
  ],
  formDefaults: {
    name: "Gaming Accessories",
    description: "Controllers, keyboards, headsets, and gaming setup essentials.",
    image: "https://images.example.com/categories/gaming-accessories.jpg",
    parentId: 1,
  },
  categories: [
    {
      id: 1,
      name: "Electronics",
      description: "Mobiles, audio, accessories, and smart devices.",
      image: "https://images.example.com/categories/electronics.jpg",
      parentId: null,
      parent: null,
      productsCount: 342,
      createdAt: "2026-05-14T10:20:00.000Z",
      updatedAt: "2026-06-08T09:10:00.000Z",
    },
    {
      id: 5,
      name: "Headphones",
      description: "Wireless, wired, noise cancelling, and studio headphones.",
      image: "https://images.example.com/categories/headphones.jpg",
      parentId: 1,
      parent: { id: 1, name: "Electronics" },
      productsCount: 86,
      createdAt: "2026-05-18T14:45:00.000Z",
      updatedAt: "2026-06-07T17:32:00.000Z",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Clothing, footwear, watches, and everyday accessories.",
      parentId: null,
      parent: null,
      productsCount: 418,
      createdAt: "2026-05-12T08:05:00.000Z",
      updatedAt: "2026-06-04T13:26:00.000Z",
    },
    {
      id: 9,
      name: "Men's Sneakers",
      description: "Running shoes, casual sneakers, and streetwear drops.",
      image: "https://images.example.com/categories/sneakers.jpg",
      parentId: 2,
      parent: { id: 2, name: "Fashion" },
      productsCount: 112,
      createdAt: "2026-05-21T11:30:00.000Z",
      updatedAt: "2026-06-03T15:40:00.000Z",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Appliances, storage, cookware, and home improvement.",
      image: "https://images.example.com/categories/home.jpg",
      parentId: null,
      parent: null,
      productsCount: 251,
      createdAt: "2026-05-09T09:15:00.000Z",
      updatedAt: "2026-06-01T12:12:00.000Z",
    },
    {
      id: 14,
      name: "Air Fryers",
      description: "Compact, family-size, and smart cooking appliances.",
      parentId: 3,
      parent: { id: 3, name: "Home & Kitchen" },
      productsCount: 0,
      createdAt: "2026-05-25T16:05:00.000Z",
      updatedAt: "2026-05-28T10:01:00.000Z",
    },
  ],
};
