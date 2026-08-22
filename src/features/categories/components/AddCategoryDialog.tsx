import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FolderTree, Image, Layers3, Tag, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/form/Field";
import { cn } from "@/utils/cn";

import { createCategory, updateCategory } from "../api/categories.api";
import { categoriesKey } from "../api/categories.key";
import {
  addCategorySchema,
  isValidCategoryImageUrl,
  type AddCategoryFormValues,
} from "../schema/category.schema";
import type { Category, CategoryStatus, CreateCategoryPayload } from "../types";

type AddCategoryDialogProps = {
  isOpen: boolean;
  categories: Category[];
  category?: Category | null;
  onClose: () => void;
};

const statusOptions: Array<{
  value: CategoryStatus;
  label: string;
  description: string;
}> = [
  {
    value: "DRAFT",
    label: "Draft",
    description: "Admin-visible, not usable yet",
  },
  {
    value: "ACTIVE",
    label: "Active",
    description: "Can be used for products and child categories",
  },
  {
    value: "INACTIVE",
    label: "Inactive",
    description: "Admin-visible, locked from use",
  },
];

const normalizeOptionalString = (value?: string) => {
  const normalizedValue = value?.trim();
  return normalizedValue ? normalizedValue : null;
};

const getMutationMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message ?? "Unable to create category. Please try again.";
  }

  if (error instanceof Error) return error.message;

  return "Unable to create category. Please try again.";
};

