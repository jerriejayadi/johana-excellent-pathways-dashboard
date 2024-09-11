export interface GetStudentDetailProps {
  result: Result;
}

export interface Result {
  id: string;
  name: string;
  gender: string;
  phone: string;
  feePerMeeting: string;
  status: string;
}
