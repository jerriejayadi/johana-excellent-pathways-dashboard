"use client";

import Input from "@/component/Input";
import { postStudent } from "@/service/students_module";
import { EGender } from "@/types";
import { PostStudentPayload } from "@/types/student_module/postStudent";
import { currencyFormat } from "@/utils";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";

export interface DataProps {
  name: string;
  gender: EGender;
  phone: string;
  feePerMeeting: string;
}

export default function CreateStudent() {
  const router = useRouter();
  const [data, setData] = useState<DataProps>({
    feePerMeeting: "",
    name: "",
    gender: EGender.MALE,
    phone: "",
  });
  const { runAsync: postData, loading } = useRequest(postStudent);

  const handleSubmit = () => {
    let payload: PostStudentPayload = {
      ...data,
      feePerMeeting: Number(data.feePerMeeting.replaceAll(".", "")),
    };
    postData(payload)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className={`w-full flex flex-col gap-6 pb-28`}>
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold`}>Create Student</h1>
      </div>

      {/* Forms */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={`flex flex-col gap-4 `}>
          <Input
            required
            onChange={(e) => {
              setData((prev) => ({ ...prev, name: e.target.value }));
            }}
            value={data.name}
            label={`Nama Lengkap`}
            id="nama_lengkap"
            placeholder={`Masukkan Nama Lengkap`}
          />
          <div className={`flex flex-col`}>
            <label htmlFor={`gender`} className={`mb-2`}>
              Jenis Kelamin
            </label>
            <div
              className={` w-full bg-dark-background px-4 py-3 border border-dark-border rounded-lg focus-within:border-gray-500 appearance-none flex items-center`}
            >
              <select
                value={data.gender}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    gender: e.target.value as EGender,
                  }));
                }}
                id={`gender`}
                className={`w-full bg-dark-background   focus:outline-none appearance-none`}
              >
                <option value={EGender.MALE}>Laki-laki</option>
                <option value={EGender.FEMALE}>Perempuan</option>
              </select>
              <BiChevronDown className={`size-6`} />
            </div>
          </div>
          <Input
            required
            value={data.phone}
            onChange={(e) => {
              setData((prev) => ({ ...prev, phone: e.target.value }));
            }}
            type={`tel`}
            id={`contact`}
            placeholder={`Ex: +6281234567890`}
            label={`Kontak`}
          />
          <Input
            required
            value={data.feePerMeeting}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                feePerMeeting: currencyFormat(e.target.value),
              }));
            }}
            type={`text`}
            id={`monthly_fee`}
            placeholder={`Ex: 300.000.000`}
            label={`Fee`}
          />
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className={`flex items-center justify-center w-full mt-6 bg-dark-primary text-white active:bg-dark-primary/75 px-4 py-3 rounded-lg disabled:bg-gray-500`}
        >
          {/* <CgSpinner className={`size-6`} />  */}
          {loading ? <CgSpinner className={`size-6 animate-spin`} /> : <>Create Student</>}
        </button>
      </form>
    </div>
  );
}
