export type AdminUser = {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "SUPER_ADMIN";
};

export type AdminLoginResponse = {
    error: boolean;
    message: string;
    data: {
        user: AdminUser;
        token: string;
        expiresAt: string;
    };
};

export type AdminMeResponse = {
    error: boolean;
    message: string;
    data: AdminUser
}