import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import APIFilters from "../utils/apiFilters";

// Get all rooms  =>  /api/rooms

//export const allRooms =  async (req: NextRequest) => {
//passing full handler inside this to check error no need to call it seperately catchAsyncErrors




// ?i=main&mode=front&sid=de8d49b78a85a322c4155015fdce22c4&enc=+Hello%20&empty

// Result:

//  urlParams = {
//     enc: " Hello ",
//     i: "main",
//     mode: "front",
//     sid: "de8d49b78a85a322c4155015fdce22c4",
//     empty: ""
// }

export const allRooms = catchAsyncErrors(async (req: NextRequest) => {

  const resPerPage: number = 4;

  const { searchParams } = new URL(req.url);

  const queryStr: any = {}; //map

  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });


  //nowjo query string map banya he uske base me filter room using APIFilters ka constructor passing values


  const apiFilters = new APIFilters(Room, queryStr).search().filter();

  let rooms: IRoom[] = await apiFilters.query;  //now will have array of filtered rooms
  const filteredRoomsCount: number = rooms.length;

  apiFilters.pagination(resPerPage);
  rooms = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    filteredRoomsCount,
    resPerPage,
    rooms,
  });
});

// Create new room  =>  /api/admin/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// Get room details  =>  /api/rooms/:id                  1.req:reqtype,  2.params:parmtype
export const getRoomDetails = catchAsyncErrors(  async (req: NextRequest, { params }: { params: { id: string } }) => {

    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Update room details  =>  /api/admin/rooms/:id
export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Delete room details  =>  /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors( async (req: NextRequest, { params }: { params: { id: string } }) => {
   
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    // TODO - Delete images associated with the room

    await room.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);





// Create/Update room review  =>  /api/reviews
export const createRoomReview = catchAsyncErrors(async (req: NextRequest) => {

  const body = await req.json();
  const { rating, comment, roomId } = body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);


   //cur user has given review for this room
  const isReviewed = room?.reviews?.find(
    (r: IReview) => r.user?.toString() === req?.user?._id?.toString()
  );


  //if yes update it
  if (isReviewed) {
    room?.reviews?.forEach((review: IReview) => {
      if (review.user?.toString() === req?.user?._id?.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {

    //else just add it
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }


  //update room whole rating avg
  room.ratings =
    room?.reviews?.reduce(
      (acc: number, item: { rating: number }) => item.rating + acc,
      0
    ) / room?.reviews?.length;


  await room.save();

  return NextResponse.json({
    success: true,
  });
});



// Can user review room  =>  /api/reviews/can_review
export const canReview = catchAsyncErrors(async (req: NextRequest) => {

  const { searchParams } = new URL(req.url);

  const roomId = searchParams.get("roomId");

  //if user has done booking for this room then only he can review
  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  const canReview = bookings?.length > 0 ? true : false;

  return NextResponse.json({
    canReview,
  });
});
