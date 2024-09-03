"use client";

import Input from "@/component/Input";
import { getStudentsDetail } from "@/service/students";
import { EGender, EStatusStudent } from "@/types";
import { currencyFormat } from "@/utils";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

export interface EditDataPayload {
  fullname: string;
  gender: EGender;
  phone: string;
  fee: string;
  status: EStatusStudent;
}

export default function EditStudent({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<EditDataPayload>({
    fee: "",
    fullname: "",
    gender: EGender.MALE,
    phone: "",
    status: EStatusStudent.ACTIVE,
  });
  const { data: fetchedData, runAsync } = useRequest(getStudentsDetail, {
    manual: true,
  });
  useEffect(() => {
    runAsync(params.id).then((res) => {
      setData({
        fullname: res.fullname,
        gender: res.gender,
        phone: res.phone,
        fee: currencyFormat(res.fee),
        status: res.status,
      });
    });
  }, []);
  return (
    <div className={`w-full flex flex-col gap-6 pb-28`}>
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold`}>Edit Student</h1>
      </div>

      {/* Forms */}
      <div className={`flex flex-col gap-4 `}>
        <Input
          onChange={(e) => {
            setData((prev) => ({ ...prev, fullname: e.target.value }));
          }}
          value={data.fullname}
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
          value={data.fee}
          onChange={(e) => {
            setData((prev) => ({
              ...prev,
              fee: currencyFormat(e.target.value),
            }));
          }}
          type={`text`}
          id={`monthly_fee`}
          placeholder={`Ex: 300.000.000`}
          label={`Fee`}
        />
        <div className={`flex flex-col`}>
          <label htmlFor={`gender`} className={`mb-2`}>
            Status
          </label>
          <div
            className={` w-full bg-dark-background px-4 py-3 border border-dark-border rounded-lg focus-within:border-gray-500 appearance-none flex items-center`}
          >
            <select
              value={data.status}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  status: e.target.value as EStatusStudent,
                }));
              }}
              id={`gender`}
              className={`w-full bg-dark-background   focus:outline-none appearance-none`}
            >
              <option value={EStatusStudent.ACTIVE}>Active</option>
              <option value={EStatusStudent.INACTIVE}>Inactive</option>
            </select>
            <BiChevronDown className={`size-6`} />
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => {
          router.push(`/students/${params.id}`);
        }}
        className={`bg-dark-primary text-white active:bg-dark-primary/75 px-4 py-3 rounded-lg`}
      >
        Edit Student
      </button>
    </div>
  );
}
