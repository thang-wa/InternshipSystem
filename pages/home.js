import React, { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Header from "../components/header";
import { authContext, useAuthContext } from "../context/UserContext";
import DatePicker from "react-datepicker";
import LoadingAnimaton from "../public/loading_anim.webp";
import Image from "next/image";
import { getStops, setStops } from "../firebase/firestore";
import { firestore } from "../firebase/firebase";
import Select from "react-select";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import Link from "next/link";
import { RouteChangeCheck } from "@/utils/RouteChangeCheck";

const Home = () => {
  const  {currentUser,isUserLoading} = useAuthContext();
  const router = useRouter();
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [stops, setStops] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  var route_uid

  const getOptions = () => {
    const options = stops.map((stop) => {
      return { value: stop.name, label: stop.name };
    });
    return options;
  };
 

  useEffect(() => {
      
    if (!isUserLoading && !currentUser) {
      console.log('something is wrong')
      console.log(isUserLoading)
      console.log(currentUser)
      router.push("/");
    } 

    
    
  }, [currentUser,isUserLoading]);
  
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
      <div className="bg-[url('../public/images/stock-banner.jpg')] bg-no-repeat bg-cover bg-center h-[40vh] relative ">
        
      </div>
      <section className="my-14" id="how_section">
        <h1 className="text-center text-4xl font-melodrama">How it works</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center space-x-8 items-center  my-6">
          <div className="flex-col space-y-5">
         
            <div className="bg-[url('../public/images/book.jpg')] bg-cover h-56 w-64 rounded-md mx-auto"></div>
            <p className="text-center text-2xl">Find your internship oppurtunity</p>
          </div>
          <div className="flex-col space-y-5">
       
            <div className="bg-[url('../public/images/application.jpg')] bg-cover h-56 w-64 rounded-md mx-auto"></div>
            <p className="text-center text-2xl">Fill in the application form</p>
          </div>
          <div className="flex-col space-y-5">
 
            <div className="bg-[url('../public/images/hired.jpg')] bg-cover h-56 w-64 rounded-md mx-auto"></div>
            <p className="text-center text-2xl">Wait for good news</p>
          </div>
          </div>
          <div className="py-10 flex w-full mx-auto">
            <button
          
              className="bg-pink_red rounded-md w-1/5 py-5 text-white mx-auto"
            >
              <Link href="/jobs">
                Get Started
              </Link>
              
            </button>
          </div>
      </section>
    </div>
    </RouteChangeCheck>
  );
  }
};

export default Home;
