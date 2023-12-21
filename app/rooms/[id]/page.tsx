import Error from "@/app/error";
import RoomDetails from "@/components/room/RoomDetails";

import { NextResponse } from "next/server";
interface Props {
  params: { id: string };
}


//fetch room details on frontend page based on room id
const getRoom = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    cache: "no-cache",   //if cache used same fetched value again again instead of updated one
  });
  return res.json();
};



//created room detail page
export default async function RoomDetailsPage({ params }: Props) {

  const data = await getRoom(params?.id); //1.

  if (data?.message) {
    return <Error error={data} />;  //room may be not present show that error
  }

  return <RoomDetails data={data} />;     //room component passing room data in it, that got through //1.
}


//default function to add meta by next js
export async function generateMetadata({ params }: Props) {
  const data = await getRoom(params?.id);  //whenever thi api hit

  return {
    title: data?.room?.name,   //set this in title
  };
}





//export default async function   (syntax for default page function)