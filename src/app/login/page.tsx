"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleLogin = () => {
    router.push(`/`);
  };
  return (
    <main
      className={`w-screen h-screen bg-background dark:bg-dark-background flex flex-col items-center justify-center p-6 text-dark-text md:items-start md:p-40`}
    >
      <div
        className={`md:bg-surface md:dark:bg-dark-surface  rounded-lg w-full md:w-[50%] md:p-5`}
      >
        <h1 className={`text-4xl font-bold`}>JEP&apos;s Dashboard</h1>
        <p className={`mt-2`}>
          Welcome to JEP&apos;s Dashboard! Log in to the app using registered
          google account!
        </p>
        <button
          onClick={() => {
            handleLogin();
          }}
          className={`mt-6 dark:bg-dark-primary px-4 py-3 w-full flex items-center justify-center gap-2 rounded-md active:brightness-90 transition-all duration-150 text-white`}
        >
          <Image
            alt={`google-icon-login`}
            src={`/icons/google-icon.png`}
            width={1080}
            height={1080}
            className={`size-6 rounded-[100%]`}
          />
          <p>Sign in with Google</p>
        </button>
      </div>
    </main>
  );
}
