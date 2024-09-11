"use client";
import AddAttendanceModal from "@/component/AddAttendanceModal";
import Chip from "@/component/Chip";
import Input from "@/component/Input";
import Modal from "@/component/Modal";
import { getAttendance } from "@/service/attendance_module";
import { getStudentsDetail } from "@/service/students_module";
import { EGender } from "@/types";
import { translateColorChips, toTitleCase } from "@/utils";
import { useRequest } from "ahooks";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp, BiEdit } from "react-icons/bi";
import { PiPlusBold } from "react-icons/pi";

export default function StudentDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [attendanceModal, setAttendanceModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredAttendance, setFilteredAttendance] =
    useState<Record<string, { date_of_attendance: string }[]>>();

  const { data, run } = useRequest(getStudentsDetail, { manual: true });
  const { data: attendanceList, runAsync: fetchAttendance } = useRequest(
    getAttendance,
    {
      manual: true,
    }
  );

  const handleFetchAttendance = useCallback(() => {
    fetchAttendance(params.id).then((res) => {
      // please filter the result based on the date
      setFilteredAttendance(
        res.result.reduce((acc, curr) => {
          const month = new Date(curr.date_of_attendance).toLocaleString(
            "default",
            {
              month: "long",
              year: "numeric",
            }
          );
          if (!acc[month]) {
            acc[month] = [];
          }
          acc[month].push(curr as any);
          return acc;
        }, {} as Record<string, { date_of_attendance: string }[]>)
      );
    });
  }, []);

  useEffect(() => {
    console.log(filteredAttendance);
  }, [filteredAttendance]);

  useEffect(() => {
    run(params.id);
  }, []);

  return (
    <div className={`w-full flex flex-col gap-6 pb-28`}>
      {/* Profile */}
      <div className={`bg-dark-surface w-full p-4 rounded-lg`}>
        <div className={`flex items-center gap-4 shrink-0`}>
          <Image
            alt={``}
            src={
              data?.result?.gender === EGender.MALE
                ? `/icons/male.png`
                : `/icons/female.png`
            }
            className={`size-14 shrink-0`}
            width={1000}
            height={1000}
          />
          <div className={`w-full`}>
            <p className={`text-2xl font-bold`}>{data?.result?.name}</p>
            <p className={`text-dark-text-secondary mt-1 text-sm`}>
              +6281234567890
            </p>
            {/* <Chip
              color={translateColorChips(data.status) as any}
              className={`mt-2 text-sm`}
            >
              {toTitleCase(data.status)}
            </Chip> */}

            {/* <label className="inline-flex items-center gap-2  cursor-pointer  w-full mt-1">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-error  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dark-success"></div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Active
              </div>
            </label> */}
          </div>{" "}
          {/* <button
            onClick={() => {
              router.push(`/students/edit/${params.id}`);
            }}
            className={`text-dark-primary`}
          >
            <BiEdit className={`size-6`} />
          </button> */}
        </div>
        <button
          onClick={() => {
            router.push(`/students/edit/${params.id}`);
          }}
          className={`mt-4 w-full bg-dark-primary active:bg-dark-primary/70 rounded-lg px-3 py-1 flex items-center justify-center`}
        >
          Edit Data
        </button>
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
            if (!isOpen) {
              handleFetchAttendance();
            }
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
            {filteredAttendance ? (
              Object.entries(filteredAttendance!).map(
                ([month, attendanceArray]) => (
                  <div key={month}>
                    <p className={`font-semibold mb-1`}>{month}</p>
                    <div className={`ml-4`}>
                      {attendanceArray.map((rows, index) => (
                        <p key={`attendance-${month}-${index}`}>
                          {moment(rows.date_of_attendance).format(
                            "D MMMM YYYY"
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              )
            ) : (
              <p className={`italic`}>No Attendance Available</p>
            )}
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
        id={params.id}
        title={`Attendance`}
        isOpen={attendanceModal}
        onClose={function (): void {
          setAttendanceModal(false);
        }}
        onSuccess={() => {
          setAttendanceModal(false);
          handleFetchAttendance();
        }}
      />
    </div>
  );
}
