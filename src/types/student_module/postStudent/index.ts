import { EGender } from "@/types";

export interface PostStudentPayload {
  name: string;
  gender: EGender;
  phone: string;
  feePerMeeting: number;
}
