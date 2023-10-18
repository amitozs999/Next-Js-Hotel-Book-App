import Error from "@/app/error";

import AllUsers from "@/components/admin/AllUsers";
import { getAuthHeader } from "@/helpers/authHeader";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

export const metadata = {
  title: "All Users - ADMIN",
};

const getUsers = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}/api/admin/users`,
    authHeaders
  );
  console.log('ee6' +res );
  
  return res.json();
};

export default async function AdminUsersPage() {
const data = await getUsers();  //fetch all user from bck
console.log('ee'+data);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <AllUsers data={data} />;
}
