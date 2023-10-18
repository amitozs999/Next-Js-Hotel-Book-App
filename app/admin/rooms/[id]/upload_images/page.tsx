import Error from "@/app/error";
import Home from "@/components/Home";
import AllRooms from "@/components/admin/AllRooms";
import UpdateRoom from "@/components/admin/UpdateRoom";
import UploadRoomImages from "@/components/admin/UploadRoomImages";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Upload Room Images - ADMIN",
};

const getRoom = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    next: {
      tags: ["RoomDetails"],
    },
  });
  return res.json();
};

export default async function AdminUploadImagesPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getRoom(params?.id);  //get that room details

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  console.log('roomdet'+data.images);

  return <UploadRoomImages data={data} />;  //send room details in uplroomimages comp
}
