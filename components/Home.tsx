"use client";

import React from "react";
import RoomItem from "./room/RoomItem";
import { IRoom } from "@/server/models/room";
import CustomPagination from "./layout/CustomPagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredRoomsCount: number;
    rooms: IRoom[];
  };
}
const Home = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  const { rooms, resPerPage, filteredRoomsCount } = data;
  return (
    <div className="mt-5">
       <Link href="/search" className="ml-6 back-to-search ">
         Search your Room     
         <i 
          //className="fa fa-arrow-left me-1"
         className="ml-3 mt-2	fa fa-arrow-circle-right"  
       // className="  	fas fa-hotel"  
          //className="bi bi-search"
          ></i> 
        </Link>
      <section id="rooms" className="container mt-4">
        <h2 className="mb-3 ml-2 stays-heading">
          {location
            ? `${rooms?.length} rooms found in ${location}`
            : ""}
        </h2>
       
        <div className="row mt-4">
          {rooms?.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms?.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>

      <CustomPagination
        resPerPage={resPerPage}
        filteredRoomsCount={filteredRoomsCount}
      />
    </div>
  );
};

export default Home;
