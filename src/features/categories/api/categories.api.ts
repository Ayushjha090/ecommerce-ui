import { adminAxios } from "@/lib/axios/adminAxios";

import type { GetCategoriesResponse } from "../types";

export const getCategories = async () => {
    const response = await adminAxios.get<GetCategoriesResponse>("/categories");

    return response?.data?.data ?? []
}