"use client";
import AddAttendanceModal from "@/component/AddAttendanceModal";
import Chip from "@/component/Chip";
import Input from "@/component/Input";
import Modal from "@/component/Modal";
import { translateColorChips, toTitleCase } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { PiPlusBold } from "react-icons/pi";

export default function StudentDetail() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [attendanceModal, setAttendanceModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const data = {
    fullname: "Jerrie Jayadi",
    gender: "male",
    status: "active",
  };

  return (
    <div className={`w-full flex flex-col gap-6 pb-28`}>
      {/* Profile */}
      <div className={`bg-dark-surface w-full px-4 py-3 rounded-lg`}>
        <div className={`flex items-center gap-4 shrink-0`}>
          <Image
            alt={``}
            src={
              data.gender === "male" ? `/icons/male.png` : `/icons/female.png`
            }
            className={`size-14 shrink-0`}
            width={1000}
            height={1000}
          />
          <div className={`w-full`}>
            <p className={`text-2xl font-bold`}>{data.fullname}</p>
            <p className={`text-dark-text-secondary mt-1 text-sm`}>
              +6281234567890
            </p>
            {/* <Chip
              color={translateColorChips(data.status) as any}
              className={`mt-2 text-sm`}
            >
              {toTitleCase(data.status)}
            </Chip> */}
            <label className="inline-flex items-center gap-2  cursor-pointer  w-full mt-1">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-error  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dark-success"></div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Active
              </div>
            </label>
          </div>
        </div>
        <div>Edit</div>
      </div>
      {/* Payment Info */}
      <div className={`relative flex flex-col bg-dark-surface rounded-lg p-4 `}>
        <h1 className={`text-dark-text-secondary`}>Belum Bayar</h1>
        <p className={`text-2xl font-bold mt-1`}>Rp250.000.000</p>
      </div>

      <div
        className={`relative flex flex-col bg-dark-surface rounded-lg ${
          isOpen && "divide-y divide-dark-border"
        }`}
      >
        {/* header */}
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={`relative px-4 py-3 md:hover:cursor-pointer`}
        >
          <h1 className={`text-dark-text`}>Presensi</h1>

          {isOpen ? (
            <BiChevronUp
              className={`absolute right-4 top-0 bottom-0 my-auto size-6`}
            />
          ) : (
            <BiChevronDown
              className={`absolute right-4 top-0 bottom-0 my-auto size-6`}
            />
          )}
        </div>
        {isOpen && (
          <div className="p-4 flex flex-col gap-6 ">
            <div>
              <p className={`font-semibold mb-1`}>Agustus 2024</p>
              <div className={`ml-4`}>
                <p>29 Agustus 2024</p>
                <p>26 Agustus 2024</p>
                <p>22 Agustus 2024</p>
                <p>19 Agustus 2024</p>
                <p>15 Agustus 2024</p>
                <p>12 Agustus 2024</p>
                <p>8 Agustus 2024</p>
                <p>5 Agustus 2024</p>
                <p>1 Agustus 2024</p>
              </div>
            </div>
            <div>
              <p className={`font-semibold mb-1`}>Juli 2024</p>
              <div className={`ml-4`}>
                <p>29 Juli 2024</p>
                <p>25 Juli 2024</p>
                <p>22 Juli 2024</p>
                <p>18 Juli 2024</p>
                <p>15 Juli 2024</p>
                <p>11 Juli 2024</p>
                <p>8 Juli 2024</p>
                <p>4 Juli 2024</p>
                <p>1 Juli 2024</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          setAttendanceModal(true);
        }}
        className={`bg-primary aspect-square fixed bottom-28 right-6 p-3 rounded-[100%] active:bg-primary/70  `}
      >
        <PiPlusBold className={`size-6`} />
      </button>
      <AddAttendanceModal
        title={`Attendance`}
        isOpen={attendanceModal}
        onClose={function (): void {
          setAttendanceModal(false);
        }}
        onSuccess={() => {}}
      />
    </div>
  );
}
