import { adminAxios } from "@/lib/axios/adminAxios";

import type {
    CreateCategoryPayload,
    CreateCategoryResponse,
    GetCategoriesResponse,
    GetCategoryStatsResponse,
    UpdateCategoryPayload,
    UpdateCategoryResponse,
} from "../types";

export const getCategories = async () => {
    const response = await adminAxios.get<GetCategoriesResponse>("/categories", {
        requiresAuth: true,
    });

    return response?.data?.data ?? []
}

export const getCategoryStats = async () => {
    const response = await adminAxios.get<GetCategoryStatsResponse>("/categories/stats", {
        requiresAuth: true,
    });

    return response?.data?.data ?? {}
}

export const createCategory = async (payload: CreateCategoryPayload) => {
    const response = await adminAxios.post<CreateCategoryResponse>("/categories", payload, {
        requiresAuth: true,
    });

    return response?.data?.data
}

export const updateCategory = async ({
    id,
    payload,
}: {
    id: number
    payload: UpdateCategoryPayload
}) => {
    const response = await adminAxios.put<UpdateCategoryResponse>(`/categories/${id}`, payload, {
        requiresAuth: true,
    });

    return response?.data?.data
}

export const deleteCategory = async (id: number) => {
    await adminAxios.delete(`/categories/${id}`, {
        requiresAuth: true,
    });
}
