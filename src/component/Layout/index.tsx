"use client";
import { redirect, usePathname } from "next/navigation";
import Navbar from "../Navbar";
import NavigationBottom from "../NavigationBottom";
import { useEffect } from "react";
import { localStorageMixins } from "@/utils/localStorageMixins";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/login") {
    return children;
  }
  useEffect(() => {
    const access_token = localStorageMixins.get(`access_token`);
    if (!access_token && !pathname.includes(`/login`)) {
      redirect("/login");
    }
  }, []);
  return (
    <div className={`w-full`}>
      <Navbar />
      <main className="flex min-h-screen flex-grow flex-col items-start justify-between px-4 py-4  dark:bg-dark-background">
        {children}
      </main>
      <NavigationBottom />
    </div>
  );
}
