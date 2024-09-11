import { EGender, EStatusStudent } from "@/types";

export interface PatchStudentPayload {
  name: string;
  gender: EGender;
  phone: string;
  feePerMeeting: number;
  status: EStatusStudent;
}
