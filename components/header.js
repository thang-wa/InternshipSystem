import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import LogoTrans from "../public/logo/classic_coast_logo_trans.svg";
import { authContext, useAuthContext } from "../context/UserContext";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";

const Header = () => {
  const { currentUser, isUserLoading } = useAuthContext();
  const router = useRouter();
  const currentPath = router.pathname;
  console.log(currentPath);
 useEffect(() => {
    if (!isUserLoading && !currentUser) {
      console.log("something is wrong");
      console.log(isUserLoading);
      console.log(currentUser);
      router.push("/");

      if(!currentUser){
        router.push('/')
      }
    }
  }, [currentUser, isUserLoading]);
  return (
    <div>
      <nav className="bg-white  shadow ">
        <div className=" mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="w-full justify-between flex items-center">
              <Link className="flex-shrink-0 cursor-pointer font-bold" href="/">
                {/* <Image
                  src={LogoTrans}
                  width={150}
                  height={150}
                  alt="Classic Coast Logo"
                /> */}
                LOGO
              </Link>
              <div className="hidden md:block">
                {/* hover does not change text color */}
                <div className="ml-10 flex items-baseline space-x-11">
                  <Link
                    className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    href="/home"
                  >
                    {currentPath === "/home" ? (
                      <p className=" text-[16px] text-pink_red px-3 py-2 rounded-md font-medium cursor-pointer">
                        Home
                      </p>
                    ) : (
                      <p className="text-black text-[16px] hover:text-pink_red px-3 py-2 rounded-md font-medium cursor-pointer">
                        Home
                      </p>
                    )}
                  </Link>
                  {
                    currentUser.admin && (
                      <>
                        {
                          currentUser.admin === true ? (
                          <Link
                    className="text-pink_red hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    href="/admin"
                  >
                    {currentPath === "/admin" ? (
                      <p className=" text-[16px] text-pink_red px-3 py-2 rounded-md font-medium cursor-pointer">
                        Admin
                      </p>
                    ) : (
                      <p className="text-black text-[16px] hover:text-pink_red px-3 py-2 rounded-md font-medium cursor-pointer">
                        Admin
                      </p>
                    )}
                  </Link>
                          ): (
                              <></>
                          )
                        }
                      </>
                    )
                      }
                  <Link
                    className="text-pink_red hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    href="/jobs"
                  >
                    {currentPath === "/jobs" ? (
                      <p className=" text-[16px] text-pink_red px-3 py-2 rounded-md font-medium cursor-pointer">
                        Jobs
                      </p>
                    ) : (
                      <p className="text-black text-[16px] hover:text-pink_red px-3 py-2 rounded-md font-medium cursor-pointer">
                        Jobs
                      </p>
                    )}
                  </Link>
                  {/* {currentUser.organisation ? (
                    <Link href="/admin">
                      <span className="underline text-pink_red cursor-pointer">
                        Admin
                      </span>
                    </Link>
                  ) : (
                    <></>
                  )} */}
                  <a
                    onClick={async () => {
                      await auth
                        .signOut()
                        .then(() => {
                          console.log("signed out");
                        })
                        .catch((error) => {
                          console.log(error);
                        });

                      router.push("/");
                    }}
                    className="underline  cursor-pointer"
                  >
                    Log Out
                  </a>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6"></div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                    Home
                </Link>
            
                <Link className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                    How it works
                </Link>
                <Link className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                    <button className='bg-pink_red rounded-md p-2 text-white'>Book now</button>
                </Link>
            </div>
        </div> */}
      </nav>
    </div>
  );
};

export default Header;
