import React, { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Header from "../../../components/header";
import { authContext, useAuthContext } from "../../../context/UserContext";
import DatePicker from "react-datepicker";
import LoadingAnimaton from "../../../public/loading_anim.webp";
import Image from "next/image";
import { firestore } from "../../../firebase/firebase";
import { useRouter } from "next/router";
import { RouteChangeCheck } from "@/utils/RouteChangeCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectGroup } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import uuid4 from "uuid4";

const NewJob = () => {
  const { currentUser, isUserLoading } = useAuthContext();
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [jobAddress, setJobAddress] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [salary, setSalary] = useState("");
  var route_uid;

  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      console.log("something is wrong");
      console.log(isUserLoading);
      console.log(currentUser);
      router.push("/");
    }

    // setToOptions(getToOptions());
    // getToOptions().then((options) => {
    //   console.log(options);
    //   setToOptions(options);
    // });
  }, [currentUser, isUserLoading]);

  const submitJob = async () => {
    const uid = uuid4();

    firestore.collection("jobs").add({
      title: jobTitle,
      position: jobPosition,
      address: jobAddress,
      type: jobType,
      description: jobDescription,
      uid: uid,
      date: new Date(),
      organisationName: currentUser.organisationName,
      salary: salary,
      applications: [],
    });
  };

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
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="flex flex-col items-center justify-center w-full">
                        <h1 className="text-3xl font-medium title-font mb-2 text-gray-900">
                          New Job
                        </h1>
                        <p className="lg:w-2/3 text-center leading-relaxed text-base">
                          Create a new job.
                        </p>
                      </div>
                      <div className="flex flex-col space-y-5 w-full my-5">
                        <Input
                          onChange={(v) => {
                            setJobTitle(v.target.value);
                            // console.log(v.target.value);
                          }}
                          type="text"
                          placeholder="Title"
                        />
                        <Input
                          onChange={(v) => {
                            setJobPosition(v.target.value);
                            // console.log(v.target.value);
                          }}
                          type="text"
                          placeholder="Position"
                        />
                        <Input
                          onChange={(v) => {
                            setSalary(v.target.value);
                            // console.log(v.target.value);
                          }}
                          type="number"
                          placeholder="Salary"
                        />
                        <Input
                          onChange={(v) => {
                            setJobAddress(v.target.value);
                            // console.log(v.target.value);
                          }}
                          type="text"
                          placeholder="Address"
                        />
                        <Select
                          onValueChange={(value) => {
                            console.log(value);
                            setJobType(value);
                          }}
                          class
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup className="bg-white">
                              <SelectItem
                                className="focus:bg-accent focus:outline-none cursor-pointer focus:text-accent-foreground"
                                value="hybrid"
                              >
                                Hybrid
                              </SelectItem>
                              <SelectItem
                                className="focus:bg-accent focus:outline-none cursor-pointer focus:text-accent-foreground"
                                value="remote"
                              >
                                Remote
                              </SelectItem>
                              <SelectItem
                                className="focus:bg-accent focus:outline-none cursor-pointer focus:text-accent-foreground"
                                value="on-site"
                              >
                                On-Site
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Textarea
                          onChange={(v) => {
                            setJobDescription(v.target.value);
                            // console.log(v.target.value);
                          }}
                          className="h-96"
                          placeholder="Description"
                        />
                      </div>
                      <Button
                        onClick={() => {
                          submitJob().then(() => {
                            router.push("/jobs");
                          });
                        }}
                        variant="default"
                        className="bg-pink_red text-white p-2"
                      >
                        Submit
                      </Button>
                    </div>
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

export default NewJob;