export default function AddCategoryDialog({
  categories,
  category,
  isOpen,
  onClose,
}: AddCategoryDialogProps) {
  const queryClient = useQueryClient();
  const [loadedPreviewUrl, setLoadedPreviewUrl] = useState<string | null>(null);
  const [failedPreviewUrl, setFailedPreviewUrl] = useState<string | null>(null);
  const isEditMode = Boolean(category?.id);
  const activeParentCategories = useMemo(
    () =>
      categories.filter(
        (parentCategory) =>
          parentCategory.status === "ACTIVE" && parentCategory.id !== category?.id,
      ),
    [categories, category?.id],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddCategoryFormValues>({
    resolver: zodResolver(addCategorySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      parentId: "",
      status: "DRAFT",
    },
  });
  const imageUrlValue = useWatch({ control, name: "imageUrl" })?.trim() ?? "";
  const canAttemptPreview =
    Boolean(imageUrlValue) &&
    !errors.imageUrl &&
    isValidCategoryImageUrl(imageUrlValue) &&
    failedPreviewUrl !== imageUrlValue;
  const shouldShowPreview =
    canAttemptPreview && loadedPreviewUrl === imageUrlValue;

  const createCategoryMutation = useMutation({
    mutationFn: (payload: CreateCategoryPayload) => {
      if (category?.id) {
        return updateCategory({
          id: category.id,
          payload,
        });
      }

      return createCategory(payload);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: categoriesKey.lists() }),
        queryClient.invalidateQueries({ queryKey: categoriesKey.stats() }),
      ]);
      setLoadedPreviewUrl(null);
      setFailedPreviewUrl(null);
      reset();
      onClose();
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: category?.name ?? "",
      description: category?.description ?? "",
      imageUrl: category?.imageUrl ?? "",
      parentId: category?.parentId ? String(category.parentId) : "",
      status: category?.status ?? "DRAFT",
    });
  }, [
    category?.description,
    category?.id,
    category?.imageUrl,
    category?.name,
    category?.parentId,
    category?.status,
    isOpen,
    reset,
  ]);

  const onSubmit = (values: AddCategoryFormValues) => {
    const payload: CreateCategoryPayload = {
      name: values.name.trim(),
      description: normalizeOptionalString(values.description),
      imageUrl: normalizeOptionalString(values.imageUrl),
      parentId: values.parentId ? Number(values.parentId) : null,
      status: values.status,
    };

    createCategoryMutation.mutate(payload);
  };

  const handleClose = () => {
    createCategoryMutation.reset();
    setLoadedPreviewUrl(null);
    setFailedPreviewUrl(null);
    reset();
    onClose();
  };

  const stopSubmitPropagation = (event: FormEvent) => {
    event.stopPropagation();
  };

  if (!isOpen) return null;

  const isSaving = isSubmitting || createCategoryMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/60 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-category-title"
        className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-hidden rounded-md bg-surface-50 shadow-soft dark:bg-surface-800"
      >
        <div className="flex items-start justify-between gap-4 border-b border-surface-200 p-5 dark:border-surface-900">
          <div className="min-w-0">
            <h2
              id="add-category-title"
              className="text-xl font-semibold text-surface-900 dark:text-surface-50"
            >
              {isEditMode ? "Edit Category" : "Add Category"}
            </h2>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              {isEditMode
                ? "Update category details and catalog availability."
                : "Create a category and decide when it can be used in the catalog."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-950 dark:text-surface-400 dark:hover:bg-surface-900 dark:hover:text-surface-50"
            aria-label="Close category dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          noValidate
          onSubmit={(event) => {
            stopSubmitPropagation(event);
            void handleSubmit(onSubmit)(event);
          }}
        >
          <div className="scrollbar-admin max-h-[calc(100dvh-13rem)] space-y-4 overflow-y-auto p-5">
            <Field
              label="Category Name"
              placeholder="Gaming Accessories"
              error={errors.name?.message}
              startAdornment={<Tag className="h-4 w-4" />}
              {...register("name")}
            />

            <label className="block">
              <span
                className={cn(
                  "mb-1.5 block text-sm font-medium text-surface-900 dark:text-surface-50",
                  errors.description && "text-red-500 dark:text-red-400",
                )}
              >
                Description
              </span>
              <textarea
                className={cn(
                  "min-h-24 w-full resize-none rounded-md border-2 bg-transparent p-3 text-sm leading-6 text-surface-900 outline-none transition-colors placeholder:text-surface-400 focus:border-brand-500 dark:text-surface-200 dark:placeholder:text-surface-500",
                  errors.description
                    ? "border-red-500 dark:border-red-500"
                    : "border-surface-300 dark:border-surface-600",
                )}
                placeholder="Describe the catalog section"
                {...register("description")}
              />
              {errors.description?.message ? (
                <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                  {errors.description.message}
                </p>
              ) : null}
            </label>

            <Field
              label="Category Image URL"
              placeholder="https://images.unsplash.com/photo-..."
              error={errors.imageUrl?.message}
              hint="Optional. Use an http(s) URL. CDN image URLs are supported."
              startAdornment={<Image className="h-4 w-4" />}
              {...register("imageUrl")}
            />

            {canAttemptPreview ? (
              <div className="rounded-md border border-surface-200 bg-surface-100 p-3 dark:border-surface-700 dark:bg-surface-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface-50 text-surface-400 dark:bg-surface-800">
                    <img
                      src={imageUrlValue}
                      alt="Category preview"
                      className={cn(
                        "h-full w-full object-cover",
                        shouldShowPreview ? "block" : "hidden",
                      )}
                      onLoad={() => {
                        setFailedPreviewUrl(null);
                        setLoadedPreviewUrl(imageUrlValue);
                      }}
                      onError={() => {
                        setLoadedPreviewUrl(null);
                        setFailedPreviewUrl(imageUrlValue);
                      }}
                    />
                    {!shouldShowPreview ? <Image className="h-5 w-5" /> : null}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-surface-900 dark:text-surface-50">
                      Image preview
                    </p>
                    <p className="mt-1 truncate text-xs text-surface-500 dark:text-surface-400">
                      {shouldShowPreview ? imageUrlValue : "Loading image..."}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-surface-900 dark:text-surface-50">
                Parent Category
              </span>
              <div className="relative">
                <FolderTree className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400 dark:text-surface-500" />
                <select
                  className="h-10 w-full rounded-md border-2 border-surface-300 bg-transparent pl-9 pr-3 text-sm text-surface-900 outline-none transition-colors focus:border-brand-500 dark:border-surface-600 dark:text-surface-200"
                  {...register("parentId")}
                >
                  <option value="">Root category</option>
                  {activeParentCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-1.5 text-xs text-surface-400 dark:text-surface-500">
                Only active categories can be selected as a parent.
              </p>
            </label>

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-surface-900 dark:text-surface-50">
                Status
              </legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {statusOptions.map((option) => (
                  <label
                    key={option.value}
                    className="has-checked:border-brand-500 has-checked:bg-brand-50 has-checked:text-brand-700 cursor-pointer rounded-md border-2 border-surface-300 p-3 text-surface-700 transition-colors dark:border-surface-600 dark:text-surface-200 dark:has-checked:bg-brand-500/10 dark:has-checked:text-brand-200"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      className="sr-only"
                      {...register("status")}
                    />
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <Layers3 className="h-4 w-4" />
                      {option.label}
                    </span>
                    <span className="mt-1 block text-xs text-surface-500 dark:text-surface-400">
                      {option.description}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {createCategoryMutation.isError ? (
              <p className="rounded-md bg-error-50 px-3 py-2 text-sm text-error-600 dark:bg-error-500/10 dark:text-error-500">
                {getMutationMessage(createCategoryMutation.error)}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-surface-200 p-5 dark:border-surface-900 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSaving} disabled={isSaving}>
              {isEditMode ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
