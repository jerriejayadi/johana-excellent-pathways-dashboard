"use client";

import Input from "@/component/Input";
import Modal from "@/component/Modal";
import { getStudentsDetail, patchStudent } from "@/service/students_module";
import { EGender, EStatusStudent } from "@/types";
import { PatchStudentPayload } from "@/types/student_module/patchStudent";
import { currencyFormat } from "@/utils";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";

export interface EditDataPayload {
  name: string;
  gender: EGender;
  phone: string;
  feePerMeeting: string;
  status: EStatusStudent;
}

export default function EditStudent({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [data, setData] = useState<EditDataPayload>({
    feePerMeeting: "0",
    name: "",
    gender: EGender.MALE,
    phone: "",
    status: EStatusStudent.ACTIVE,
  });

  const { data: fetchedData, runAsync } = useRequest(getStudentsDetail, {
    manual: true,
  });
  const { runAsync: submit, loading: submitLoading } = useRequest(
    patchStudent,
    { manual: true }
  );

  const handleSubmit = () => {
    let payload: PatchStudentPayload = {
      ...data,
      feePerMeeting: Number(data.feePerMeeting.replaceAll(".", "")),
    };
    submit(params.id, payload)
      .then((res) => {
        setModalSuccess(true);
      })
      .catch((err) => {
        setErrorMessage(err);
        setModalFailed(true);
      });
  };

  useEffect(() => {
    runAsync(params.id).then((res) => {
      setData({
        name: res.result.name,
        gender: res.result.gender as EGender,
        phone: res.result.phone,
        feePerMeeting: currencyFormat(res.result.feePerMeeting),
        status: res.result.status as EStatusStudent,
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={`flex flex-col gap-4 `}>
          <Input
            onChange={(e) => {
              setData((prev) => ({ ...prev, fullname: e.target.value }));
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
                id={`status`}
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
          disabled={submitLoading}
          className={`flex items-center justify-center mt-6 w-full bg-dark-primary text-white active:bg-dark-primary/75 px-4 py-3 rounded-lg`}
        >
          {submitLoading ? (
            <CgSpinner className={`size-6 animate-spin`} />
          ) : (
            <>Edit Student</>
          )}
        </button>
      </form>

      <Modal
        isOpen={modalSuccess}
        onClose={() => {
          router.push(`/students/${params.id}`);
        }}
        withCloseButton={false}
      >
        <div className={`flex flex-col items-center justify-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-24 fill-dark-success text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <p className={`text-2xl font-bold text-dark-text mt-6`}>
            Data edited successfully
          </p>

          <button
            onClick={() => {
              router.push(`/students/${params.id}`);
            }}
            className={`bg-dark-success text-white w-full px-3 py-2 rounded-lg mt-6 active:bg-dark-success/70`}
          >
            Return to student detail page
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={modalFailed}
        onClose={() => {
          setModalFailed(false);
        }}
        withCloseButton={false}
      >
        <div className={`flex flex-col items-center justify-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-24 fill-error"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <p className={`text-2xl font-bold text-dark-text mt-6`}>
            Failed to Edit Data
          </p>
          <p className={`text-dark-text-secondary mt-2 text-center`}>
            Error {errorMessage?.status} -{" "}
            {errorMessage?.response?.data?.message}
          </p>
          <button
            onClick={() => {
              setModalFailed(false);
            }}
            className={`bg-dark-error text-white w-full px-3 py-2 rounded-lg mt-6 active:bg-dark-error/70`}
          >
            Try Again
          </button>
        </div>
      </Modal>
    </div>
  );
}
