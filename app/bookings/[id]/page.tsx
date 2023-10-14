import Error from "@/app/error";
import BookingDetails from "@/components/booking/BookingDetails";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "My Bookings Details",
};

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}/api/bookings/${id}`,                 //hit api folder  //api folder hit server sontroller  //comtroller hit mongodb
    authHeader
  );
  return res.json();
};

//my bookings
export default async function MyBookingsPage(
  { params,}: { params: { id: string };}       
  ) {
  const data = await getBooking(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <BookingDetails data={data} />;
}
