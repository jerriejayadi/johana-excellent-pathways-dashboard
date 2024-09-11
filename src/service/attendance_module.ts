import { PostAttendancePayload } from "@/types/attendance_module/postAttendance";
import apiClient from ".";
import { GetAttendanceProps } from "@/types/attendance_module/getAttendance";

export const postAttendance = (payload: PostAttendancePayload): Promise<any> =>
  apiClient.post(`/apis/attendance`, payload);

export const getAttendance = (
  id: string,
  params?: any
): Promise<GetAttendanceProps> =>
  apiClient.get(`/apis/attendance/${id}`, { params: params });
