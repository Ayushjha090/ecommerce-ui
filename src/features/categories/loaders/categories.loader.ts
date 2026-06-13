import type { QueryClient } from "@tanstack/react-query";

import { getCategories } from "../api/categories.api";
import { categoriesKey } from "../api/categories.key";

export const categoriesLoader = (queryClient: QueryClient) => async () => {
    await queryClient.ensureQueryData({
        queryKey: categoriesKey.list(),
        queryFn: getCategories,
    });

    return null;
};