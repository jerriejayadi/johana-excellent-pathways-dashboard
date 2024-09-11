import apiClient from ".";
import { GetStudentProps } from "@/types/student_module/getStudent";
import { PostStudentPayload } from "@/types/student_module/postStudent";
import { GetStudentDetailProps } from "@/types/student_module/getStudentById";
import { PatchStudentPayload } from "@/types/student_module/patchStudent";

export const getStudents = (): Promise<GetStudentProps> =>
  apiClient.get(`/apis/student`);

export const getStudentsDetail = (id: string): Promise<GetStudentDetailProps> =>
  apiClient.get(`/apis/student/${id}`);

export const postStudent = (payload: PostStudentPayload): Promise<any> =>
  apiClient.post(`/apis/student`, payload);

export const patchStudent = (
  id: string,
  payload: PatchStudentPayload
): Promise<any> => apiClient.patch(`/apis/student/${id}`, payload);
