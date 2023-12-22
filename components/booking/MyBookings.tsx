"use client";

import { IBooking } from "@/server/models/booking";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    bookings: IBooking[];     //booking array
  };
}

const MyBookings = ({ data }: Props) => {

  const bookings = data?.bookings;

  const setBookings = () => {


    //data
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Check In",
          field: "checkin",
          sort: "asc",
        },
        {
          label: "Check Out",
          field: "checkout",
          sort: "asc",
        },
        {
          label: "Amount Paid",
          field: "amountpaid",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };


    //set data using mapping

    bookings?.forEach((booking) => {

      data?.rows?.push({

        id: booking._id,
        checkin: new Date(booking?.checkInDate).toLocaleString("en-US"),
        checkout: new Date(booking?.checkOutDate).toLocaleString("en-US"),
        amountpaid: `₹${booking?.amountPaid}`,
       
         //booking details and invoice of booking using actions

        actions: (
          <>

            <Link href={`/bookings/${booking._id}`} className="btn btn-primary">
              {" "}
              <i className="fa fa-eye"></i>{" "}
            </Link>


            <Link
              href={`/bookings/invoice/${booking._id}`}
              className="btn btn-success ms-2"
            >

              {" "}

              <i className="fa fa-receipt"></i>{" "}
            </Link>


          </>
        ),
      });
    });

    return data;
  };

  return (

    <div className="container">

      <h1 className="my-5">My Bookings</h1>

      {/* //create table using mdbdata */}

      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />

    </div>
  );
};

export default MyBookings;
