export type Category = {
    id?: number
    name?: string
    description?: string | null
    imageKey?: string | null
    imageURL?: string | null
    parentId?: number
    createdAt?: string
    updatedAt?: string
}

export type GetCategoriesResponse = {
    error?: boolean
    message?: string
    data?: Category[]
}