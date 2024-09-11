"use client";
import Modal from "@/component/Modal";
import { postAdminGoogle } from "@/service/admin_module";
import { localStorageMixins } from "@/utils/localStorageMixins";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();

  const [access_token, setAccessToken] = useState<string>(""),
    [failedModal, setFailedModal] = useState<boolean>(false),
    [errorMessage, setErrorMessage] = useState<any>();

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      onSuccessGoogleLogin(credentialResponse);
    },
    onError: (err) => {
      console.log(err);
    },
    onNonOAuthError: (err) => {
      console.log(err);
    },
  });

  const onSuccessGoogleLogin = async (googleResponse: any) => {
    try {
      // code request to backend
      const tokenGoogle = googleResponse?.access_token;
      postAdminGoogle({ token: tokenGoogle })
        .then((res) => {
          localStorageMixins.set("access_token", res.result.access_token);
          localStorageMixins.set("profile", res.result.profile);
          setAccessToken(res.result.access_token);
        })
        .catch((error) => {
          setFailedModal(true);
          console.log(error);
          setErrorMessage(error);
        });
    } catch (error) {
      // catch some error
    }
  };

  useEffect(() => {
    if (localStorageMixins.get(`access_token`)) {
      router.push("/");
    }
  }, [access_token]);
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
            googleLogin();
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
      <Modal
        isOpen={failedModal}
        onClose={function (): void {
          setFailedModal(false);
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
            Failed to Login!
          </p>
          <p className={`text-dark-text-secondary mt-2`}>
            Error {errorMessage?.status} -{" "}
            {errorMessage?.response?.data?.message}
          </p>
        </div>
      </Modal>
    </main>
  );
}
