import dbConnect from "@/server/config/dbConnect";
import { getRoomBookedDates } from "@/server/controllers/bookingControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

import { NextResponse } from "next/server";
interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomBookedDates);

export async function GET(request: NextRequest, ctx: RequestContext) : Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
