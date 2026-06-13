export const categoriesKey = {
    all: ["categories"] as const,
    lists: () => [...categoriesKey.all, "list"] as const,
    list: (filters?: Record<string, unknown>) => [...categoriesKey.lists(), filters ?? {}] as const
};