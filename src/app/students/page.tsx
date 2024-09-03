"use client";
import UsersCard from "@/component/UsersCard";
import { getStudents } from "@/service/students";
import { useRequest } from "ahooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaMale } from "react-icons/fa";
import { PiMagnifyingGlass } from "react-icons/pi";

export default function Students() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("all");

  const pushCreate = () => {
    router.push(`/students/create`);
  };

  const { data, run } = useRequest(getStudents);

  return (
    <div className={`flex flex-col gap-6 w-full h-full pb-28`}>
      {/* Header */}

      <div className={`flex items-center justify-start gap-2`}>
        <div
          onClick={() => {
            setStatus("all");
          }}
          className={`rounded-full ${
            status === "all"
              ? "bg-dark-primary bg-opacity-20  text-dark-primary"
              : "bg-dark-surface text-dark-text"
          }   px-4 py-1 min-w-[50px] text-center transition-colors duration-150`}
        >
          All
        </div>
        <div
          onClick={() => {
            setStatus("active");
          }}
          className={`rounded-full ${
            status === "active"
              ? "bg-dark-success bg-opacity-20 text-dark-success"
              : "bg-dark-surface text-dark-text"
          }   px-4 py-1 min-w-[50px] text-center transition-colors duration-150`}
        >
          Active
        </div>
        <div
          onClick={() => {
            setStatus("inactive");
          }}
          className={`rounded-full ${
            status === "inactive"
              ? "bg-dark-error bg-opacity-20 text-dark-error"
              : "bg-dark-surface bg-opacity-100 text-dark-text"
          }  px-4 py-1 min-w-[50px] text-center transition-colors duration-150`}
        >
          Inactive
        </div>
      </div>
      <div>
        <div
          className={`w-full focus-within:border-gray-500 border border-dark-border rounded-md px-3 py-2 flex items-center gap-4`}
        >
          <PiMagnifyingGlass className={`size-5 text-dark-text-secondary`} />
          <input
            type={`text`}
            placeholder={`Search Student`}
            className={`w-full bg-inherit focus:outline-none  focus:border-gray-500 placeholder:text-dark-text-secondary`}
          />
        </div>
      </div>
      <button
        onClick={() => {
          pushCreate();
        }}
        className={`bg-dark-primary px-4 py-2 rounded-[4px] active:bg-blue-600`}
      >
        + Create Student
      </button>
      {/* Cards */}
      <div className={`flex flex-col gap-3`}>
        {data?.result.map((rows, index) => (
          <UsersCard
            key={`students-${index + 1}`}
            onClick={() => {
              router.push(`/students/${rows.id}`);
            }}
            fullname={rows.fullname}
            gender={rows.gender}
            status={rows.status}
          />
        ))}
      </div>
    </div>
  );
}
