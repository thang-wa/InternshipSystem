import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { auth, firestore, storage } from "../firebase/firebase";
import { addUser } from "../firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import LogoTrans from "../public/logo/classic_coast_logo_trans.svg";
import { TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDownloadURL } from "firebase/storage";
import { RouteChangeCheck } from "@/utils/RouteChangeCheck";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  let confirmPassword = "";
  const [file, setFile] = useState(null);
  const [fullname, setFullname] = useState("");
  const [IDnum, setIDnum] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const passwordCheck = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const signUp = async (organisation) => {
    setIsLoading(true);
    if (passwordCheck()) {
      if (organisation) {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(async (authUser) => {
            console.log("uid: " + authUser.user.uid);
            firestore
              .collection("users")
              .doc(authUser.user.uid)
              .set({
                businessEmail: email,
                organisationName: fullname,
                organisation: organisation,
                uid: authUser.user.uid,
              })
              .then(() => {
                console.log("organisation added to database!");
                router.push("/");
              });
          });
      } else {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(async (authUser) => {
            console.log("uid: " + authUser.user.uid);
            const post = storage.ref(
              "users/" + authUser.user.uid + "/" + "resume"
            );
            await post.put(file).then(() => {
              getDownloadURL(post).then((url) => {
                console.log(url);
                firestore
                  .collection("users")
                  .doc(authUser.user.uid)
                  .set({
                    email: email,
                    fullname: fullname,
                    IDnum: IDnum,
                    organisation: organisation,
                    resume: url,
                    uid: authUser.user.uid,
                  })
                  .then(() => {
                    console.log("user added to database!");
                    router.push("/");
                  });
              });
            });
          });
      }
    } else {
      alert("Passwords do not match");
    }
  };
  const handleFileChange = (event) => {
    const filecv = event.target.files[0];
    console.log(filecv);
    setFile(filecv);
  };
  const handleConfirmPasswordChange = (event) => {
    confirmPassword = event.target.value;
  };

  return (
    <RouteChangeCheck>
      <div className=" min-h-screen w-screen bg-bg_color">
      <div className="flex flex-col space-y-8 w-1/4 mx-auto justify-center my-auto pt-10 ">
        {/* <div className="mx-auto w-64 h-48 overflow-hidden"><Image  src={LogoTrans} alt="Classic Coast Logo" /></div> */}
        <h1 className="text-dark_blue font-bold text-center text-4xl ">
          Sign Up
        </h1>
        <Tabs defaultValue="intern" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-10 mb-20 text-xl">
            <TabsTrigger
              className="text-xl data-[state=active]:border-b-2 data-[state=active]:border-pink_red pb-3"
              value="intern"
            >
              Intern
            </TabsTrigger>
            <TabsTrigger
              className="text-xl data-[state=active]:border-b-2 data-[state=active]:border-pink_red pb-3"
              value="organisation"
            >
              Organisation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="intern">
            <div className="flex flex-col justify-center space-y-10">
              <Input
                onChange={(value) => {
                  setFullname(value.target.value);
                }}
                className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
                placeholder="Full Name"
                type="text"
              />
              <Input
                onChange={(value) => {
                  setEmail(value.target.value);
                }}
                type="email"
                className=""
                placeholder="Email"
              />
              <Input
                onChange={(value) => {
                  setIDnum(value.target.value);
                }}
                className=""
                placeholder="ID number"
                type="number"
              />
              <Input
                onChange={(value) => {
                  setPassword(value.target.value);
                }}
                className=""
                type="password"
                placeholder="Password"
              />
              <Input
                onChange={handleConfirmPasswordChange}
                className=""
                type="password"
                placeholder="Confirm Password"
              />
              <div>
                <p className="font-bold">Upload your resume</p>
                <Input
                  id="Resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </div>
              <button
                onClick={() => signUp(false)}
                className="border-4 bg-pink_red text-white p-2 w-3/4 mx-auto rounded-xl"
              >
                {isLoading ? "Loading..." : "Continue"}
              </button>
              {/* Login Link */}
              <div className="flex space-x-2 mx-auto pb-4">
                <span className="text-dark_blue">
                  {"Already have an Account? "}
                </span>
                <Link href="/">
                  <span className="text-pink_red underline cursor-pointer">
                    Log In
                  </span>
                </Link>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="organisation">
            <div className="flex flex-col justify-center space-y-10">
              <Input
                onChange={(value) => {
                  setFullname(value.target.value);
                }}
                type="text"
                className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
                placeholder="Orginisation Name"
              />
              <Input
                onChange={(value) => {
                  setEmail(value.target.value);
                }}
                type="email"
                className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
                placeholder="Business Email"
              />

              <Input
                onChange={(value) => {
                  setPassword(value.target.value);
                }}
                className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
                type="password"
                placeholder="Password"
              />
              <Input
                onChange={handleConfirmPasswordChange}
                className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
                type="password"
                placeholder="Confirm Password"
              />
              <Button
                onClick={() => signUp(true)}
                className="border-4 bg-pink_red text-white p-2 w-3/4 mx-auto rounded-xl"
              >
                {isLoading ? "Loading..." : "Continue"}
              </Button>
              {/* Login Link */}
              <div className="flex space-x-2 mx-auto pb-4">
                <span className="text-dark_blue">
                  {"Already have an Account? "}
                </span>
                <Link href="/">
                  <span className="text-pink_red underline cursor-pointer">
                    Log In
                  </span>
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </RouteChangeCheck>
  );
};

export default Signup;
