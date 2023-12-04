import React from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import { getJobBySlug } from "../../firebase/firestore";
import { firestore } from "../../firebase/firebase";
import Header from "../../components/header";
import { timestampToDate } from "../../utils/formatString";
import LoadingAnimaton from "../../public/loading_anim.webp";
import Image from "next/image";
import { useAuthContext } from "context/UserContext";
import { Button } from "@/components/ui/button";
import NestedModal from "./nested-modal";

export default function JopbSlugRoute(props) {
  const { currentUser, isUserLoading } = useAuthContext();
  if (isUserLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src={LoadingAnimaton} alt="Loading..." />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen w-screen">
        <Header />
        <main className="w-screen p-10  h-screen flex flex-col ">
          <h1 className="text-5xl font-bold">Submit an application</h1>
          <div className="flex flex-col w-full h-auto border-2 rounded-xl p-7 my-10 border-gray-200">
            <h1 className="text-4xl font-bold">Job details</h1>
            <h1 className="text-3xl font-bold mt-8">{props.job.title}</h1>
            <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs mr-auto mt-5 font-medium tracking-widest">
                          {props.job.type}
                        </span>
            <div className="flex mt-8 align-middle space-x-2">
              <p className="text-xl">{"Published on: "}</p>
              <h1 className="text-xl font-bold ">{timestampToDate(props.job.date.seconds)}</h1>
            </div>
            <div className="w-[70%] border-t mx-auto my-10 border-gray-200"></div>
            <div className="w-[80%]">
              <p className="text-xl">
                {props.job.description}
              </p>
            </div>
            <div className="flex mt-8 align-middle space-x-2">
              <p className="text-xl">{"Position: "}</p>
              <h1 className="text-xl font-bold ">{props.job.position}</h1>
            </div>
            <div className="flex mt-8 align-middle space-x-2">
              <p className="text-xl">{"Pay per month: "}</p>
              <h1 className="text-xl font-bold ">{props.job.salary+'Ksh'}</h1>
            </div>
            <NestedModal btnName="Apply" job={props.job} currentuser={currentUser}/>
            
          </div>
        </main>
      </div>
    );
  }
}

export const getServerSideProps = async (ctx) => {
  const { draftMode = false, params = {} } = ctx;

  //   const job = await getJobBySlug(params.slug);
  const doc = await firestore.collection("jobs").doc(params.slug).get();
  const job = doc.data();
  if (!job) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      job:JSON.parse(JSON.stringify(job)),
      params,
    },
  };
};
