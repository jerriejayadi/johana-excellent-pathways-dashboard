"use client";
import { toTitleCase } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { PiArrowLeftBold } from "react-icons/pi";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const handleBack = () => {
    router.push(`/` + path.split(`/`)[1]);
  };
  return (
    <div
      className={`sticky left-0 top-0 dark:bg-dark-background w-full flex items-center px-4 py-3  border-b border-dark-border z-50 `}
    >
      {path.split(`/`).length > 2 && (
        <button
          className={`active:bg-gray-600 bg-opacity-5 rounded-[100%] mr-3 p-1`}
          onClick={() => {
            handleBack();
          }}
        >
          <PiArrowLeftBold className={`size-6`} />
        </button>
      )}
      <h1 className={`text-2xl font-bold`}>
        {path === "/" && "JEP"}
        {path !== "/" && toTitleCase(path.split("/")[1])}
      </h1>
    </div>
  );
}
