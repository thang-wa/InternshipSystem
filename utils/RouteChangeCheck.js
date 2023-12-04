import React, { useEffect, useState } from 'react'
import LoadingAnimaton from "../public/loading_anim.webp";
import Router from "next/router";
import Image from "next/image";

export const RouteChangeCheck = ({ children }) => {
      const [loading, setLoading] = useState(false);
      useEffect(() => {
    const startLoading = () => {
      setLoading(true);
    };

    const stopLoading = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
      }, []);
    if (loading) {
        return <div className='w-full h-full flex justify-center align-middle'>
          <Image src={LoadingAnimaton} alt="Loading..." />
      </div>;
    }
    return (<>
    {children}
    </>
    
  )
}
