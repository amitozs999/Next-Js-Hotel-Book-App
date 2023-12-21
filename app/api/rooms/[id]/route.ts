import dbConnect from "@/server/config/dbConnect";
import {
  getRoomDetails,
  updateRoom,
} from "@/server/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

import { NextResponse } from "next/server";
interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomDetails);    //http://localhost:3000/   /api/rooms/651d7a2d880d481a191baef0  is room id ke details fetch

export async function GET(request: NextRequest, ctx: RequestContext): Promise<NextResponse>  {
  return router.run(request, ctx) as Promise<NextResponse>;
}
