"use client";

import Input from "@/component/Input";
import { BiChevronDown } from "react-icons/bi";

export default function CreateStudent() {
  return (
    <div className={`w-full flex flex-col gap-6 pb-28`}>
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold`}>Create Student</h1>
      </div>

      {/* Forms */}
      <div className={`flex flex-col gap-4 `}>
        <Input
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
              id={`gender`}
              className={`w-full bg-dark-background   focus:outline-none appearance-none`}
            >
              <option value={`male`}>Laki-laki</option>
              <option value={`female`}>Perempuan</option>
            </select>
            <BiChevronDown className={`size-6`} />
          </div>
        </div>
        <Input
          type={`tel`}
          id={`contact`}
          placeholder={`Ex: +6281234567890`}
          label={`Kontak`}
        />
        <Input
          type={`text`}
          id={`monthly_fee`}
          placeholder={`Ex: 300.000.000`}
          label={`Fee`}
        />
      </div>

      {/* Button */}
      <button
        onClick={() => {}}
        className={`bg-dark-primary text-white active:bg-dark-primary/75 px-4 py-3 rounded-lg`}
      >
        Create Student
      </button>
    </div>
  );
}
