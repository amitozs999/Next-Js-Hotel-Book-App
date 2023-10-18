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



export const authorizeRoles = (...roles: string[]) => {
  return (req: NextRequest, event: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return NextResponse.json(
        {
          errMessage: `Role (${req.user.role}) is now allowed to access this resource.`,
        },
        { status: 403 }
      );
    }

    return next();
  };
};