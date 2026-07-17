import { z } from "zod";

const allowedImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
]);

const getPathExtension = (pathname: string) => {
  const fileName = pathname.split("/").pop() || "";
  const extensionIndex = fileName.lastIndexOf(".");

  return extensionIndex > 0 ? fileName.slice(extensionIndex).toLowerCase() : "";
};

export const isValidCategoryImageUrl = (value: string) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    const extension = getPathExtension(url.pathname);

    return (
      ["http:", "https:"].includes(url.protocol) &&
      (!extension || allowedImageExtensions.has(extension))
    );
  } catch {
    return false;
  }
};

export const categoryStatusSchema = z.enum(["ACTIVE", "INACTIVE", "DRAFT"]);

export const addCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(65, "Name must be at most 65 characters"),
  description: z
    .string()
    .trim()
    .max(2000, "Description must be at most 2000 characters")
    .optional(),
  imageUrl: z
    .string()
    .trim()
    .max(2000, "Image URL must be at most 2000 characters")
    .refine(
      isValidCategoryImageUrl,
      "Image URL must be an http(s) image URL",
    )
    .optional(),
  parentId: z.string().optional(),
  status: categoryStatusSchema,
});

export type AddCategoryFormValues = z.infer<typeof addCategorySchema>;
