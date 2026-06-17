export type Category = {
    id?: number
    name?: string
    description?: string | null
    imageKey?: string | null
    imageUrl?: string | null
    parentId?: number
    createdAt?: string
    updatedAt?: string
}

export type GetCategoriesResponse = {
    error?: boolean
    message?: string
    data?: Category[]
}
