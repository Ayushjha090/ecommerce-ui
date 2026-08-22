export type CategoryStatus = "ACTIVE" | "INACTIVE" | "DRAFT"

export type Category = {
    id?: number
    name?: string
    description?: string | null
    imageUrl?: string | null
    status?: CategoryStatus
    parentId?: number | null
    parentCategory?: {
        id?: number
        name?: string
        status?: CategoryStatus
    } | null
    totalProducts?: number
    createdAt?: string
    updatedAt?: string
}

export type CreateCategoryPayload = {
    name: string
    description?: string | null
    imageUrl?: string | null
    parentId?: number | null
    status?: CategoryStatus
}

export type UpdateCategoryPayload = CreateCategoryPayload

export type CategoryStats = {
    total?: number
    totalRootCategories?: number
    childCategories?: number
    emptyCategories?: number
    activeCategories?: number
    inactiveCategories?: number
    draftCategories?: number
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

export type CreateCategoryResponse = {
    error?: boolean
    message?: string
    data?: Category
}

export type UpdateCategoryResponse = CreateCategoryResponse
