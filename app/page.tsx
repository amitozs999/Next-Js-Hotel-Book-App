import Home from "@/components/Home";
import Error from "./error";

export const metadata = {
  title: "HomePage - Hotel App",
};


const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();

  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
    cache: "no-cache",
  });
  return res.json();
};

//default home function
export default async function HomePage({
searchParams,
}: {
  searchParams: string;
}) {

  
  const data = await getRooms(searchParams);

  if (data?.message) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}

//All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.