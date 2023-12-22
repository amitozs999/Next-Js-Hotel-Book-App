"use client";

import { IRoom } from "@/server/models/room";
import React from "react";
import StarRatings from "react-star-ratings";
import RoomImageSlider from "./RoomImageSlider";
import RoomFeatures from "./RoomFeatures";
import BookingDatePicker from "./BookingDatePicker";
import ListReviews from "../review/ListReviews";
import NewReview from "../review/NewReview";

interface Props {
  data: {
    room: IRoom;
  };
}

const RoomDetails = ({ data }: Props) => {
  const { room } = data;

  console.log(data+'yo1');
  console.log(room.reviews.length+'yo');

  return (
    <div className="container container-fluid">
      <h1 style={{fontSize:"2rem"}} className="mt-5   ml-8 font-semibold ">{room.name}</h1>
      <p className="ml-8  mt-2">{room.address}</p>

      <div className="ratings mt-auto mb-3 ml-8">
        <StarRatings
          rating={room?.ratings}
          starRatedColor="#e61e4d"
          numberOfStars={5}
          starDimension="22px"
          starSpacing="1px"
          name="rating"
        />
        <span className="no-of-reviews">({room?.numOfReviews} Reviews)</span>
      </div>
      <RoomImageSlider images={room?.images} />

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8 pl-10">
          <h3 className="font-bold mb-2">Room Description</h3>
          <p>{room?.description}</p>

          <RoomFeatures room={room} />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <BookingDatePicker room={room} />

          {/* {room?.location && (
            <div className="my-5">
              <h4 className="my-2">Room Location:</h4>
              <div
                id="room-map"
                className="shadow rounded"
                style={{ height: 350, width: "100%" }}
              ></div>
            </div>
          )} */}
        </div>
      </div>
      

      <h1 className="font-bold mb-2 ml-6">
        All Reviews:
      </h1>
      {/* console.log(room?._id); */}
      <NewReview roomId={room?._id} />
      <ListReviews reviews={room?.reviews} />
    </div>
    
  );
};

export default RoomDetails;
