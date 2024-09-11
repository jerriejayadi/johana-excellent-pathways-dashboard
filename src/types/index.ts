export interface StudentListProps {
  status: number;
  result: IStudentList[];
}

export interface IStudentList {
  id: string;
  fullname: string;
  gender: EGender;
  phone: string;
  status: EStatusStudent;
  fee: string;
}

export enum EStatusStudent {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum EGender {
  MALE = "L",
  FEMALE = "P",
}

export enum EUserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
