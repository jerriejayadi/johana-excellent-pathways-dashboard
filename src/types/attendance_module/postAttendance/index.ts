export interface GetAttendanceParams {
  limit?: number;
  page?: number;
}

export interface PostAttendancePayload {
  studentId: string;
  dateOfAttendance: Date;
}
