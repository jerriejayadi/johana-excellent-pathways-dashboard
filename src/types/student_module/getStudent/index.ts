import { EStatusStudent } from "@/types";

export interface GetStudentParamsProps {
  keyword?: string;
  limit?: number;
  page?: number;
}

export interface GetStudentProps {
  result: Result;
}

export interface Result {
  items: StudentList[];
  meta: Meta;
}

export interface StudentList {
  id: string;
  name: string;
  gender: string;
  phone: string;
  feePerMeeting: string;
  status: EStatusStudent;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
