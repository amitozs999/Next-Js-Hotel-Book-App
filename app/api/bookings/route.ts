import dbConnect from "@/server/config/dbConnect";
import { newBooking } from "@/server/controllers/bookingControllers";
import { isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

import { NextResponse } from "next/server";
interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).post(newBooking);

export async function POST(request: NextRequest, ctx: RequestContext) : Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
