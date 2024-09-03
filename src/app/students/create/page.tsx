"use client";

import Input from "@/component/Input";
import { EGender } from "@/types";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

export interface DataProps {
  fullname: string;
  gender: EGender;
  phone: string;
  fee: string;
}

export default function CreateStudent() {
  const router = useRouter();
  const [data, setData] = useState<DataProps>({
    fee: "",
    fullname: "",
    gender: EGender.MALE,
    phone: "",
  });
  return (
    <div className={`w-full flex flex-col gap-6 pb-28`}>
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold`}>Create Student</h1>
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
      </div>

      {/* Button */}
      <button
        onClick={() => {
          router.push(`/students`);
        }}
        className={`bg-dark-primary text-white active:bg-dark-primary/75 px-4 py-3 rounded-lg`}
      >
        Create Student
      </button>
    </div>
  );
}
