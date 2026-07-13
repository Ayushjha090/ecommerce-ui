export type Category = {
    id?: number
    name?: string
    description?: string | null
    imageKey?: string | null
    imageUrl?: string | null
    parentId?: number | null
    parentCategory?: {
        id?: number
        name?: string
    } | null
    totalProducts?: number
    createdAt?: string
    updatedAt?: string
}

export type CategoryStats = {
    total?: number
    totalRootCategories?: number
    childCategories?: number
    emptyCategories?: number
}

export type GetCategoriesResponse = {
    error?: boolean
    message?: string
    data?: Category[]
}

export type GetCategoryStatsResponse = {
    error?: boolean
    message?: string
    data?: CategoryStats
}
