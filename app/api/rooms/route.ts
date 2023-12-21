
import { allRooms } from "@/server/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

import dbConnect from "@/server/config/dbConnect";

import { NextResponse } from "next/server";
interface RequestContext {
    params:{
        id:string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();
router.get(allRooms);  //http://localhost:3000/   /api/rooms/

export async function GET(request: NextRequest, ctx: RequestContext): Promise<NextResponse>  {
  return router.run(request, ctx) as Promise<NextResponse>;
}