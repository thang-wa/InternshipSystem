import React, { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Header from "../../components/header";
import { authContext, useAuthContext } from "../../context/UserContext";
import DatePicker from "react-datepicker";
import LoadingAnimaton from "../../public/loading_anim.webp";
import Image from "next/image";
import { getJobBySlug, getStops, setStops } from "../../firebase/firestore";
import { firestore } from "../../firebase/firebase";
import Select from "react-select";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import Link from "next/link";
import { generateSlug } from "../../utils/formatString";
import { RouteChangeCheck } from "@/utils/RouteChangeCheck";
import { Button } from "@/components/ui/button";

const Jobs = () => {
  const { currentUser, isUserLoading } = useAuthContext();
  const router = useRouter();
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  var route_uid;

  const getOptions = () => {
    const options = jobs.map((stop) => {
      return { value: stop.name, label: stop.name };
    });
    return options;
  };

  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      console.log("something is wrong");
      console.log(isUserLoading);
      console.log(currentUser);
      router.push("/");
    }

    const getJobsList = async () => {
      setLoading(true);
      await firestore
        .collection("jobs")
        .get()
        .then(function (snapshot) {
          const data = [];
          snapshot.docs.forEach((doc) => {
            data.push(doc.data());
          });
          setJobs(data);
          console.log(data);
          setLoading(false);
        });
    };
    getJobsList();
    // setToOptions(getToOptions());
    // getToOptions().then((options) => {
    //   console.log(options);
    //   setToOptions(options);
    // });
  }, [currentUser, isUserLoading]);
  const options = getOptions();
  // function timeout(delay) {
  //   return new Promise((res) => setTimeout(res, delay));
  // }
  // isUserLoggedIn();
  if (isUserLoading) {
    return (
      <RouteChangeCheck>
        <div className="flex flex-col items-center justify-center h-screen">
          <Image src={LoadingAnimaton} alt="Loading..." />
        </div>
      </RouteChangeCheck>
    );
  } else {
    return (
      <RouteChangeCheck>
        <div className="min-h-screen w-screen">
          <Header />

          <section className="my-14" id="how_section">
            <section className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5  mx-auto">
                <div className="flex flex-wrap m-12">
                  {loading ? (
                    <div className="flex items-center m-auto justify-center h-screen">
                      <Image src={LoadingAnimaton} alt="Loading..." />
                    </div>
                  ) : (
                    <>
                      {jobs.length <= 0 ? (
                        <div className="text-center p-10 text-4xl h-full">
                          <h1>No jobs</h1>
                        </div>
                      ) : (
                        <div className="flex w-screen flex-col space-x-6">
                          {currentUser && currentUser.organisation === true && (
                            <Link className="mx-auto" href="/jobs/new">
                              <Button
                                variant="link"
                                className="hover:text-pink_red text-black p-2"
                              >
                                Creat new job post
                              </Button>
                            </Link>
                          )}
                          <div className="grid grid-cols-2">
                            {jobs.map((job) => {
                              return (
                                <div
                                  key={job.uid}
                                  className="p-12 md:w-1/2 flex flex-col items-start"
                                >
                                  <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                                    {job.type}
                                  </span>
                                  <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                                    {job.title}
                                  </h2>
                                  {/* <p className="leading-relaxed mb-8">{job.position}</p> */}
                                  <span className="flex-grow flex flex-col mb-8">
                                    <span className="title-font font-medium text-gray-900">
                                      Position
                                    </span>
                                    <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                                      {job.position}
                                    </span>
                                  </span>
                                  <a className="inline-flex items-center">
                                    {/* <Image alt="blog" layout='fill' src="https://dummyimage.com/104x104" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/> */}
                                    <span className="flex-grow flex flex-col mb-4">
                                      <span className="title-font font-medium text-gray-900">
                                        Salary
                                      </span>
                                      <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                                        {job.salary + "Ksh Per Month"}
                                      </span>
                                    </span>
                                  </a>
                                  <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full ">
                                    <Link
                                      passHref
                                      href={`/jobs/${job.uid}`}
                                      className="text-indigo-500 inline-flex items-center "
                                    >
                                      <h1 className="hover:text-indigo-500 hover:scale-105 hover:cursor-pointer flex align-middle justify-center space-x-4 font-bold">
                                        Learn More
                                      </h1>
                                    </Link>
                                    {/* <button
                            onClick={() => {
                              getJobBySlug(job.uid).then((job) => {
                                console.log(job);
                              });
                            }}
                          >
                            scaaarded
                          </button> */}

                                    <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                      <svg
                                        className="w-4 h-4 mr-1"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                      </svg>
                                      1.2K
                                    </span>
                                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                      <svg
                                        className="w-4 h-4 mr-1"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                      </svg>
                                      {job.applications.length}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>
          </section>
        </div>
      </RouteChangeCheck>
    );
  }
};

export default Jobs;
