import { IStudentList, StudentListProps } from "@/types";
import apiClient from ".";

export const getStudents = (): Promise<StudentListProps> =>
  apiClient.get(`/api/students`);

export const getStudentsDetail = (id: string): Promise<IStudentList> =>
  apiClient.get(`/api/students/${id}`);
