import React, { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Header from "../components/header";
import { authContext, useAuthContext } from "../context/UserContext";
import DatePicker from "react-datepicker";
import LoadingAnimaton from "../public/loading_anim.webp";
import Image from "next/image";
import { getJobBySlug, getStops, setStops } from "../firebase/firestore";
import { firestore } from "../firebase/firebase";
import Select from "react-select";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import Link from "next/link";
import { generateSlug } from "../utils/formatString";
import { RouteChangeCheck } from "@/utils/RouteChangeCheck";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Email } from "@mui/icons-material";

const Admin = () => {
  const { currentUser, isUserLoading } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [t, setT] = useState(false);

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];
  const refreshPage = () => {
    setT(!t);
  };
  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      console.log("something is wrong");
      console.log(isUserLoading);
      console.log(currentUser);
      router.push("/");
    }

    const fetchUsers = async () => {
      setLoading(true);
      let data = [];
      await firestore
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            console.log(doc.data());
            data.push(doc.data());
          });
        });
      setUsers(data);
    };
    fetchUsers().then(() => {
      setLoading(false);
      //   console.log("res", res);
    });
  }, [currentUser, isUserLoading, t]);

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

          <section className="my-14 px-8" id="how_section">
            <Table>
              <TableCaption className="text-2xl font-bold my-4">
                A list of Users
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-auto bg-gray-100">UID</TableHead>
                  <TableHead className="bg-gray-100">
                    Full name/Organisation name
                  </TableHead>
                  <TableHead className="bg-gray-100">Organisation</TableHead>
                  <TableHead className="bg-gray-100">Email</TableHead>
                  <TableHead className="text-left bg-gray-100">ID</TableHead>
                  <TableHead className="text-left bg-gray-100"></TableHead>
                  <TableHead className="text-left bg-gray-100"></TableHead>
                  <TableHead className="text-left bg-gray-100"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow className="" key={user.uid}>
                    <TableCell className="font-medium py-4">
                      {user.uid}
                    </TableCell>
                    {user.fullname !== undefined ? (
                      <TableCell className="text-left py-4">
                        {user.fullname}
                      </TableCell>
                    ) : (
                      <TableCell className="text-left py-4">
                        {user.organisationName}
                      </TableCell>
                    )}
                    <TableCell className="text-left py-4">
                      {user.organisation.toString()}
                    </TableCell>
                    {user.email !== undefined ? (
                      <TableCell className="text-left py-4">
                        {user.email}
                      </TableCell>
                    ) : (
                      <TableCell className="text-left py-4">
                        {user.businessEmail}
                      </TableCell>
                    )}
                    {user.IDnum !== undefined ? (
                      <TableCell className="text-left py-4">
                        {user.IDnum}
                      </TableCell>
                    ) : (
                      <TableCell className="text-left py-4">N/A</TableCell>
                    )}
                    {user.resume !== undefined ? (
                      <TableCell className="text-left py-4">
                        <a target="_blank" href={user.resume}>
                          <Button
                            className="hover:text-pink_red"
                            variant="link"
                          >
                            Resume
                          </Button>
                        </a>
                      </TableCell>
                    ) : (
                      <TableCell></TableCell>
                    )}
                    <TableCell className="text-left py-4">
                      <Button
                        onClick={async () => {
                          await firestore
                            .collection("users")
                            .doc(user.uid)
                            .delete()
                            .then(() => {
                              refreshPage();
                            });
                        }}
                        className="hover:text-pink_red"
                        variant="link"
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell className="text-left py-4">
                      {user.admin !== undefined ? (
                        <>
                          {user.admin ? (
                            <Button
                              onClick={async () => {
                                await firestore
                                  .collection("users")
                                  .doc(user.uid)
                                  .update({
                                    admin: false,
                                  })
                                  .then(() => {
                                    refreshPage();
                                  });
                              }}
                              className="hover:text-pink_red"
                              variant="link"
                            >
                              Remove Admin
                            </Button>
                          ) : (
                            <Button
                              onClick={async () => {
                                await firestore
                                  .collection("users")
                                  .doc(user.uid)
                                  .update({
                                    admin: true,
                                  })
                                  .then(() => {
                                    refreshPage();
                                  });
                              }}
                              className="hover:text-pink_red"
                              variant="link"
                            >
                              Make admin
                            </Button>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
            </Table>
          </section>
        </div>
      </RouteChangeCheck>
    );
  }
};

export default Admin;
