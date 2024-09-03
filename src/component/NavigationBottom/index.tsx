import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PiHouse,
  PiHouseFill,
  PiHouseSimple,
  PiNote,
  PiNoteFill,
  PiStudent,
  PiStudentFill,
} from "react-icons/pi";

export default function NavigationBottom() {
  const path = usePathname();
  return (
    <div
      className={`fixed left-0 bottom-0 right-0 z-40 text-white dark:bg-dark-background px-4 py-1 w-full flex items-center justify-around border-t border-dark-border`}
    >
      <Link
        href={`/`}
        className={`flex flex-col items-center justify-center aspect-square ${
          path === "/" && "text-dark-primary "
        } active:bg-gray-500 active:bg-opacity-20 rounded-[100%] p-2 transition-all duration-150`}
      >
        {path === "/" ? (
          <PiHouseFill className={`size-8`} />
        ) : (
          <PiHouse className={`size-8`} />
        )}

        <p className={`text-xs mt-1`}>Home</p>
      </Link>
      <Link
        href={`/students`}
        className={`flex flex-col items-center justify-center aspect-square ${
          path.includes("/students") && "text-dark-primary "
        } active:bg-gray-500 active:bg-opacity-20 rounded-[100%] p-2 transition-all duration-150`}
      >
        {path.includes("/students") ? (
          <PiStudentFill className={`size-8`} />
        ) : (
          <PiStudent className={`size-8`} />
        )}

        <p className={`text-xs mt-1`}>Students</p>
      </Link>
      <Link
        href={`/attendance`}
        className={`flex flex-col items-center justify-center aspect-square ${
          path === "/attendance" && "text-dark-primary "
        } active:bg-gray-500 active:bg-opacity-20 rounded-[100%] p-2 transition-all duration-150`}
      >
        {path === "/attendance" ? (
          <PiNoteFill className={`size-8`} />
        ) : (
          <PiNote className={`size-8`} />
        )}

        <p className={`text-xs mt-1`}>Attendance</p>
      </Link>
    </div>
  );
}
