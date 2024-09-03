"use client";
import { usePathname } from "next/navigation";
import Navbar from "../Navbar";
import NavigationBottom from "../NavigationBottom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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
