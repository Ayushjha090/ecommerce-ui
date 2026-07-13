import { adminAxios } from "@/lib/axios/adminAxios";

import type { GetCategoriesResponse, GetCategoryStatsResponse } from "../types";

export const getCategories = async () => {
    const response = await adminAxios.get<GetCategoriesResponse>("/categories");

    return response?.data?.data ?? []
}

export const getCategoryStats = async () => {
    const response = await adminAxios.get<GetCategoryStatsResponse>("/categories/stats");

    return response?.data?.data ?? {}
}
