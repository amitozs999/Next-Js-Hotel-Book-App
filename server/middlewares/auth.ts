import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "../models/user";

export const isAuthenticatedUser = async (
  req: NextRequest,
  event: any,
  next: any
) => {
  const session = await getToken({ req });
  console.log('hijo11');
  if (!session) {
    return NextResponse.json(
      {
        message: "Login first to access this route",
      },
      { status: 401 }
    );
  }

  req.user = session.user as IUser;
  console.log('hijo11next');
  return next();  //an now move with controller code further
};
