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
  fee:string;
}

export enum EStatusStudent {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export enum EGender {
  MALE = "male",
  FEMALE = "female",
}
