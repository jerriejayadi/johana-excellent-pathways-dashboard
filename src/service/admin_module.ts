import {
  PayloadPostAdminGoogle,
  ResponsePostAdminGoogle,
} from "@/types/admin_module/postAdminGoogle";
import apiClient from ".";

export const postAdminGoogle = (
  payload: PayloadPostAdminGoogle
): Promise<ResponsePostAdminGoogle> => apiClient.post(`/apis/admin/google`, payload);
