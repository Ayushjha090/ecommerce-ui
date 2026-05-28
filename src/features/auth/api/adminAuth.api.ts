import { adminAxios } from "../../../lib/axios/adminAxios";

import type {LoginFormValues as AdminLoginPayload} from '../schema/admin/login.schema'

export const adminLogin = async (payload: AdminLoginPayload) => {
    const response = await adminAxios.post("/admins/login", payload);

    return response?.data ?? {}
}