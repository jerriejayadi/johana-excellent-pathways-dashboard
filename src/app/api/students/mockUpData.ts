import { EGender, EStatusStudent, StudentListProps } from "@/types";

export const responseSuccess: StudentListProps = {
  status: 200,
  result: [
    {
      id: "0x1",
      fullname: "Jerrie Jayadi",
      gender: "male" as EGender,
      phone: "+6281234567890",
      status: "active" as EStatusStudent,
      fee: "300000",
    },
    {
      id: "0x2",
      fullname: "Johana",
      gender: "female" as EGender,
      phone: "+6281234567890",
      status: "inactive" as EStatusStudent,
      fee: "500000",
    },
    {
      id: "0x3",
      fullname: "Kevin Chandra",
      gender: "male" as EGender,
      phone: "+6281234567890",
      status: "active" as EStatusStudent,
      fee: "1000000",
    },
    {
      id: "0x4",
      fullname: "Dewanto Surya",
      gender: "male" as EGender,
      phone: "+6281234567890",
      status: "active" as EStatusStudent,
      fee: "500000",
    },
  ],
};
